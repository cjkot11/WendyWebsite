-- Run this in Supabase SQL Editor to verify your admin user exists

-- Check if your user exists in the users table
SELECT * FROM users WHERE role = 'admin';

-- If you see your user, great! If not, run this to add it:
-- INSERT INTO users (name, email, role)
-- VALUES ('Your Name', 'your-email@example.com', 'admin')
-- ON CONFLICT (email) DO UPDATE SET role = 'admin';
