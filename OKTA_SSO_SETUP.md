# Okta SSO Setup Guide
## For GTM Enablement Hub Website

This document outlines what's needed to integrate Okta SSO authentication with the Gladly GTM Enablement Hub.

---

## Overview

**Current State:** Website is deployed and public at https://gladly-gtm-hub.vercel.app

**Goal:** Restrict access to only authenticated employees using Okta SSO

**Technology:** Next.js website deployed on Vercel

---

## What IT/Admin Needs to Do

### Step 1: Create Okta Application

1. Log into Okta Admin Console
2. Go to **Applications** → **Create App Integration**
3. Choose **OIDC - OpenID Connect**
4. Choose **Web Application**

### Step 2: Configure Application Settings

**Application Name:** Gladly GTM Enablement Hub

**Sign-in redirect URIs:**
```
https://gladly-gtm-hub.vercel.app/api/auth/callback/okta
http://localhost:3000/api/auth/callback/okta (for testing)
```

**Sign-out redirect URIs:**
```
https://gladly-gtm-hub.vercel.app
http://localhost:3000 (for testing)
```

**Assignments:**
- Assign to specific groups (e.g., "GTM Team", "Sales Team", "All Employees")
- Or assign to everyone in the organization

### Step 3: Collect Required Information

After creating the app, please provide these values:

```
OKTA_CLIENT_ID: [from Okta app settings]
OKTA_CLIENT_SECRET: [from Okta app settings]
OKTA_ISSUER: https://[your-okta-domain].okta.com/oauth2/default
```

**Where to find these:**
- **Client ID**: Okta app → General tab → Client Credentials
- **Client Secret**: Okta app → General tab → Client Credentials → Show secret
- **Issuer**: Your Okta domain URL + `/oauth2/default`

---

## What the Developer Will Do

Once we receive the above credentials, we'll:

1. Install and configure NextAuth.js with Okta provider
2. Add authentication middleware to protect all routes
3. Add environment variables to Vercel
4. Deploy the secured version
5. Test with a few users before full rollout

**Estimated development time:** 30-45 minutes
**Estimated testing time:** 15-30 minutes

---

## User Experience After Implementation

**Before (Current):** Anyone with the link can access the site

**After:**
1. User visits https://gladly-gtm-hub.vercel.app
2. If not logged in, they're redirected to Okta login
3. They log in with their company credentials
4. Okta redirects them back to the site - they're now authenticated
5. Future visits don't require login (session maintained)

**Session duration:** Configurable (default: 30 days)

---

## Security Benefits

✅ Only employees with Okta accounts can access
✅ Leverages existing company authentication
✅ No passwords to manage
✅ Can revoke access by removing from Okta
✅ Can track who accesses the site
✅ Automatic logout when Okta session expires

---

## Alternative: Vercel Enterprise SSO

If your organization already has Vercel Enterprise, you can use Vercel's built-in SAML/SSO integration:

- Go to Vercel team settings
- Configure SAML SSO with Okta
- Enable Deployment Protection
- All done - no code changes needed!

**Cost:** Requires Vercel Enterprise plan

---

## Questions?

Contact: [Your email/contact info]

**Next Steps:**
1. Share this document with IT/Okta admin
2. Request Okta app creation and credentials
3. Once received, notify developer to implement
4. Test with 2-3 users
5. Roll out to all 200 employees

---

**Last Updated:** 2025-01-11
