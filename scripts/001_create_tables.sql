-- Create the 'pages' table
CREATE TABLE IF NOT EXISTS pages (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft', -- 'published', 'draft', 'archived'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    author VARCHAR(255) NOT NULL,
    meta_title VARCHAR(255),
    meta_description TEXT,
    featured_image VARCHAR(255)
);

-- Create the 'market_data_points' table
CREATE TABLE IF NOT EXISTS market_data_points (
    id VARCHAR(255) PRIMARY KEY,
    symbol VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 4) NOT NULL,
    change NUMERIC(10, 4) NOT NULL,
    change_percent NUMERIC(5, 2) NOT NULL,
    volume BIGINT NOT NULL,
    market_cap BIGINT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(50) NOT NULL
);

-- Create the 'economic_indicators' table
CREATE TABLE IF NOT EXISTS economic_indicators (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    value NUMERIC(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    change NUMERIC(10, 2) NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(50) NOT NULL
);

-- Create the 'market_index_history' table
CREATE TABLE IF NOT EXISTS market_index_history (
    id VARCHAR(255) PRIMARY KEY,
    index_type VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    value NUMERIC(10, 4) NOT NULL,
    change NUMERIC(10, 4) NOT NULL,
    change_percent NUMERIC(5, 2) NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (index_type, date)
);

-- Create the 'jobs' table
CREATE TABLE IF NOT EXISTS jobs (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'full-time', 'part-time', 'contract'
    description TEXT NOT NULL,
    requirements JSONB NOT NULL DEFAULT '[]'::jsonb, -- Store as JSON array of strings
    responsibilities JSONB NOT NULL DEFAULT '[]'::jsonb, -- Store as JSON array of strings
    status VARCHAR(50) NOT NULL DEFAULT 'active', -- 'active', 'paused', 'closed'
    posted_date DATE DEFAULT CURRENT_DATE,
    application_deadline DATE,
    applications_count INTEGER DEFAULT 0
);

-- Create the 'job_applications' table
CREATE TABLE IF NOT EXISTS job_applications (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id VARCHAR(255) NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    applicant_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    resume TEXT NOT NULL, -- Store URL or path to resume
    cover_letter TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'reviewing', 'interviewed', 'hired', 'rejected'
    applied_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the 'activity_logs' table
CREATE TABLE IF NOT EXISTS activity_logs (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
    action VARCHAR(255) NOT NULL,
    resource VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    severity VARCHAR(50) NOT NULL, -- 'low', 'medium', 'high'
    details TEXT
);

-- Create the 'notifications' table
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'info', 'success', 'warning', 'error'
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'viewer',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'settings' table
CREATE TABLE IF NOT EXISTS settings (
    id VARCHAR(255) PRIMARY KEY,
    key VARCHAR(255) NOT NULL UNIQUE,
    value TEXT,
    category VARCHAR(255) NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
