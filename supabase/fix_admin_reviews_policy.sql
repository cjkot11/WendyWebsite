-- Run this in Supabase SQL Editor to allow admins to view all reviews

-- Drop the existing public policy
DROP POLICY IF EXISTS "Public can view approved reviews" ON reviews;

-- Create a policy that allows public to view approved reviews
CREATE POLICY "Public can view approved reviews" ON reviews 
FOR SELECT 
USING (approved = true);

-- Create a policy that allows admins to view ALL reviews
-- This checks if the authenticated user is an admin
CREATE POLICY "Admins can view all reviews" ON reviews 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.email = (auth.jwt() ->> 'email')
    AND users.role = 'admin'
  )
);