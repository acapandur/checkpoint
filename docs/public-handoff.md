# Public handoff and privacy cleanup

Goal: public files should not reveal individual contributors' names, private emails, social handles, personal accounts, local machine paths or authorship metadata.

This does not guarantee complete anonymity. Platform records, hosting records, payment records, registrar records and previous public copies may still exist outside the codebase.

## Public identity

- Maintainer label: `Karta bez stigme tim`
- English label: `Project team`
- Croatian label: `Neovisni projektni tim`
- Public contact placeholders: `contact@example.org`, `privacy@example.org`, `security@example.org`

Individual contributors are not publicly listed for privacy and safety reasons.

## Do not publish existing private history

If the working repository has ever used personal Git authors, personal remotes, personal commit messages, local paths or public-account deployment URLs, publish from a clean repository instead of rewriting history in place.

Recommended clean export:

```bash
mkdir karta-bez-stigme-public-clean
rsync -av --exclude='.git' --exclude='node_modules' --exclude='dist' --exclude='build' OLD_PROJECT/ karta-bez-stigme-public-clean/
cd karta-bez-stigme-public-clean
git init
git config user.name "Karta bez stigme tim"
git config user.email "dev@example.org"
git add .
git commit -m "Initial public prototype"
```

Windows PowerShell alternative:

```powershell
$src = Resolve-Path OLD_PROJECT
$dst = Resolve-Path .
robocopy $src "$dst\karta-bez-stigme-public-clean" /E /XD .git node_modules dist build
Set-Location "$dst\karta-bez-stigme-public-clean"
git init
git config user.name "Karta bez stigme tim"
git config user.email "dev@example.org"
git add .
git commit -m "Initial public prototype"
```

## Before publishing

1. Replace `example.org` with a domain that does not identify an individual contributor.
2. Re-render any exported PDFs/images and strip creator metadata.
3. Run repository scans for local paths, personal emails, social handles, source maps and old hosting URLs.
4. Confirm no `.git` directory from private development history is included in the public handoff.
5. Publish from a neutral account or project-controlled organization, not an individual's personal account.
