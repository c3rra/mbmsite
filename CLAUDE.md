# Mad Banana Media — Claude Code Context

## Project
Newsletter Mastery Program (NMP) landing page for Mad Banana Media (Chris Cerra's newsletter strategy consulting agency).

**Main file:** `newslettermasteryprogram.html` (Cohort 2 landing page — live at /newslettermasteryprogram)
**Archived:** `newslettermasteryprogram-cohort1.html` (old Cohort 1 page)
**Stylesheet:** `styles.css` (shared across all site pages — all NMP classes prefixed `mastery-`)
**Other pages:** `index.html`, `partners.html`, `privacy.html`, thank you page

## Deployment
GitHub Pages. Dev: VS Code Live Preview.

## Brand & Tone
Direct, no-nonsense, conversational. Short punchy sentences, second person, arrows (→), strategic bold. Playful banana branding (🍌). Practical over theoretical. Honest, not hype-driven. No generic AI aesthetics.

## Locked Copy (do not change without being asked)
- H1: "What if your newsletter made (serious) money?"
- H2: "And only took 2hrs a week?"
- CTA: "Join The Program →"
- Scarcity badge: "Cohort 2: August 3–28, 2026 — 6 spots only"

## Pricing structure

The live page shows a **single flat price (£1,900)** under the label "Your Investment", with the countdown pointed at the Aug 3 2026 program start ("Program starts in"). Deliberate decision: once the early-bird windows closed, we removed every trace of the old lower tiers so late visitors never see a price they missed.

### Restoring the tiered pricing for a future cohort
An earlier version used a 3-tier structure (Super Early Bird £1,400 → Early Bird £1,700 → Last Chance £1,900) with a tier strip and a tier-aware countdown that auto-advanced on set dates.

That version is preserved at the git tag **`pricing-tiers-structure`**. To rebuild it:

```bash
git show pricing-tiers-structure:newslettermasteryprogram.html
```

The relevant parts are the `.mastery-price-timeline` / `.mastery-price-tier` markup in the investment section, and the `getConfig()` function in the countdown script at the bottom of the file. Tier CSS still lives in `styles.css`, so only the HTML and the countdown dates need restoring. Remember to update the cohort dates and the hardcoded countdown year.

## Active TODOs
No outstanding build tasks. Page is live and feature-complete for Cohort 2 sales.
