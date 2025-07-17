-- Seed data for 'pages' table
INSERT INTO pages (id, title, slug, content, status, created_at, updated_at, author, meta_title, meta_description, featured_image)
VALUES
('1', 'Home Page', 'home', '<h1>Welcome to Tesah Capital</h1><p>Your trusted investment partner...</p>', 'published', '2024-01-01 00:00:00', '2024-01-15 10:30:00', 'admin', 'Tesah Capital - Investment Management', 'Leading investment management company in Ghana', '/images/tesah-capital-full-logo.png'),
('2', 'About Us', 'about', '<h1>About Tesah Capital</h1><p>Founded with a vision to...</p>', 'published', '2024-01-02 00:00:00', '2024-01-10 14:20:00', 'admin', 'About Tesah Capital', 'Learn about our history, mission, and values', NULL),
('3', 'Investment Products', 'investment-products', '<h1>Our Investment Products</h1><p>Discover our range of investment solutions...</p>', 'published', '2024-01-03 00:00:00', '2024-01-12 09:15:00', 'admin', NULL, NULL, NULL)
ON DUPLICATE KEY UPDATE
    title = VALUES(title),
    slug = VALUES(slug),
    content = VALUES(content),
    status = VALUES(status),
    created_at = VALUES(created_at),
    updated_at = VALUES(updated_at),
    author = VALUES(author),
    meta_title = VALUES(meta_title),
    meta_description = VALUES(meta_description),
    featured_image = VALUES(featured_image);

-- Seed data for 'market_data_points' table
INSERT IGNORE INTO market_data_points (id, symbol, name, price, `change`, change_percent, volume, market_cap, last_updated, category) VALUES
('1', 'GSE-CI', 'Ghana Stock Exchange Composite Index', 3245.67, 12.45, 0.38, 1250000, 65000000000, '2024-01-15 16:00:00', 'stocks'),
('2', 'GHS/USD', 'Ghana Cedi to US Dollar', 0.082, -0.001, -1.20, 45000000, NULL, '2024-01-15 16:00:00', 'currencies'),
('3', 'GOLD', 'Gold (per ounce)', 2045.30, 15.20, 0.75, 125000, NULL, '2024-01-15 16:00:00', 'commodities');

-- Seed data for 'economic_indicators' table
INSERT IGNORE INTO economic_indicators (id, name, value, unit, `change`, last_updated, category) VALUES
('1', 'Inflation Rate', 23.60, '%', -0.80, '2024-01-01 00:00:00', 'inflation'),
('2', 'Bank of Ghana Policy Rate', 30.00, '%', 0.00, '2024-01-15 00:00:00', 'interest_rates'),
('3', 'GDP Growth Rate', 3.20, '%', 0.50, '2023-12-31 00:00:00', 'gdp');

-- Seed data for 'market_index_history' table
INSERT IGNORE INTO market_index_history (id, index_type, date, value, `change`, change_percent, last_updated) VALUES
('gseci-2024-07-01', 'GSE-CI', '2024-07-01', 3200.0, 10.0, 0.31, '2024-07-01 16:00:00'),
('gseci-2024-07-02', 'GSE-CI', '2024-07-02', 3215.5, 15.5, 0.48, '2024-07-02 16:00:00'),
('gseci-2024-07-03', 'GSE-CI', '2024-07-03', 3205.2, -10.3, -0.32, '2024-07-03 16:00:00'),
('gseci-2024-07-04', 'GSE-CI', '2024-07-04', 3220.8, 15.6, 0.49, '2024-07-04 16:00:00'),
('gseci-2024-07-05', 'GSE-CI', '2024-07-05', 3245.67, 24.87, 0.77, '2024-07-05 16:00:00'),
('gsefsi-2024-07-01', 'GSE-FSI', '2024-07-01', 2100.0, 5.0, 0.24, '2024-07-01 16:00:00'),
('gsefsi-2024-07-02', 'GSE-FSI', '2024-07-02', 2102.5, 2.5, 0.12, '2024-07-02 16:00:00'),
('gsefsi-2024-07-03', 'GSE-FSI', '2024-07-03', 2098.0, -4.5, -0.21, '2024-07-03 16:00:00'),
('gsefsi-2024-07-04', 'GSE-FSI', '2024-07-04', 2105.1, 7.1, 0.34, '2024-07-04 16:00:00'),
('gsefsi-2024-07-05', 'GSE-FSI', '2024-07-05', 2123.45, 18.35, 0.87, '2024-07-05 16:00:00');

-- Seed data for 'jobs' table
INSERT INTO jobs (id, title, department, location, type, description, requirements, responsibilities, status, posted_date, application_deadline, applications_count)
VALUES
('1', 'Senior Financial Analyst', 'Finance', 'Accra, Ghana', 'full-time', 'We are seeking a Senior Financial Analyst to join our growing team...', '["Bachelor''s degree in Finance, Economics, or related field", "3+ years of experience in financial analysis", "Strong analytical and problem-solving skills", "Proficiency in Excel and financial modeling"]', '["Conduct financial analysis and modeling", "Prepare financial reports and presentations", "Support investment decision-making processes", "Monitor market trends and economic indicators"]', 'active', '2024-01-15', '2024-02-15', 12),
('2', 'Investment Associate', 'Investments', 'Accra, Ghana', 'full-time', 'Join our investment team as an Investment Associate...', '["Master''s degree in Finance, MBA preferred", "2+ years of investment experience", "CFA certification preferred", "Strong quantitative skills"]', '["Evaluate investment opportunities", "Conduct due diligence on potential investments", "Prepare investment memos and presentations", "Monitor portfolio performance"]', 'active', '2024-01-10', NULL, 8)
ON DUPLICATE KEY UPDATE
    title = VALUES(title),
    department = VALUES(department),
    location = VALUES(location),
    type = VALUES(type),
    description = VALUES(description),
    requirements = VALUES(requirements),
    responsibilities = VALUES(responsibilities),
    status = VALUES(status),
    posted_date = VALUES(posted_date),
    application_deadline = VALUES(application_deadline),
    applications_count = VALUES(applications_count);

-- Seed data for 'job_applications' table
INSERT INTO job_applications (id, job_id, applicant_name, email, phone, resume, cover_letter, status, applied_date)
VALUES
('1', '1', 'John Doe', 'john.doe@email.com', '+233 24 123 4567', '/resumes/john-doe-resume.pdf', 'I am excited to apply for the Senior Financial Analyst position...', 'reviewing', '2024-01-20 00:00:00'),
('2', '1', 'Jane Smith', 'jane.smith@email.com', '+233 20 987 6543', '/resumes/jane-smith-resume.pdf', NULL, 'pending', '2024-01-22 00:00:00')
ON DUPLICATE KEY UPDATE
    job_id = VALUES(job_id),
    applicant_name = VALUES(applicant_name),
    email = VALUES(email),
    phone = VALUES(phone),
    resume = VALUES(resume),
    cover_letter = VALUES(cover_letter),
    status = VALUES(status),
    applied_date = VALUES(applied_date);

-- Seed data for 'activity_logs' table
INSERT INTO activity_logs (id, action, resource, user_name, user_id, timestamp, severity, details)
VALUES
('1', 'login', 'admin_panel', 'admin@tesahcapital.com', '1', '2024-07-15 14:00:00', 'low', 'Successful login'),
('2', 'update', 'market_data', 'admin@tesahcapital.com', '1', '2024-07-15 13:45:00', 'medium', 'Updated GSE-CI price'),
('3', 'delete', 'user', 'superadmin@tesahcapital.com', 'super_admin_id', '2024-07-15 13:30:00', 'high', 'Deleted user ''John Doe''')
ON DUPLICATE KEY UPDATE
    action = VALUES(action),
    resource = VALUES(resource),
    user_name = VALUES(user_name),
    user_id = VALUES(user_id),
    timestamp = VALUES(timestamp),
    severity = VALUES(severity),
    details = VALUES(details);

-- Seed data for 'notifications' table
INSERT INTO notifications (id, user_id, title, message, type, is_read, created_at)
VALUES
('1', '1', 'Welcome to Admin Panel', 'You have successfully logged into the admin panel', 'success', FALSE, '2024-07-15 13:00:00'),
('2', '1', 'System Update', 'The system has been updated to the latest version', 'info', FALSE, '2024-07-15 12:00:00')
ON DUPLICATE KEY UPDATE
    user_id = VALUES(user_id),
    title = VALUES(title),
    message = VALUES(message),
    type = VALUES(type),
    is_read = VALUES(is_read),
    created_at = VALUES(created_at);

-- Seed data for 'users' table (optional, if you move auth to DB)
INSERT IGNORE INTO users (id, name, email, password_hash, role, is_active, created_at, updated_at) VALUES
('user1', 'Admin User', 'admin@tesahcapital.com', '$2a$10$yF.2.g.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9', 'admin', TRUE, NOW(), NOW()),
('user2', 'Editor User', 'editor@tesahcapital.com', '$2a$10$yF.2.g.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9', 'editor', TRUE, NOW(), NOW()),
('user3', 'Viewer User', 'viewer@tesahcapital.com', '$2a$10$yF.2.g.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9', 'viewer', FALSE, NOW(), NOW());

-- Seed data for 'settings' table
INSERT IGNORE INTO settings (id, `key`, value, category, last_updated) VALUES
('s1', 'siteName', 'Tesah Capital', 'general', NOW()),
('s2', 'siteDescription', 'Investment Management Company', 'general', NOW()),
('s3', 'contactEmail', 'info@tesahcapital.com', 'general', NOW()),
('s4', 'phoneNumber', '+233 302 908 640', 'general', NOW()),
('s5', 'address', 'No. 4 Sir Arku Korsah Road, Airport Residential Area, Accra', 'general', NOW()),
('s6', 'logo', '/images/tesah-logo.png', 'general', NOW()),
('s7', 'favicon', '/favicon.ico', 'general', NOW()),
('s8', 'facebook', 'https://facebook.com/tesahcapital', 'social', NOW()),
('s9', 'twitter', 'https://twitter.com/tesahcapital', 'social', NOW()),
('s10', 'instagram', 'https://instagram.com/tesahcapital', 'social', NOW()),
('s11', 'linkedin', 'https://linkedin.com/company/tesahcapital', 'social', NOW()),
('s12', 'youtube', 'https://youtube.com/tesahcapital', 'social', NOW()),
('s13', 'enableTwoFactor', 'false', 'security', NOW()),
('s14', 'passwordExpiry', '90', 'security', NOW()),
('s15', 'maxLoginAttempts', '5', 'security', NOW()),
('s16', 'sessionTimeout', '30', 'security', NOW());
