-- Seed data for 'pages' table
INSERT INTO pages (id, title, slug, content, status, created_at, updated_at, author, meta_title, meta_description, featured_image)
VALUES
('1', 'Home Page', 'home', '<h1>Welcome to Tesah Capital</h1><p>Your trusted investment partner...</p>', 'published', '2024-01-01T00:00:00Z', '2024-01-15T10:30:00Z', 'admin', 'Tesah Capital - Investment Management', 'Leading investment management company in Ghana', '/images/tesah-capital-full-logo.png'),
('2', 'About Us', 'about', '<h1>About Tesah Capital</h1><p>Founded with a vision to...</p>', 'published', '2024-01-02T00:00:00Z', '2024-01-10T14:20:00Z', 'admin', 'About Tesah Capital', 'Learn about our history, mission, and values', NULL),
('3', 'Investment Products', 'investment-products', '<h1>Our Investment Products</h1><p>Discover our range of investment solutions...</p>', 'published', '2024-01-03T00:00:00Z', '2024-01-12T09:15:00Z', 'admin', NULL, NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    slug = EXCLUDED.slug,
    content = EXCLUDED.content,
    status = EXCLUDED.status,
    created_at = EXCLUDED.created_at,
    updated_at = EXCLUDED.updated_at,
    author = EXCLUDED.author,
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description,
    featured_image = EXCLUDED.featured_image;

-- Seed data for 'market_data_points' table
INSERT INTO market_data_points (id, symbol, name, price, change, change_percent, volume, market_cap, last_updated, category) VALUES
('1', 'GSE-CI', 'Ghana Stock Exchange Composite Index', 3245.67, 12.45, 0.38, 1250000, 65000000000, '2024-01-15 16:00:00Z', 'stocks') ON CONFLICT (id) DO NOTHING;
INSERT INTO market_data_points (id, symbol, name, price, change, change_percent, volume, market_cap, last_updated, category) VALUES
('2', 'GHS/USD', 'Ghana Cedi to US Dollar', 0.082, -0.001, -1.20, 45000000, NULL, '2024-01-15 16:00:00Z', 'currencies') ON CONFLICT (id) DO NOTHING;
INSERT INTO market_data_points (id, symbol, name, price, change, change_percent, volume, market_cap, last_updated, category) VALUES
('3', 'GOLD', 'Gold (per ounce)', 2045.30, 15.20, 0.75, 125000, NULL, '2024-01-15 16:00:00Z', 'commodities') ON CONFLICT (id) DO NOTHING;

-- Seed data for 'economic_indicators' table
INSERT INTO economic_indicators (id, name, value, unit, change, last_updated, category) VALUES
('1', 'Inflation Rate', 23.60, '%', -0.80, '2024-01-01 00:00:00Z', 'inflation') ON CONFLICT (id) DO NOTHING;
INSERT INTO economic_indicators (id, name, value, unit, change, last_updated, category) VALUES
('2', 'Bank of Ghana Policy Rate', 30.00, '%', 0.00, '2024-01-15 00:00:00Z', 'interest_rates') ON CONFLICT (id) DO NOTHING;
INSERT INTO economic_indicators (id, name, value, unit, change, last_updated, category) VALUES
('3', 'GDP Growth Rate', 3.20, '%', 0.50, '2023-12-31 00:00:00Z', 'gdp') ON CONFLICT (id) DO NOTHING;

-- Seed data for 'market_index_history' table
INSERT INTO market_index_history (id, index_type, date, value, change, change_percent, last_updated) VALUES
('gseci-2024-07-01', 'GSE-CI', '2024-07-01', 3200.0, 10.0, 0.31, '2024-07-01 16:00:00Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO market_index_history (id, index_type, date, value, change, change_percent, last_updated) VALUES
('gseci-2024-07-02', 'GSE-CI', '2024-07-02', 3215.5, 15.5, 0.48, '2024-07-02 16:00:00Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO market_index_history (id, index_type, date, value, change, change_percent, last_updated) VALUES
('gseci-2024-07-03', 'GSE-CI', '2024-07-03', 3205.2, -10.3, -0.32, '2024-07-03 16:00:00Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO market_index_history (id, index_type, date, value, change, change_percent, last_updated) VALUES
('gseci-2024-07-04', 'GSE-CI', '2024-07-04', 3220.8, 15.6, 0.49, '2024-07-04 16:00:00Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO market_index_history (id, index_type, date, value, change, change_percent, last_updated) VALUES
('gseci-2024-07-05', 'GSE-CI', '2024-07-05', 3245.67, 24.87, 0.77, '2024-07-05 16:00:00Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO market_index_history (id, index_type, date, value, change, change_percent, last_updated) VALUES
('gsefsi-2024-07-01', 'GSE-FSI', '2024-07-01', 2100.0, 5.0, 0.24, '2024-07-01 16:00:00Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO market_index_history (id, index_type, date, value, change, change_percent, last_updated) VALUES
('gsefsi-2024-07-02', 'GSE-FSI', '2024-07-02', 2102.5, 2.5, 0.12, '2024-07-02 16:00:00Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO market_index_history (id, index_type, date, value, change, change_percent, last_updated) VALUES
('gsefsi-2024-07-03', 'GSE-FSI', '2024-07-03', 2098.0, -4.5, -0.21, '2024-07-03 16:00:00Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO market_index_history (id, index_type, date, value, change, change_percent, last_updated) VALUES
('gsefsi-2024-07-04', 'GSE-FSI', '2024-07-04', 2105.1, 7.1, 0.34, '2024-07-04 16:00:00Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO market_index_history (id, index_type, date, value, change, change_percent, last_updated) VALUES
('gsefsi-2024-07-05', 'GSE-FSI', '2024-07-05', 2123.45, 18.35, 0.87, '2024-07-05 16:00:00Z') ON CONFLICT (id) DO NOTHING;

-- Seed data for 'jobs' table
INSERT INTO jobs (id, title, department, location, type, description, requirements, responsibilities, status, posted_date, application_deadline, applications_count)
VALUES
('1', 'Senior Financial Analyst', 'Finance', 'Accra, Ghana', 'full-time', 'We are seeking a Senior Financial Analyst to join our growing team...', '["Bachelor''s degree in Finance, Economics, or related field", "3+ years of experience in financial analysis", "Strong analytical and problem-solving skills", "Proficiency in Excel and financial modeling"]', '["Conduct financial analysis and modeling", "Prepare financial reports and presentations", "Support investment decision-making processes", "Monitor market trends and economic indicators"]', 'active', '2024-01-15', '2024-02-15', 12),
('2', 'Investment Associate', 'Investments', 'Accra, Ghana', 'full-time', 'Join our investment team as an Investment Associate...', '["Master''s degree in Finance, MBA preferred", "2+ years of investment experience", "CFA certification preferred", "Strong quantitative skills"]', '["Evaluate investment opportunities", "Conduct due diligence on potential investments", "Prepare investment memos and presentations", "Monitor portfolio performance"]', 'active', '2024-01-10', NULL, 8)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    department = EXCLUDED.department,
    location = EXCLUDED.location,
    type = EXCLUDED.type,
    description = EXCLUDED.description,
    requirements = EXCLUDED.requirements,
    responsibilities = EXCLUDED.responsibilities,
    status = EXCLUDED.status,
    posted_date = EXCLUDED.posted_date,
    application_deadline = EXCLUDED.application_deadline,
    applications_count = EXCLUDED.applications_count;

-- Seed data for 'job_applications' table
INSERT INTO job_applications (id, job_id, applicant_name, email, phone, resume, cover_letter, status, applied_date)
VALUES
('1', '1', 'John Doe', 'john.doe@email.com', '+233 24 123 4567', '/resumes/john-doe-resume.pdf', 'I am excited to apply for the Senior Financial Analyst position...', 'reviewing', '2024-01-20T00:00:00Z'),
('2', '1', 'Jane Smith', 'jane.smith@email.com', '+233 20 987 6543', '/resumes/jane-smith-resume.pdf', NULL, 'pending', '2024-01-22T00:00:00Z')
ON CONFLICT (id) DO UPDATE SET
    job_id = EXCLUDED.job_id,
    applicant_name = EXCLUDED.applicant_name,
    email = EXCLUDED.email,
    phone = EXCLUDED.phone,
    resume = EXCLUDED.resume,
    cover_letter = EXCLUDED.cover_letter,
    status = EXCLUDED.status,
    applied_date = EXCLUDED.applied_date;

-- Seed data for 'activity_logs' table
INSERT INTO activity_logs (id, action, resource, user_name, user_id, timestamp, severity, details)
VALUES
('1', 'login', 'admin_panel', 'admin@tesahcapital.com', '1', '2024-07-15T14:00:00Z', 'low', 'Successful login'),
('2', 'update', 'market_data', 'admin@tesahcapital.com', '1', '2024-07-15T13:45:00Z', 'medium', 'Updated GSE-CI price'),
('3', 'delete', 'user', 'superadmin@tesahcapital.com', 'super_admin_id', '2024-07-15T13:30:00Z', 'high', 'Deleted user ''John Doe''')
ON CONFLICT (id) DO UPDATE SET
    action = EXCLUDED.action,
    resource = EXCLUDED.resource,
    user_name = EXCLUDED.user_name,
    user_id = EXCLUDED.user_id,
    timestamp = EXCLUDED.timestamp,
    severity = EXCLUDED.severity,
    details = EXCLUDED.details;

-- Seed data for 'notifications' table
INSERT INTO notifications (id, user_id, title, message, type, is_read, created_at)
VALUES
('1', '1', 'Welcome to Admin Panel', 'You have successfully logged into the admin panel', 'success', FALSE, '2024-07-15T13:00:00Z'),
('2', '1', 'System Update', 'The system has been updated to the latest version', 'info', FALSE, '2024-07-15T12:00:00Z')
ON CONFLICT (id) DO UPDATE SET
    user_id = EXCLUDED.user_id,
    title = EXCLUDED.title,
    message = EXCLUDED.message,
    type = EXCLUDED.type,
    is_read = EXCLUDED.is_read,
    created_at = EXCLUDED.created_at;

-- Seed data for 'users' table (optional, if you move auth to DB)
INSERT INTO users (id, name, email, password_hash, role, is_active, created_at, updated_at) VALUES
('user1', 'Admin User', 'admin@tesahcapital.com', '$2a$10$yF.2.g.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9', 'admin', TRUE, NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO users (id, name, email, password_hash, role, is_active, created_at, updated_at) VALUES
('user2', 'Editor User', 'editor@tesahcapital.com', '$2a$10$yF.2.g.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9', 'editor', TRUE, NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO users (id, name, email, password_hash, role, is_active, created_at, updated_at) VALUES
('user3', 'Viewer User', 'viewer@tesahcapital.com', '$2a$10$yF.2.g.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9', 'viewer', FALSE, NOW(), NOW()) ON CONFLICT (id) DO NOTHING;

-- Seed data for 'settings' table
INSERT INTO settings (id, key, value, category, last_updated) VALUES
('s1', 'siteName', 'Tesah Capital', 'general', NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO settings (id, key, value, category, last_updated) VALUES
('s2', 'siteDescription', 'Investment Management Company', 'general', NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO settings (id, key, value, category, last_updated) VALUES
('s3', 'contactEmail', 'info@tesahcapital.com', 'general', NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO settings (id, key, value, category, last_updated) VALUES
('s4', 'phoneNumber', '+233 302 908 640', 'general', NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO settings (id, key, value, category, last_updated) VALUES
('s5', 'address', 'No. 4 Sir Arku Korsah Road, Airport Residential Area, Accra', 'general', NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO settings (id, key, value, category, last_updated) VALUES
('s6', 'logo', '/images/tesah-logo.png', 'general', NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO settings (id, key, value, category, last_updated) VALUES
('s7', 'favicon', '/favicon.ico', 'general', NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO settings (id, key, value, category, last_updated) VALUES
('s8', 'facebook', 'https://facebook.com/tesahcapital', 'social', NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO settings (id, key, value, category, last_updated) VALUES
('s9', 'twitter', 'https://twitter.com/tesahcapital', 'social', NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO settings (id, key, value, category, last_updated) VALUES
('s10', 'instagram', 'https://instagram.com/tesahcapital', 'social', NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO settings (id, key, value, category, last_updated) VALUES
('s11', 'linkedin', 'https://linkedin.com/company/tesahcapital', 'social', NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO settings (id, key, value, category, last_updated) VALUES
('s12', 'youtube', 'https://youtube.com/tesahcapital', 'social', NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO settings (id, key, value, category, last_updated) VALUES
('s13', 'enableTwoFactor', 'false', 'security', NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO settings (id, key, value, category, last_updated) VALUES
('s14', 'passwordExpiry', '90', 'security', NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO settings (id, key, value, category, last_updated) VALUES
('s15', 'maxLoginAttempts', '5', 'security', NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO settings (id, key, value, category, last_updated) VALUES
('s16', 'sessionTimeout', '30', 'security', NOW()) ON CONFLICT (id) DO NOTHING;
