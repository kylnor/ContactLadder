-- ============================================
-- Add content storage to modules table
-- This allows storing markdown content directly in the database
-- instead of referencing external files
-- ============================================

-- Add content column for markdown storage
ALTER TABLE modules ADD COLUMN content TEXT;

-- Add optional HTML cache column for performance
ALTER TABLE modules ADD COLUMN content_html TEXT;

-- Add comment to explain the columns
COMMENT ON COLUMN modules.content IS 'Markdown content for the training module';
COMMENT ON COLUMN modules.content_html IS 'Optional pre-rendered HTML cache of the content';

-- Note: content_path column can be deprecated after migration
-- but keeping it for backwards compatibility during transition
