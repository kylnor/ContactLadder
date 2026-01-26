-- ============================================
-- Add admin role system
-- Allows designated users to manage training content
-- ============================================

-- Add admin flag to profiles
ALTER TABLE profiles ADD COLUMN is_admin BOOLEAN DEFAULT false;

-- Add index for efficient admin queries
CREATE INDEX idx_profiles_admin ON profiles(is_admin) WHERE is_admin = true;

-- Add comment
COMMENT ON COLUMN profiles.is_admin IS 'Whether user has admin privileges for content management';

-- ============================================
-- RLS POLICIES FOR ADMIN ACCESS
-- ============================================

-- Allow admins to view all modules (including unpublished)
CREATE POLICY "Admins can view all modules"
  ON modules FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Allow admins to insert modules
CREATE POLICY "Admins can insert modules"
  ON modules FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Allow admins to update modules
CREATE POLICY "Admins can update modules"
  ON modules FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Allow admins to delete modules
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
-- GRANT ADMIN ACCESS
-- ============================================

-- To grant admin access to a user, run:
-- UPDATE profiles SET is_admin = true WHERE email = 'your@email.com';

-- Example (commented out - update with your email):
-- UPDATE profiles SET is_admin = true WHERE email = 'admin@contactladder.com';
