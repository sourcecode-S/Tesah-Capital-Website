# Security Policy

## Overview
This document outlines the security best practices implemented in this project and guidelines for maintaining security standards.

## Fixed Vulnerabilities

### 1. **Next.js Remote Code Execution (RCE)**
- **Status**: FIXED
- **Severity**: Critical
- **Issue**: Next.js 15.2.0-15.2.5 vulnerable to RCE in React flight protocol
- **Fix**: Updated to Next.js 15.2.9+
- **CVE**: GHSA-9qr9-h5gf-34mp

### 2. **Next.js Denial of Service (DoS)**
- **Status**: FIXED
- **Severity**: High
- **Issue**: DoS vulnerability with Server Components and HTTP deserialization
- **Fix**: Updated to Next.js 15.2.9+
- **CVEs**: GHSA-mwv6-3258-q52c, GHSA-h25m-26qc-wcjf

### 3. **Nodemailer Address Parser DoS**
- **Status**: FIXED
- **Severity**: High
- **Issue**: Recursive calls causing Denial of Service
- **Fix**: Updated nodemailer to 7.0.11+
- **CVE**: GHSA-rcmh-qjqh-p98v

### 4. **Glob Command Injection**
- **Status**: FIXED
- **Severity**: High
- **Issue**: Command injection via -c/--cmd with shell:true
- **Fix**: Resolved via transitive dependency updates
- **CVE**: GHSA-5j98-mcp5-4vw2

### 5. **Preact JSON VNode Injection**
- **Status**: FIXED
- **Severity**: High
- **Issue**: JSON VNode injection in Preact
- **Fix**: Resolved via next-auth updates
- **CVE**: GHSA-36hm-qxxp-pg3m

### 6. **Minimatch ReDoS**
- **Status**: FIXED
- **Severity**: High
- **Issue**: Regular Expression Denial of Service (ReDoS) attacks
- **Fix**: Resolved via Tailwind CSS and dependency updates
- **CVEs**: GHSA-3ppc-4f35-3m26, and related

## Security Features Implemented

### Authentication & Authorization
- ✅ Environment-based secret management (NEXTAUTH_SECRET)
- ✅ JWT session configuration with 30-day expiration
- ✅ Session refresh policy (24-hour update cycle)
- ✅ Role-based access control (RBAC)
- ✅ Permission checking utilities

### API Security
- ✅ Rate limiting (5 requests/minute per IP)
- ✅ Request size limits (1 MB maximum)
- ✅ Content-Type validation
- ✅ Input validation using Zod schemas
- ✅ Error response sanitization (no internal details exposed)

### HTTP Security Headers
- ✅ X-Content-Type-Options: nosniff (prevents MIME sniffing)
- ✅ X-Frame-Options: DENY (prevents clickjacking)
- ✅ X-XSS-Protection: 1; mode=block (XSS protection)
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Permissions-Policy: Restricts geolocation, microphone, camera

### Transport Security
- ✅ HTTPS redirect in production
- ✅ Secure cookie settings
- ✅ CSP-ready headers

## Recommendations for Production

### 1. Environment Variables
Before deployment, ensure these are set in your environment:
```
NEXTAUTH_SECRET=<strong-random-secret-key>
NEXTAUTH_URL=https://yourdomain.com
```

Generate a strong secret:
```bash
openssl rand -base64 32
```

### 2. Database Security
- Use parameterized queries to prevent SQL injection
- Implement Row-Level Security (RLS) if using Supabase
- Never expose database credentials in code
- Use connection pooling in production

### 3. Email Security (Nodemailer)
- Use OAuth2 or API tokens instead of passwords
- Never hardcode email credentials
- Validate recipient addresses
- Implement email rate limiting

### 4. Rate Limiting
Current implementation uses in-memory storage. For production:
- Use Redis for distributed rate limiting
- Implement per-user rate limits
- Monitor for abuse patterns

```typescript
// Example: Use upstash-redis in production
import { Redis } from "@upstash/redis";
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL });
```

### 5. Content Security Policy
Add CSP headers for additional XSS protection:
```javascript
// In next.config.mjs
async headers() {
  return [{
    source: '/(.*)',
    headers: [{
      key: 'Content-Security-Policy',
      value: "default-src 'self'; script-src 'self' 'unsafe-inline'"
    }]
  }]
}
```

### 6. Dependency Management
- Regularly run `pnpm audit` to check for vulnerabilities
- Use `pnpm audit --fix` to auto-fix vulnerabilities
- Keep dependencies up to date
- Monitor security advisories

### 7. File Upload Security
If implementing file uploads:
- Validate file types (magic bytes, not just extension)
- Limit file size
- Store uploads outside web root
- Use secure random filenames
- Scan for malware

### 8. Logging & Monitoring
- Log security events (failed auth, rate limit violations)
- Monitor for suspicious patterns
- Use Sentry or similar for error tracking
- Never log sensitive data (passwords, tokens)

## Testing Security

### Manual Testing
```bash
# Check for known vulnerabilities
pnpm audit

# Type checking
pnpm tsc --noEmit

# Linting
pnpm lint
```

### Security Headers Verification
Use tools like:
- https://securityheaders.com
- https://owasp.org/www-project-juice-shop/

## Reporting Security Issues

If you discover a security vulnerability:
1. Do NOT create a public GitHub issue
2. Email security details to: security@tesahcapital.com
3. Include: description, affected component, steps to reproduce
4. Allow time for patching before disclosure

## Maintenance Schedule

- ✅ Weekly: Check npm audit
- ✅ Monthly: Update dependencies
- ✅ Quarterly: Security review
- ✅ Yearly: Full penetration test

## Resources

- OWASP Top 10: https://owasp.org/Top10/
- Next.js Security: https://nextjs.org/docs/advanced-features/security-headers
- Node.js Security: https://nodejs.org/en/docs/guides/security/
- NPM Audit: https://docs.npmjs.com/cli/v8/commands/npm-audit

## Compliance

This project follows:
- ✅ OWASP Top 10 guidelines
- ✅ CWE/SANS Top 25
- ✅ NIST Secure Software Development Framework

Last Updated: May 23, 2026
