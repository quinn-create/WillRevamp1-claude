# Website audit — willfraleylaw.com (before the rebuild)

Prepared for Will Fraley by the revamp team (A11, creative director), from eight separate reviews of the
current site. Every number here comes from those reviews: `audit/A03.md` to `audit/A09.md`, `audit/MARKET.md`,
plus the raw speed and accessibility test files. Nothing in this summary is a guess.

## The short version

The current site has real strengths. It has one phone number used everywhere, an office address, honest
photographs of you, three genuine client reviews, a sound legal disclaimer, and two pages no competitor in
Murfreesboro has: DCS cases and adoption. Spanish service is offered, and no rival site does Spanish well.

Around those strengths, the site works against you. It is slow on phones. It states your experience 11
different ways. It misspells "Murfreesboro" in the titles Google shows. Several buttons go nowhere or point
to an unfinished test copy of the website. It uses words the Tennessee advertising rules warn against. It has
no Spanish pages, no privacy policy and no accessibility statement. In five Google searches for local criminal
and family lawyers, it did not appear once.

The rebuild keeps every web address you have today, so nothing you have earned in Google is lost. It keeps
your real photos, your logo blue, your reviews word for word, and your phone number front and center. It fixes
everything listed below.

## Before scores

Each area was scored out of 10 by a separate reviewer. A 10 would be a site we would be proud to launch.

| Area | Score /10 | One-line finding |
|---|---|---|
| Content and messaging | 4 | No page has a clear headline. Experience is stated 11 ways. 34–96% of each page is the same copied block, and Theft and Drug Crimes are near-empty. |
| Search and local visibility (SEO) | 4 | Good web addresses and a consistent phone and address. But every page lacks a main headline, 15 titles misspell the city, and the site did not appear in 5 local searches. |
| Speed on phones | 3 | The main content takes about 8 seconds to appear on a typical page (the goal is under 2.5). Each page loads about 430 KB of code from page-builder plugins. |
| Accessibility (people with disabilities) | 4 | 63% of keyboard stops show no visible focus. Light-blue text is too faint on all 24 pages. The form's tab order is scrambled and the review slider moves on its own. |
| Look and brand | 4 | The logo blue and your own photos are worth keeping. The rest is stock photos, computer screenshots used as banners, and five different typefaces. |
| Ease of use and getting the call | 4 | The phone bar on mobile is good. But the menu loads 4 times per page, there are about 10 different button wordings, and the form has 7 fields far down the page. 13 links are dead or go to the test site. |
| Trust and compliance (Tennessee rules) | 3 | The footer disclaimer is sound. But there is no privacy policy or cookie choice while Google Analytics runs, "expert" appears 4 times, and no results disclaimer sits next to the reviews. |
| Market position (vs. 8 local firms) | 4 | Rivals have more pages and more reviews. Our openings: no rival has full Spanish pages or a DCS page, and none connects criminal and family cases. |
| **Overall** | **3.75** | A trustworthy practice behind a site that hides the phone number, slows people down and says things it cannot back up. |

## The 10 most important problems, and what the rebuild does about each

**1. The site makes it hard to call you.**
Outside the FAQ page, the phone number never appears in the body text. The copy says "call or contact us
online" with no number. A sentence on three pages reads "…online or at to get started", with the number
missing. Four "Contact Us Today" buttons go nowhere. Nine links send visitors to an unfinished test copy of the
site on another web address.
*The rebuild:* The phone number, (615) 410-7290, is a tap-to-call link in the header, the opening section of
every page, mid-page and the footer. Every "free consultation" offer sits right beside it. Every link is
checked at build time, and a dead or test-site link fails the build.

**2. It is slow on phones, where most of your callers are.**
On a typical page, the main content takes about 8 seconds to appear on a mid-range phone. Some pages take
nearly 11 seconds. The cause is the page-builder software: about 430 KB of code, five font families and
full-size photos on every page. Many people leave before a page that slow finishes loading.
*The rebuild:* A lean static site. Pages carry almost no code, two fonts stored on the site itself, and
right-sized modern images. The target is the main content on screen in under 2 seconds. The build fails if a
page scores below 95 on Google's speed test.

**3. "Se habla español" with nothing in Spanish behind it.**
Twenty-one pages mention Spanish service in English, but there is no Spanish page, no Spanish form, and nothing
that tells Google a Spanish version exists. In the market review, Spanish searches such as "abogado
Murfreesboro" returned only directories, with no local firm competing.
*The rebuild:* A full Spanish version of every page at `/es/`, with natural Spanish web addresses
(`/es/defensa-penal/`, `/es/derecho-familiar/custodia/`, `/es/contacto/`). An English/Español switch sits on
every page, and the form works in Spanish. The Spanish pages claim nothing the English pages don't.

**4. The facts don't agree with each other.**
Your experience appears as "18 years", "almost 20 years", "20+ years" and "over 20 years", sometimes on the
same page. The firm name appears seven ways, including "Attorneys at Law" (plural) and "Law Offices of".
Office hours in the data Google reads say Friday until 5:00, but the footer says 4:00. Membership lists
differ between the Home and About pages.
*The rebuild:* We use only wording that is true under every version: "Practicing law since 2004", "Will
Fraley, Attorney at Law", Friday until 4:00, and the three memberships both lists share. Each question is
listed for you in `NEEDS-OWNER.md`. Once you answer, the site can say more.

**5. Wording the Tennessee advertising rules flag.**
The site calls the practice "the experts", "premier personal injury lawyers" and "our attorneys". It says the
firm takes cases "others may not feel confident in winning" and gets "the best possible recovery". It uses
"aggressive" six times. Client reviews that mention winning appear with no results disclaimer. Under RPC 7.1,
each of these is a claim you could be asked to back up.
*The rebuild:* Plain, accurate language: "focuses on", "handles", "Will Fraley and his staff". There are no
comparisons with other lawyers. Every page with a review or an outcome carries "Prior results do not
guarantee a similar outcome." An automated check blocks the risky words before anything is published.

**6. Google can't tell what each page is about.**
No page has a main headline. To Google, the first heading on every page is the sidebar's "Contact Us". 15 page
titles misspell "Murfreeesboro", and 9 run too long to display. Two pages have no description. One copied
"Why Will Fraley" block repeats on 21 pages. The Theft and Drug Crimes pages have only about 125–150 words of
their own.
*The rebuild:* Each page gets one clear headline naming the service and Murfreesboro, a correct title of 60
characters or fewer and its own description. The copied block becomes one short proof strip. Theft and Drug
Crimes are rewritten to full pages, using only facts already on your site.

**7. Visitors who use a keyboard, a screen reader or larger text get stuck.**
Most keyboard stops show no outline, so a keyboard user can't see where they are. Light-blue headings fail the
contrast standard on every page. The form fields jump around when tabbing. The review slider moves every 5
seconds with no pause button, and there is no "skip to content" link.
*The rebuild:* The site is built to WCAG 2.2 AA from the start. Every color pair is tested, focus is always
visible, the form follows a natural order with visible labels, and nothing moves on its own. Every page is
tested automatically in English and Spanish, and a public Accessibility Statement explains how to report a
problem.

**8. Missing legal pages and consent.**
There is no privacy policy, cookie notice or accessibility statement. Google Analytics runs on every page
without asking. The form's text-message line points to an "Acceptable Use Policy" that doesn't exist, and
nothing warns visitors not to send confidential details through the form.
*The rebuild:* New Privacy Policy, Cookie Settings and Accessibility Statement pages in English and Spanish,
linked in every footer. Analytics stays off until a visitor agrees. The form says plainly not to send
confidential information and that sending it doesn't create an attorney-client relationship. The text-message
consent is removed until you confirm you want it.

**9. Too much in the way of the visitor.**
The 27-link menu loads four times on every page. Practice pages add an 18-link sidebar. The contact form asks
seven questions, six of them required, including "best time to reach you" and "are you a new client?". On
the DUI page it starts about 9,000 pixels down on a phone, and the mobile call bar covers part of it.
*The rebuild:* One simple menu with six items, the phone number and a language switch. The form shrinks to
four fields (name, phone, email, a short note), sits near the top of the Contact page and is one tap away on
every practice page. The call bar never covers a field.

**10. The look borrows instead of belonging to you.**
Banner images are computer screenshots and stock photos: handcuffs, crime-scene tape, a gavel. The site uses
five typefaces, and the logo exists only as a small, blurry image file. The best images on the site, your own
photographs, are small and tucked away.
*The rebuild:* Your real photographs come first, color-corrected and cropped, never replaced or imitated. All
other images are newly made scenes of Middle Tennessee and law-office settings, with no people and no stock.
The site uses one type pairing, a sharp redrawn logo and a palette built on your logo blue. Three design
directions will be shown as working mockups before we build.

## What we are keeping on purpose

- **All 24 web addresses, exactly as they are**, plus a redirect for every older address (89 in total), so
  links and Google rankings carry over.
- (615) 410-7290, 509 W College St, the office hours, and "Se habla español".
- Your photographs, Katie Fults's photograph on the About page, and the two training certificates.
- The logo blue (#447CB7) and the navy that goes with it.
- The three client reviews, word for word, without star graphics.
- The substance of the footer disclaimer: general information only, not legal advice, no attorney-client
  relationship from viewing the site.
- The DCS and Adoption pages, which serve families no competitor's site addresses.

## What happens next

1. The Revamp Brief (`plan/REVAMP-BRIEF.md`) sets the message, audiences and voice.
2. The Sitemap (`plan/SITEMAP.md`) lists every page, its Spanish twin and every redirect.
3. Three design directions ("Counsel", "Verdict" and "Neighbor") are built as real mockups of the Home,
   Criminal Defense and Contact pages, and the strongest one goes forward.
4. Your open questions are in `NEEDS-OWNER.md`. None of them blocks the work: until you answer, the site uses
   the safest true wording.
