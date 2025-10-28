-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor'))
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  tripType TEXT NOT NULL,
  travelers TEXT,
  budgetRange TEXT,
  message TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  photoUrl TEXT,
  approved BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(createdAt DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(approved);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(createdAt DESC);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for leads (only admins can read)
CREATE POLICY "Anyone can insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Only admins can view leads" ON leads FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.email = auth.jwt() ->> 'email' 
    AND users.role = 'admin'
  )
);

-- RLS Policies for reviews (public can read approved, anyone can insert)
CREATE POLICY "Anyone can insert reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view approved reviews" ON reviews FOR SELECT USING (approved = true);
CREATE POLICY "Only admins can update reviews" ON reviews FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.email = auth.jwt() ->> 'email' 
    AND users.role = 'admin'
  )
);
CREATE POLICY "Only admins can delete reviews" ON reviews FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.email = auth.jwt() ->> 'email' 
    AND users.role = 'admin'
  )
);

-- RLS Policies for users (only admins can view)
CREATE POLICY "Only admins can view users" ON users FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.email = auth.jwt() ->> 'email' 
    AND users.role = 'admin'
  )
);

-- Insert a default admin user (update email and password after creation)
-- You'll need to create this user through Supabase Auth UI or API
-- The user record will be linked via email

COMMENT ON TABLE leads IS 'Customer inquiries and trip requests';
COMMENT ON TABLE reviews IS 'Client reviews that require admin approval';
COMMENT ON TABLE users IS 'Admin and editor users';
