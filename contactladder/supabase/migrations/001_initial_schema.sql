-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE subscription_tier AS ENUM ('free', 'premium', 'enterprise');
CREATE TYPE module_status AS ENUM ('not_started', 'in_progress', 'completed');
CREATE TYPE module_category AS ENUM ('essentials', 'deep-dive', 'mini-guide');

-- ============================================
-- PROFILES TABLE
-- Extends auth.users with additional user data
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier subscription_tier DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- MODULES TABLE
-- Store training module metadata
-- ============================================
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category module_category NOT NULL,
  order_index INTEGER NOT NULL,
  estimated_duration INTEGER, -- in minutes
  prerequisites TEXT[] DEFAULT '{}',
  content_path TEXT NOT NULL,
  video_urls JSONB DEFAULT '{}',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_modules_category ON modules(category);
CREATE INDEX idx_modules_published ON modules(is_published);
CREATE INDEX idx_modules_slug ON modules(slug);

-- Enable RLS (public read for published modules)
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published modules"
  ON modules FOR SELECT
  USING (is_published = true);

-- ============================================
-- MODULE_PROGRESS TABLE
-- Track user progress through modules
-- ============================================
CREATE TABLE module_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  status module_status DEFAULT 'not_started',
  progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  time_spent_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Indexes for performance
CREATE INDEX idx_module_progress_user ON module_progress(user_id);
CREATE INDEX idx_module_progress_module ON module_progress(module_id);
CREATE INDEX idx_module_progress_status ON module_progress(status);

-- Enable RLS
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON module_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON module_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON module_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- VIDEO_PROGRESS TABLE
-- Track video watch progress
-- ============================================
CREATE TABLE video_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  video_key TEXT NOT NULL,
  watched_percent INTEGER DEFAULT 0 CHECK (watched_percent >= 0 AND watched_percent <= 100),
  last_position_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id, video_key)
);

-- Indexes
CREATE INDEX idx_video_progress_user ON video_progress(user_id);
CREATE INDEX idx_video_progress_module ON video_progress(module_id);

-- Enable RLS
ALTER TABLE video_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own video progress"
  ON video_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own video progress"
  ON video_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own video progress"
  ON video_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- USER_PREFERENCES TABLE
-- Store personalization data
-- ============================================
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  gci_goal NUMERIC,
  average_sale_price NUMERIC,
  commission_percent NUMERIC,
  magic_number INTEGER,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );

  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call handle_new_user on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON modules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_module_progress_updated_at BEFORE UPDATE ON module_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_video_progress_updated_at BEFORE UPDATE ON video_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
