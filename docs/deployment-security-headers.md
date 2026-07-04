# Deployment security headers

The HTML files include a conservative CSP meta tag and `no-referrer` meta tag. A production host should still set HTTP headers, because headers are stronger and can cover directives that meta tags cannot enforce.

Recommended HTTP headers:

```txt
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests
Referrer-Policy: no-referrer
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
X-Content-Type-Options: nosniff
```

GitHub Pages can serve the static files, but it does not provide full custom security header control for this repository. For production, prefer hosting that supports custom response headers and deployment previews with security-header checks.

Before production launch, replace `https://example.org` and template contacts with real project-controlled values and run the full security check suite.
