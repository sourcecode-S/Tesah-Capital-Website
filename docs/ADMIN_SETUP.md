# Admin Interface Setup Guide

## Overview

The Tesah Capital admin panel is a comprehensive management system with real authentication, role-based access control (RBAC), and database-backed persistence using Supabase.

## Features

### Authentication & Security
- **Email/Password Authentication**: Secure login via Supabase Auth
- **Row Level Security (RLS)**: Database-level access control
- **Role-Based Access Control**: Three user roles with different permissions
- **Auto-Profile Creation**: User profiles created automatically on signup
- **Session Management**: Secure HTTP-only cookies
- **Password Reset**: Email-based password recovery

### Admin Pages

#### 1. Dashboard (`/admin/dashboard`)
- **Accessible to**: Admin, Subadmin, Editor
- **Features**:
  - Overview statistics (Users, Content, Jobs, Market Data)
  - Quick access to common features
  - System status and capabilities

#### 2. User Management (`/admin/users`)
- **Accessible to**: Admin only
- **Features**:
  - Create new users with email and password
  - Assign roles (Admin, Subadmin, Editor)
  - Update user information
  - Reset user passwords via email
  - Delete user accounts
  - View all user accounts and their roles

#### 3. Content Management (`/admin/content`)
- **Accessible to**: Admin, Subadmin, Editor
- **Features**:
  - Create and manage website pages
  - Publish/draft/archive content
  - View publishing status and dates
  - Delete content pages

#### 4. Job Postings (`/admin/jobs`)
- **Accessible to**: Admin, Subadmin, Editor
- **Features**:
  - Create job postings
  - Manage job status (Open/Closed)
  - View applications
  - Manage job listings

#### 5. Market Data (`/admin/market-data`)
- **Accessible to**: Admin, Subadmin, Editor
- **Features**:
  - Post market news and updates
  - Manage data sources
  - Update market information
  - Archive old updates

#### 6. Profile Management (`/admin/profile`)
- **Accessible to**: All authenticated users
- **Features**:
  - Update personal information (name)
  - Change password
  - Update email address
  - View account information

## Getting Started

### Initial Setup

1. **Start the Development Server**
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

2. **Access the Application**
- Navigate to `http://localhost:3000`
- Use `/auth/login` to access the login page

3. **Create the First Admin Account**

The initial admin account must be created via Supabase's CLI or admin API:

```bash
npx ts-node scripts/create-admin.ts
```

**Default Admin Credentials**:
- Email: `admin@tesahcapital.com`
- Password: `Tesah2024Secure!Admin`

⚠️ **IMPORTANT**: Change this password immediately after first login!

### First Login

1. Go to `/auth/login`
2. Enter the default admin credentials
3. You'll be redirected to `/admin/dashboard`
4. Update your password in `/admin/profile`

## User Roles & Permissions

### Admin
- **Full system access**
- Can manage all users
- Can create/edit/delete all content
- Can reset user passwords
- Can manage all job postings
- Can control market data
- Can view audit logs

### Subadmin
- **Content and job management**
- Cannot manage users
- Can create/edit/publish content
- Can manage job postings
- Can update market data
- Cannot reset passwords

### Editor
- **Limited content creation**
- Can create/edit content drafts
- Cannot publish without approval
- Cannot manage users or jobs
- Can update their own profile only

## Database Schema

### Tables

#### `users_profiles`
- `id` (uuid, primary key)
- `email` (text)
- `first_name` (text)
- `last_name` (text)
- `role` (enum: admin, subadmin, editor)
- `status` (enum: active, inactive, suspended)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `content`
- `id` (uuid, primary key)
- `title` (text)
- `slug` (text)
- `content` (text)
- `status` (enum: draft, published, archived)
- `created_by` (uuid, foreign key)
- `created_at` (timestamp)
- `published_at` (timestamp, nullable)
- `updated_at` (timestamp)

#### `job_postings`
- `id` (uuid, primary key)
- `title` (text)
- `department` (text)
- `description` (text)
- `requirements` (text array)
- `status` (enum: open, closed)
- `created_by` (uuid, foreign key)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `job_applications`
- `id` (uuid, primary key)
- `job_id` (uuid, foreign key)
- `applicant_name` (text)
- `applicant_email` (text)
- `resume_url` (text)
- `cover_letter` (text)
- `status` (enum: new, reviewing, rejected, accepted)
- `created_at` (timestamp)

#### `market_data`
- `id` (uuid, primary key)
- `title` (text)
- `content` (text)
- `source` (text, nullable)
- `created_by` (uuid, foreign key)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `audit_logs`
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `action` (text)
- `table_name` (text)
- `record_id` (uuid)
- `changes` (jsonb)
- `created_at` (timestamp)

## Security Best Practices

### Password Management
- Passwords are hashed with bcrypt (Supabase Auth handles this)
- Minimum 6 characters required
- Users can reset passwords via email
- Admins can trigger password reset emails

### Access Control
- Row Level Security (RLS) enforces database-level permissions
- Role-based navigation in UI
- Auth middleware prevents unauthorized access
- Session tokens stored securely in HTTP-only cookies

### Audit Trail
- All admin actions logged to `audit_logs` table
- Track who changed what and when
- Useful for compliance and debugging

### Best Practices for Admins
1. Change the default password immediately
2. Use strong, unique passwords
3. Never share login credentials
4. Regularly review audit logs
5. Delete inactive user accounts
6. Monitor suspicious activity

## Common Tasks

### Creating a New User

1. Go to `/admin/users`
2. Click "Add User"
3. Fill in:
   - Email
   - Temporary Password
   - First Name
   - Last Name
   - Role (Admin, Subadmin, or Editor)
4. Click "Create User"
5. Share credentials with the new user via secure channel

### Resetting a User's Password

1. Go to `/admin/users`
2. Find the user in the table
3. Click the password reset button (↻)
4. User will receive email with reset link
5. User clicks link and sets new password

### Publishing Content

1. Go to `/admin/content`
2. Click edit on the content
3. Write/update content
4. Change status to "published"
5. Save changes

### Creating a Job Posting

1. Go to `/admin/jobs`
2. Click "Create Job Posting"
3. Fill in job details
4. Set status to "Open"
5. Save

## Troubleshooting

### Can't log in
- Check email and password are correct
- Verify user account exists in Supabase
- Check user status is "active" not "suspended"

### Can't access certain pages
- Verify your user role has permission
- Check navigation shows expected items
- Log out and log back in if needed

### Changes not appearing
- Refresh the page
- Check browser console for errors
- Verify Supabase connection is working

### Password reset email not received
- Check spam folder
- Verify email is correct
- Check Supabase email configuration

## Environment Variables

Required for admin panel to function:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## API Endpoints

The admin uses these client-side APIs (no direct REST calls needed):

- `@/lib/supabase/client` - Supabase client for auth and queries
- Supabase middleware for session management
- Real-time subscriptions for live updates (future)

## Next Steps

### Features to Implement
- [ ] Edit forms for content, jobs, and market data
- [ ] Bulk user import/export
- [ ] Analytics dashboard
- [ ] Email notification system
- [ ] Advanced content editor
- [ ] File upload for job documents
- [ ] Team management and permissions
- [ ] Scheduled content publishing
- [ ] API keys for external integrations

### Monitoring
- Set up error tracking (Sentry)
- Monitor database performance
- Track user activity metrics
- Set up backup system

### Scaling
- Consider caching frequently accessed data
- Implement pagination for large datasets
- Add search functionality to tables
- Optimize images and assets

## Support

For issues or questions:
1. Check this documentation
2. Review Supabase docs: https://supabase.com/docs
3. Check error logs in browser console
4. Review database logs in Supabase dashboard

## Version History

- **v1.0.0** (Initial Release)
  - Basic CRUD operations
  - Role-based access control
  - User authentication
  - Dashboard and admin pages
