# Accessibility checklist

This site should remain usable without playing the story, without JavaScript for critical information, and without pointer-only interactions.

## Baseline requirements

- One meaningful `h1` per page.
- Skip link, header, navigation, main and footer on every page.
- Native tables for tabular information.
- Keyboard-visible focus for links, buttons, language switch, story choices and filters.
- Critical urgent-help content available as static HTML.
- No motion-only instructions; respect `prefers-reduced-motion`.
- Text must not overlap at mobile widths.
- Language switch updates `lang`, title, description and relevant labels.

## Manual checks before launch

1. Keyboard through every page and story screen.
2. Test 375 px mobile, 768 px tablet and desktop widths.
3. Confirm service directory and launch status remain understandable if JSON fails.
4. Confirm external links are clear and use safe `rel` attributes.
5. Run a screen-reader pass on the story, status table and service directory.
