# Mad Banana Media — Claude Code Context

## Project
Newsletter Mastery Program (NMP) landing page for Mad Banana Media (Chris Cerra's newsletter strategy consulting agency).

**Main file:** `newslettermasteryprogram.html` (Cohort 3 landing page — live at /newslettermasteryprogram)
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
- Scarcity badge: "FEB 1–26 - MAX 6 SEATS - JOIN NOW"

## Cohort 3 dates (verified against a calendar, do not adjust from memory)
- Program: Monday 1 February to Friday 26 February 2027 (4 weeks, Mon to Fri)
- Onboarding 1:1: Wednesday 27 January 2027
- Sessions: Mon 4pm CET, Thu (TBC), Fri 4pm CET. February is CET, so the copy is correct as written.

## Pricing gate (self-updating, do not hand-edit prices in the markup)
All price tiers, the countdown and every CTA link are driven by the `NMP_PRICING`
object in the script at the bottom of `newslettermasteryprogram.html`. Tiers roll
over on their own, so no commit is needed when a deadline passes.

| Tier | Price | Sells until | Stripe link |
| :--- | :--- | :--- | :--- |
| Super Early Bird | £1,400 | 30 Nov 2026 | `…aR204` (verified charges £1,400) |
| Early Bird | £1,650 | 31 Dec 2026 | `…aR206` (verified charges £1,650) |
| Standard | £1,900 | 31 Jan 2027 | `…aR205` (verified charges £1,900) |

From 1 Feb 2027 the section switches itself to a closed state and all CTAs point at
the waitlist (`tally.so/r/dWl7qd`).

Rules:
- A tier's `link` must charge exactly its `price`. Verify by loading the checkout page.
- A tier with `link: null` is skipped: the page falls back to the last tier that has a
  link and shows that tier's price, so displayed and charged price can never disagree.
- The gate is front-end only. It changes what the page offers; it does not kill an old
  URL. To hard-close a tier, deactivate its payment link in Stripe.
- `…aR200` (Cohort 1, £999) is deactivated. `…aR201` (£1,400) and `…aR202` (£800 deposit)
  belong to `nmp-waitlist-thankyou.html`, not this page.

### Pricing history, and why the gate exists
Cohort 2 also ran tiered, but swapped by hand: three copies of the investment section
sat in the file, two commented out, and one got uncommented when a deadline passed.
Two things went wrong with that, and the gate exists to prevent both.

- The copy and the link drifted apart. From 16 June to 21 July 2026 the live page
  displayed £1,700 and then £1,900 while every button still charged £1,400, because
  the swap updated the price text and left the Stripe URL behind.
- Late in Cohort 2 the tiers were stripped out entirely in favour of a single flat
  £1,900 under the label "Your Investment", so late visitors never saw a price they
  had missed. Reasonable, but it meant losing the tier strip and rebuilding it here.

That hand-swapped tiered version is preserved at the git tag `pricing-tiers-structure`
(`git show pricing-tiers-structure:newslettermasteryprogram.html`). Keep it for
reference only. The config-driven version supersedes it, and reintroducing manual
swapping would reintroduce the drift.

If you want to hide the lower tiers again near the end of a cohort, do it by editing
`NMP_PRICING`, not by deleting markup.

## Active TODOs
No outstanding build tasks. All three tiers have verified payment links and the page
rolls itself over on schedule through to the 1 Feb 2027 program start.
