-- Add header image field to modules
ALTER TABLE modules ADD COLUMN header_image TEXT;

-- Add comment
COMMENT ON COLUMN modules.header_image IS 'URL to the header image for the module';
