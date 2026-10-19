# Pop Frost

A responsive, static storefront at https://popfrost.com, hosted through GitHub Pages from `main` (repository root). There is no build step or package dependency.

## Redesign contents

- `index.html` and `styles.css`: cream, blush, butter-yellow, and botanical design; responsive navigation, occasion illustrations, FAQs, and preorder interest.
- `popfrost-logo.png` and `popfrost-garden.jpg`: unmodified original brand artwork from the owner's Pop Frost Introduvo page. No portrait is included.
- `popfrost-flower.svg`: small decorative floral favicon. Shared-link previews use the original logo.
- `CNAME`: retains the existing `popfrost.com` domain.

## Preorder flow

The active site uses the existing Google Form, both as a direct link and in an optional inline embed:
https://docs.google.com/forms/d/e/1FAIpQLSeB48l1HeqgJI4UlRuZOKAouCmTiP62SLBnynF3jPO7YRnjmg/viewform

Requests are nonbinding expressions of interest. No online payments are collected. Pricing starts at $55 per dozen for one-design stamped cookies; final design, price, availability, pickup/delivery, and repeat-stamp discounts require personal confirmation. Responses remain in the owner's private Google order sheet. Never publish response data or the response sheet.

The customer is asked to describe artwork; files are requested directly during follow-up. The site has no checkout, customer login, artwork upload, analytics, or custom JavaScript. `Code.gs` is retained as a legacy prototype and is not called by the current storefront.

## Preview and verify

Run `python3 -m http.server 8000` in the repository, then open http://localhost:8000.

Check desktop and phone widths (including 320px), internal anchors, keyboard focus, FAQ and inline-form expansion/collapse, the direct Google Form link, and image loading. Do not send real or test submissions without authorization. Confirm the exact commit's GitHub Pages deployment succeeds and check the public domain after deployment.

The form and Google Sheets, not the static site, manage submissions. Do not claim a new request succeeded merely because the iframe loaded. Any future online ordering, payment collection, or changed terms require separate setup and authorization.
