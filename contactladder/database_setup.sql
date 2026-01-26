-- ============================================
-- COMPLETE DATABASE SETUP FOR CONTACTLADDER
-- Run this in Supabase SQL Editor
-- https://supabase.com/dashboard/project/ejuodzmxtgujvovykpjf/sql/new
-- ============================================

-- Create enum types
CREATE TYPE subscription_tier AS ENUM ('free', 'premium', 'enterprise');
CREATE TYPE module_status AS ENUM ('not_started', 'in_progress', 'completed');
CREATE TYPE module_category AS ENUM ('essentials', 'deep-dive', 'mini-guide');

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier subscription_tier DEFAULT 'free',
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE INDEX IF NOT EXISTS idx_profiles_admin ON profiles(is_admin) WHERE is_admin = true;

-- ============================================
-- MODULES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category module_category NOT NULL,
  order_index INTEGER NOT NULL,
  estimated_duration INTEGER,
  prerequisites TEXT[] DEFAULT '{}',
  content_path TEXT,
  content TEXT,
  content_html TEXT,
  video_urls JSONB DEFAULT '{}',
  header_image TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_modules_category ON modules(category);
CREATE INDEX IF NOT EXISTS idx_modules_published ON modules(is_published);
CREATE INDEX IF NOT EXISTS idx_modules_slug ON modules(slug);

CREATE POLICY "Anyone can view published modules"
  ON modules FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can view all modules"
  ON modules FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can insert modules"
  ON modules FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update modules"
  ON modules FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can delete modules"
  ON modules FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- ============================================
-- MODULE_PROGRESS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_module_progress_user ON module_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_module_progress_module ON module_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_module_progress_status ON module_progress(status);

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
-- ============================================
CREATE TABLE IF NOT EXISTS video_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

ALTER TABLE video_progress ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_video_progress_user ON video_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_video_progress_module ON video_progress(module_id);

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
-- ============================================
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  gci_goal NUMERIC,
  average_sale_price NUMERIC,
  commission_percent NUMERIC,
  magic_number INTEGER,
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_assessment JSONB DEFAULT '{}',
  learning_path JSONB DEFAULT '{}',
  recommended_modules TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call handle_new_user on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
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
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_modules_updated_at ON modules;
CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON modules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_module_progress_updated_at ON module_progress;
CREATE TRIGGER update_module_progress_updated_at BEFORE UPDATE ON module_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_video_progress_updated_at ON video_progress;
CREATE TRIGGER update_video_progress_updated_at BEFORE UPDATE ON video_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- CREATE PROFILE FOR EXISTING USER
-- ============================================
INSERT INTO public.profiles (id, email, full_name, is_admin)
VALUES (
  'b758c3d0-f6b8-4d89-a1df-0cbf6136e7d6',
  'kylenorthup@gmail.com',
  'Kyle Northup',
  true  -- Grant admin access
)
ON CONFLICT (id) DO UPDATE SET is_admin = true;

INSERT INTO public.user_preferences (user_id, onboarding_completed)
VALUES ('b758c3d0-f6b8-4d89-a1df-0cbf6136e7d6', true)
ON CONFLICT (user_id) DO UPDATE SET onboarding_completed = true;
