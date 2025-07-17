-- Create the 'pages' table
CREATE TABLE IF NOT EXISTS pages (
    id VARCHAR(36) PRIMARY KEY, -- UUIDs are typically 36 chars
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft', -- 'published', 'draft', 'archived'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
    price DECIMAL(10, 4) NOT NULL,
    `change` DECIMAL(10, 4) NOT NULL,
    change_percent DECIMAL(5, 2) NOT NULL,
    volume BIGINT NOT NULL,
    market_cap BIGINT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    category ENUM('stocks', 'bonds', 'commodities', 'currencies') NOT NULL
);

-- Create the 'economic_indicators' table
CREATE TABLE IF NOT EXISTS economic_indicators (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    value DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    `change` DECIMAL(10, 2) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    category ENUM('inflation', 'gdp', 'interest_rates', 'employment') NOT NULL
);

-- Create the 'market_index_history' table
CREATE TABLE IF NOT EXISTS market_index_history (
    id VARCHAR(255) PRIMARY KEY,
    index_type ENUM('GSE-CI', 'GSE-FSI') NOT NULL,
    date DATE NOT NULL,
    value DECIMAL(10, 4) NOT NULL,
    `change` DECIMAL(10, 4) NOT NULL,
    change_percent DECIMAL(5, 2) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (index_type, date) -- Ensure unique entry per index per day
);

-- Create the 'jobs' table
CREATE TABLE IF NOT EXISTS jobs (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'full-time', 'part-time', 'contract'
    description TEXT NOT NULL,
    requirements JSON NOT NULL DEFAULT (JSON_ARRAY()), -- Store as JSON array of strings
    responsibilities JSON NOT NULL DEFAULT (JSON_ARRAY()), -- Store as JSON array of strings
    status VARCHAR(50) NOT NULL DEFAULT 'active', -- 'active', 'paused', 'closed'
    posted_date DATE DEFAULT CURRENT_DATE,
    application_deadline DATE,
    applications_count INT DEFAULT 0
);

-- Create the 'job_applications' table
CREATE TABLE IF NOT EXISTS job_applications (
    id VARCHAR(36) PRIMARY KEY,
    job_id VARCHAR(36) NOT NULL,
    applicant_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    resume TEXT NOT NULL, -- Store URL or path to resume
    cover_letter TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'reviewing', 'interviewed', 'hired', 'rejected'
    applied_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- Create the 'activity_logs' table
CREATE TABLE IF NOT EXISTS activity_logs (
    id VARCHAR(36) PRIMARY KEY,
    action VARCHAR(255) NOT NULL,
    resource VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    severity VARCHAR(50) NOT NULL, -- 'low', 'medium', 'high'
    details TEXT
);

-- Create the 'notifications' table
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'info', 'success', 'warning', 'error'
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'viewer') NOT NULL DEFAULT 'viewer',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the 'settings' table
CREATE TABLE IF NOT EXISTS settings (
    id VARCHAR(255) PRIMARY KEY,
    `key` VARCHAR(255) NOT NULL UNIQUE,
    value TEXT,
    category VARCHAR(255) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
