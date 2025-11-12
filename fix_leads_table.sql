-- Run this in Supabase SQL Editor to fix the leads table column names
-- First, check what columns actually exist:
-- SELECT column_name FROM information_schema.columns WHERE table_name = 'leads';

-- If the column is lowercase 'triptype', we need to either:
-- Option 1: Rename it to match our code (with quotes to preserve case)
ALTER TABLE leads RENAME COLUMN triptype TO "tripType";

-- OR Option 2: If the column doesn't exist at all, add it:
-- ALTER TABLE leads ADD COLUMN IF NOT EXISTS "tripType" TEXT NOT NULL DEFAULT 'General Inquiry';

-- Also check and fix other camelCase columns:
ALTER TABLE leads RENAME COLUMN budgetrange TO "budgetRange" WHERE EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'budgetrange');
ALTER TABLE leads RENAME COLUMN createdat TO "createdAt" WHERE EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'createdat');

