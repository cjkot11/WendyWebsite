-- Run this in Supabase SQL Editor to fix the infinite recursion

-- Drop ALL existing policies on users table
DROP POLICY IF EXISTS "Only admins can view users" ON users;
DROP POLICY IF EXISTS "Users can view their own record" ON users;
DROP POLICY IF EXISTS "Admins can view all users" ON users;

-- Create a simple policy that allows users to view their own record
-- This is all we need for the admin check to work
CREATE POLICY "Users can view their own record" ON users 
FOR SELECT 
USING (
  (auth.jwt() ->> 'email')::text = email
);
