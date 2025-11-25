-- Run this in Supabase SQL Editor to fix the users table RLS policy

-- Drop the existing policy
DROP POLICY IF EXISTS "Only admins can view users" ON users;

-- Create a policy that allows users to view their own record
-- This is needed so the admin check can work
CREATE POLICY "Users can view their own record" ON users 
FOR SELECT 
USING (
  auth.jwt() ->> 'email' = email
);

-- Also allow admins to view all users (for future admin features)
CREATE POLICY "Admins can view all users" ON users 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM users u
    WHERE u.email = auth.jwt() ->> 'email'
    AND u.role = 'admin'
  )
);
