CREATE TABLE users (
 id UUID PRIMARY KEY,
 email TEXT UNIQUE,
 name TEXT,
 created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
 id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 title TEXT NOT NULL,
 description TEXT,
 status TEXT DEFAULT 'pending',
 assigned_to UUID REFERENCES users(id),
 created_by UUID REFERENCES users(id),
 created_at TIMESTAMP DEFAULT NOW()
);