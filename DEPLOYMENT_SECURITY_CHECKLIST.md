# Deployment Security Checklist

## Pre-Deployment Verification

### ✅ Code Changes Completed
- [x] Updated Next.js to 15.5.18
- [x] Updated nodemailer to 8.0.8
- [x] Updated Kysely to 0.28.17
- [x] Added security headers in next.config.mjs
- [x] Implemented rate limiting in API routes
- [x] Added environment-based secret management
- [x] Implemented input validation and sanitization
- [x] Created security documentation

### 🔍 Pre-Deployment Security Checks

#### Vulnerability Scanning
- [ ] Run `pnpm audit` to verify no NEW vulnerabilities introduced
- [ ] Review audit report for any unresolved vulnerabilities
- [ ] Check known CVE databases for any project-specific concerns

#### Code Review
- [ ] Review SECURITY.md for all implemented controls
- [ ] Verify rate limiting logic in API routes
- [ ] Check that no secrets are hardcoded in codebase
- [ ] Verify all API endpoints have input validation

#### Dependency Security
- [ ] Verify lock file (`pnpm-lock.yaml`) reflects patched versions
- [ ] Test build process: `pnpm build`
- [ ] Test dev server: `pnpm dev`
- [ ] Verify no build errors or warnings

---

## Environment Setup

### Required Environment Variables

Before deployment, configure these in your Vercel project settings (Settings > Environment Variables):

```
NEXTAUTH_SECRET=<generate-with-openssl>
NEXTAUTH_URL=https://yourdomain.com
```

#### Generating NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

**Store securely in:**
1. Vercel project environment variables
2. Your secure secrets manager (never in git)
3. Your local `.env.local` file (for development only)

### Optional Environment Variables
```
NODE_ENV=production
LOG_LEVEL=error
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=5
```

---

## Deployment Checklist

### 1. Pre-Deployment Testing
- [ ] Run: `pnpm build`
- [ ] Verify build completes without errors
- [ ] Run: `pnpm lint`
- [ ] Run: `pnpm type-check` (if configured)
- [ ] Test locally: `pnpm dev`
- [ ] Test authentication flows
- [ ] Test API endpoints with rate limiting
- [ ] Test job application form

### 2. GitHub Configuration
- [ ] Push changes to feature branch
- [ ] Create Pull Request with security changes
- [ ] Request code review
- [ ] Verify CI/CD pipeline passes
- [ ] Merge to main after approval

### 3. Vercel Deployment
- [ ] Verify Vercel project settings
- [ ] Confirm all environment variables are set
- [ ] Set NODE_ENV=production
- [ ] Deploy to staging first: `vercel --prod` (on staging)
- [ ] Verify deployment health
- [ ] Run security tests in staging
- [ ] Deploy to production: `vercel --prod`

### 4. Post-Deployment Verification
- [ ] Verify application loads without errors
- [ ] Test HTTPS/TLS certificate
- [ ] Verify security headers are present (use curl):
  ```bash
  curl -I https://yourdomain.com
  # Check for:
  # X-Content-Type-Options: nosniff
  # X-Frame-Options: DENY
  # X-XSS-Protection: 1; mode=block
  ```
- [ ] Test rate limiting functionality
- [ ] Monitor error logs for issues
- [ ] Test all critical user flows

### 5. Security Headers Verification
Use online tools to verify headers:
- https://securityheaders.com (paste your domain)
- Check for these headers in response:
  - ✅ X-Content-Type-Options: nosniff
  - ✅ X-Frame-Options: DENY
  - ✅ X-XSS-Protection
  - ✅ Referrer-Policy

### 6. Application Testing
- [ ] Test signup/login functionality
- [ ] Test job application submission
- [ ] Test rate limiting (submit 6 requests in 1 minute)
- [ ] Verify error messages don't expose internals
- [ ] Test form validation with invalid inputs
- [ ] Test with various browsers and devices

### 7. Monitoring & Logging
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure security event logging
- [ ] Set up uptime monitoring
- [ ] Configure alerts for:
  - Application errors
  - Rate limiting triggers
  - Security events
  - Unusual activity patterns

### 8. Documentation Updates
- [ ] Update internal security docs
- [ ] Share SECURITY.md with team
- [ ] Brief team on rate limiting changes
- [ ] Document environment variables
- [ ] Create runbook for security incidents

---

## Post-Deployment Maintenance

### Weekly Tasks
- [ ] Run: `pnpm audit`
- [ ] Review error logs
- [ ] Check monitoring dashboard
- [ ] Verify uptime metrics

### Monthly Tasks
- [ ] Review security headers still in place
- [ ] Check for new CVEs in dependencies
- [ ] Update documentation
- [ ] Review and analyze security logs
- [ ] Test backup and recovery procedures

### Quarterly Tasks
- [ ] Full security audit
- [ ] Update dependencies
- [ ] Penetration testing (if budget allows)
- [ ] Security training for team
- [ ] Review access controls

### Annually
- [ ] Comprehensive security review
- [ ] Third-party penetration test
- [ ] Update security policies
- [ ] Compliance audit (if applicable)

---

## Incident Response

### If Vulnerability is Discovered

1. **Immediate (1 hour)**
   - Assess severity and impact
   - Notify team and stakeholders
   - Determine if production is compromised

2. **Short-term (1-24 hours)**
   - Develop patch
   - Test thoroughly
   - Deploy patch to production
   - Monitor for issues

3. **Follow-up (1 week)**
   - Post-mortem analysis
   - Document lessons learned
   - Update security controls
   - Communicate to users if needed

### Escalation Path
1. Security Team Lead
2. Engineering Manager
3. CTO/Security Officer
4. CEO (if critical)

---

## Rollback Procedure

If deployment causes issues:

```bash
# View deployment history
vercel list

# Rollback to previous version
vercel rollback

# Or redeploy specific commit
git checkout <commit-hash>
vercel --prod
```

---

## Security Testing Commands

### Local Testing
```bash
# Check vulnerabilities
pnpm audit

# Fix vulnerabilities automatically
pnpm audit --fix

# Type checking
pnpm tsc --noEmit

# Linting
pnpm lint

# Build
pnpm build

# Development server
pnpm dev
```

### Rate Limiting Test
```bash
# Test rate limiting (should fail after 5 requests in 60 seconds)
for i in {1..10}; do
  curl -X POST https://yourdomain.com/api/job-applications \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@example.com"}' \
    -w "\nStatus: %{http_code}\n"
  sleep 1
done
```

### Security Headers Test
```bash
# Check for security headers
curl -I https://yourdomain.com | grep -E "X-|Referrer|Permissions"

# Expected headers:
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# X-XSS-Protection: 1; mode=block
# Referrer-Policy: strict-origin-when-cross-origin
# Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## Emergency Contacts

For security incidents, contact:
- **Security Team:** security@tesahcapital.com
- **On-call Engineer:** [contact info]
- **CTO:** [contact info]

---

## Sign-off

### Pre-Deployment Review
- [ ] Security Lead has reviewed changes
- [ ] Engineering Manager has approved
- [ ] QA has tested functionality
- [ ] DevOps has verified infrastructure

### Deployment Authorization
- [ ] Authorized by: _______________
- [ ] Date: _______________
- [ ] Time: _______________

### Post-Deployment Verification
- [ ] All systems operational
- [ ] No critical errors in logs
- [ ] Monitoring alerts functioning
- [ ] Users can access application

---

## Additional Resources

- OWASP Top 10: https://owasp.org/Top10/
- Next.js Security: https://nextjs.org/docs/advanced-features/security-headers
- Node.js Security: https://nodejs.org/en/docs/guides/security/
- NPM Audit: https://docs.npmjs.com/cli/v8/commands/npm-audit
- Security Headers: https://securityheaders.com

---

**Last Updated:** May 23, 2026  
**Next Review:** June 23, 2026  
**Document Owner:** Security Team
