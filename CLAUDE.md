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

In January the tier strip disappears and £1,900 stands alone under the label "Your
Investment", via `hideTimeline: true` on the `standard` tier. A late visitor should
never be anchored on a discount they can no longer get. August through December keep
the strip, because the higher prices still ahead do the urgency work.

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

## Rolling the page to the next cohort

Chris will say something like: *"Launching the next cohort, starts June, super early
bird through March, early bird April, standard May."* That is enough to do the whole
job. Everything below is derived, not asked about. Confirm the prices if they are not
mentioned, and ask nothing else.

### Step 1: derive the dates. Verify with `cal`, never from memory.

| Value | Rule | Cohort 3 worked example |
| :--- | :--- | :--- |
| Program start | First Monday of the launch month | Mon 1 Feb 2027 |
| Program end | Start + 25 days (4 weeks, Mon to Fri) | Fri 26 Feb 2027 |
| Onboarding 1:1 | Start − 5 days (the Wednesday before) | Wed 27 Jan 2027 |

Run `cal <month> <year>` and confirm the start really is a Monday and the end really is
a Friday before writing anything. Both prior cohorts fit these rules: Cohort 2 ran Mon
3 Aug to Fri 28 Aug 2026 with onboarding Wed 29 July.

Check the session-time copy in "How The Program Works". It says "4pm CET". CET is correct
for roughly late October to late March; outside that Europe is on CEST. Fix or flag it.

### Step 2: derive the tier windows.
Each tier sells until the end of its named month. `endsAt` is always **midnight at the
start of the following day**, which is the same value as the next tier's opening.

- Super Early Bird `endsAt` = first day of the month after its last month
- Early Bird `endsAt` = first day of the month after its last month
- Standard `endsAt` = `programStartsAt`. Standard always runs to the day before the start.
- `programStartsAt` = the program start date

Remember `new Date(y, m, d)` takes a **0-indexed month**: January is 0, December is 11.

### Step 3: get a Stripe payment link per tier, and verify each one.
Chris supplies these. A tier's link must charge exactly its `price`.

**Verify by loading the checkout page, every time.** Never trust a link because of its
name, its URL, or a git commit message. The price is rendered client-side, so `curl`
plus `grep` will not find it. Drive headless Chrome over the DevTools protocol, navigate
to the link, wait a few seconds, then read `document.body.innerText`. The rendered text
shows the product name and the amount.

If Chris has not supplied a link for a tier, set `link: null` rather than guessing. The
gate skips that tier and falls back to the last one that has a link, showing that tier's
price too, so the page can never display a price it cannot charge.

### Step 4: edit these 12 places, and nothing else.
`newslettermasteryprogram.html`:
1. Hero scarcity badge (`mastery-scarcity-badge`), e.g. "FEB 1–26 - MAX 6 SEATS - JOIN NOW"
2. "Onboarding: Wednesday 27 January" in the How It Works section
3. Investment dates pill (`mastery-investment-dates`), "NEXT PROGRAM: FEB 1–26, 2027"
4. Static tier strip: three prices and three "ends <date>" labels
5. Static `nmpHeroAmount` and `nmpHeroLabel`, set to the **first** tier
6. All 8 `data-nmp-cta` hrefs, set to the **first** tier's link
7. Final CTA `mastery-spots-remaining`, "Feb 1–26, 2027 | only 6 seats. Join now."
8. FAQ "When does the next Newsletter Mastery Program run?" answer
9. Closing CTA "Starting Feb 1, secure one of six seats now."
10. Mobile sticky bar text
11. `NMP_PRICING`: `programStartsAt` plus each tier's `price`, `endsAt` and `link`
12. `nmp-thankyou.html`, the onboarding and start dates in Step 2

Items 4, 5 and 6 are the no-JavaScript fallback, so they must match the **first** tier's
state. The gate overwrites them on load; they exist so the page is still correct if the
script never runs.

Keep `hideTimeline: true` and `heroLabel: 'Your Investment'` on the final tier. Earlier
tiers keep the strip.

### Step 5: prove it before committing.
Load the page in headless Chrome with the clock faked to each boundary, and read back the
rendered state. Faking is done by overriding `window.Date` via
`Page.addScriptToEvaluateOnNewDocument` before navigating. Test at minimum:

- mid first tier
- last hour of each tier
- first hour of each following tier
- first hour after `programStartsAt` (expect the closed state and waitlist links)

For each, confirm the highlighted tier, headline price and label, strip visibility,
countdown wording, and the href on all 8 CTAs. Do not report it working without this.

### Step 6: update this file.
Refresh the Locked Copy badge, the cohort dates section, and the pricing table above.

## Every page needs a link preview card

**Standing instruction from Chris, 23 Sep 2026. Applies to every page built here, not
just landing pages.** A page without an `og:image` lets the platform pick something off
the page, which on this site means the square logo or a client headshot.

The process and the design rules live in `~/Documents/mbm-landers/visuals/README-og.md`.
Follow it rather than improvising: copy `og-card.html`, change only the headline (with
`.key` on the word carrying the yellow underline) and the sub line, render at
`--force-device-scale-factor=2` so the 1200x630 layout comes out 2400x1260, and set
`og:image:width` and `og:image:height` to the rendered size rather than the layout size.

Cards for this site live in `visuals/og-card-<page>.html`, rendered to
`images/og-<page>.png`. `og:image` must be an absolute URL, and `<title>` and `og:title`
must match, because they are the same promise.

Built so far: `services` (`How we help you`).

## Stylesheet cache busting

`styles.css` is served with `cache-control: max-age=14400`, so a returning visitor can
hold a four-hour-old stylesheet and see new markup styled by old CSS. Every page
therefore links it as `styles.css?v=<date>`. **Bump that version whenever styles.css
changes**, or the next CSS change will silently not reach people for four hours.

## Active TODOs
No outstanding build tasks. All three tiers have verified payment links and the page
rolls itself over on schedule through to the 1 Feb 2027 program start.
