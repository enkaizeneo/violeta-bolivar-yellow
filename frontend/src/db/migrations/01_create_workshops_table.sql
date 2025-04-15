
-- Create the workshops table
CREATE TABLE IF NOT EXISTS workshops (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'pending', 'inactive')),
  registration_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Enable Row Level Security
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now
-- In a production environment, you would want to restrict this based on user roles
CREATE POLICY "Enable all operations for all users" ON workshops
  USING (true)
  WITH CHECK (true);
