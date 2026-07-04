# Content governance

This prototype contains public-health adjacent educational copy. It is not launch-ready until every claim has a named owner, source, review date and reviewer sign-off.

This project is maintained by the Karta bez stigme project team. Individual contributors are not publicly listed for privacy and safety reasons.

## Source of truth

- `content/health-claims.json` is the working inventory of health, service, privacy and emergency claims.
- `content/croatia-services.json` is the working directory of Croatian routes. Entries marked `needs-verification` must not be treated as current service guidance.
- `content/launch-readiness.json` is the public launch checklist.
- JSON schemas live in `content/schemas/`.

## Required review before launch

1. Medical review by qualified professionals for all HIV, STI, PEP, PrEP, testing and emergency wording.
2. Service-owner verification for addresses, opening hours, appointment rules, anonymity, costs, accessibility and contact paths.
3. Legal/privacy review before adding any form, petition platform, analytics, contact inbox or third-party embed.
4. Accessibility review across keyboard, screen reader, reduced motion, contrast and mobile layouts.
5. Named responsible organizer and public contact.

## Editing rule

When changing a health or service claim, update the visible page and the relevant JSON inventory entry in the same change. If the claim is uncertain, keep it cautious, mark it `needs-review`, and point users to official sources.
