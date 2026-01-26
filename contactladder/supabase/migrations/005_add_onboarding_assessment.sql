-- Add onboarding assessment fields to user_preferences
ALTER TABLE user_preferences ADD COLUMN IF NOT EXISTS onboarding_assessment JSONB DEFAULT '{}';
ALTER TABLE user_preferences ADD COLUMN IF NOT EXISTS learning_path JSONB DEFAULT '{}';
ALTER TABLE user_preferences ADD COLUMN IF NOT EXISTS recommended_modules TEXT[] DEFAULT '{}';

-- Add comments
COMMENT ON COLUMN user_preferences.onboarding_assessment IS 'Stores AI chat assessment responses';
COMMENT ON COLUMN user_preferences.learning_path IS 'Personalized learning path based on assessment';
COMMENT ON COLUMN user_preferences.recommended_modules IS 'Array of recommended module slugs in priority order';

-- Update onboarding_completed to track assessment
COMMENT ON COLUMN user_preferences.onboarding_completed IS 'True when user completes AI assessment and onboarding';
