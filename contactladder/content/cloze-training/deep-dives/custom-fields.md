---
title: "Custom Fields"
slug: "custom-fields"
category: "deep-dives"
orderIndex: 8
estimatedDuration: "45-60 minutes"
prerequisites:
  - "Completed Essentials (Modules 1-6)"
  - "Understanding of basic contact management"
description: "Master custom fields to capture the unique data your business needs beyond Cloze's default fields."
published: true
---

# DEEP DIVE 8: CUSTOM FIELDS

## howtoCloze.com / contactladder.com

---

## OVERVIEW

**Goal:** Master custom fields to capture the unique data your business needs beyond Cloze's default fields.

**Who This Is For:** Power users who track specialized information (referral sources, commission splits, home anniversaries, investment criteria, etc.)

**Prerequisites:**
- Completed Essentials (Modules 1-6)
- Understanding of basic contact management

**Time to Complete:** 45-60 minutes

**The Promise:**

> "Every agent's business is unique. Track referral sources. Home anniversaries. Commission structures. Investment criteria. Custom Fields let you track what matters to YOUR business. Then filter, report, and act on it."

**Important Note:** Cloze allows up to **25 custom fields** per account. Plan them wisely!

---

## MODULE CF1: UNDERSTANDING CUSTOM FIELDS

### When Built-In Fields Aren't Enough

**WHY (Video - 3-4 min)**

| Version | Audience | Hook |
|---------|----------|------|
| A | Tracking data elsewhere | "You're keeping commission splits in Excel, home anniversaries in your calendar, referral sources in your head. One place. Custom Fields. All searchable." |
| B | Frustrated by limitations | "Cloze has name, email, phone. But you need Lead Source, Transaction Coordinator, Investment Criteria, and HOA fees. Custom Fields give you exactly the fields you need." |
| C | Power user, wants more | "You've mastered segments, tags, and audiences. Custom Fields are the next level—structured data you can filter, sort, and report on." |

**Story:**

> "I track 'Home Anniversary.' The date they closed. One year later, Cloze reminds me automatically. I send an anniversary card. That one field generates 5-10 referrals per year. Best custom field I ever created!"

**WHAT (Text + Visual)**

### Custom Fields vs. Tags vs. Notes

**Know the difference:**

| Feature | Purpose | Example | Searchable | Reportable |
|---------|---------|---------|------------|------------|
| **Custom Fields** | Structured data with specific format | "Referral Source: Zillow" | Yes, advanced filtering | Yes, can export |
| **Tags** | Simple labels/categories | #investor #luxury #henderson | Yes, simple filtering | Limited |
| **Notes** | Freeform text | "Met at coffee, discussed budget..." | Yes, text search | No |

**When to Use Custom Fields:**

✅ Need structured, consistent data
✅ Want to filter by specific values
✅ Need to report/export
✅ Information is permanent/semi-permanent

**When NOT to Use Custom Fields:**

❌ Temporary notes (use Notes)
❌ Simple categorization (use Tags)
❌ Constantly changing data
❌ Close to 25-field limit and non-critical

### Custom Field Types

**Cloze supports multiple field types:**

| Field Type | What It Stores | Examples |
|------------|---------------|----------|
| **Text** | Short text (single line) | Referral Source, Lead Source, Preferred Lender |
| **Text Area** | Long text (multiple lines) | Investment Criteria, Special Requests, Property Preferences |
| **Number** | Numeric values | Commission Split %, Years in Home, # of Properties Owned |
| **Currency** | Dollar amounts | Home Purchase Price, Budget Max, Estimated Home Value |
| **Date** | Specific dates | Home Anniversary, Lease Expiration, Expected Move Date |
| **Dropdown** | Pre-defined list of options | Lead Source (Zillow, Realtor.com, Referral, etc.) |
| **Checkbox** | Yes/No, True/False | Pre-Approved, Cash Buyer, Investor, Relocating |
| **Email** | Email addresses | Spouse Email, Work Email, Assistant Email |
| **Phone** | Phone numbers | Work Cell, Office Line, Emergency Contact |
| **URL** | Website links | Property Listing URL, MLS Link, Virtual Tour |

**Key Insight:**

> "Dropdown fields prevent chaos. Instead of 50 agents typing 'Referral', 'referral', 'Refferal'. Create one dropdown. Clean filtering. Clean reporting. Done. Why this matters: One misspelled lead source ruins your entire ROI report."

---

## MODULE CF2: CREATING CUSTOM FIELDS

### Building Your Field Library

**HOW (Video - 5-6 min)**

*Screen recording showing:*

### Part 1: Create a Simple Text Field

1. Settings → Customizations → Custom Fields
2. Click "Add Custom Field"
3. Type: "Text"
4. Name: "Referral Source"
5. Description: "Where did this lead come from?"
6. Applies to: People
7. Save

**Result:** Field appears on all contact records

### Part 2: Create a Dropdown Field (Recommended for Consistency)

1. Settings → Custom Fields
2. Add Custom Field
3. Type: "Dropdown"
4. Name: "Lead Source"
5. Add options: Zillow, Realtor.com, Facebook, Google, Referral - Past Client, Referral - Agent, Open House, SOI, Walk-in, Other
6. Set default: "SOI"
7. Save

**Result:** Clean dropdown for lead tracking

### Part 3: Date Field

1. Add Custom Field → Type: Date
2. Name: "Home Anniversary"
3. Description: "Closed/moved date"
4. Save

**Result:** Filter for anniversary outreach

### Part 4: Currency Field

1. Add Custom Field → Type: Currency
2. Name: "Purchase Price"
3. Save

**Result:** Track prices for analysis

### Part 5: Checkbox Field

1. Add Custom Field → Type: Checkbox
2. Name: "Pre-Approved"
3. Default: Unchecked
4. Save

**Result:** Quick buyer readiness indicator

**WHAT IF (Text)**

**Q: "Can I edit after creating?"**
- A: Yes—change name, description, options. Changing field type may lose data.

**Q: "What if I delete?"**
- A: All data permanently deleted. Export first if needed.

**Q: "Can I reorder?"**
- A: Yes, drag and drop in settings.

**Q: "Import/export compatible?"**
- A: Yes. Import: map CSV columns. Export: include fields.

**Q: "Can I create for Companies?"**
- A: Yes. Apply to: People, Companies, Deals, or Projects.

---

## MODULE CF3: REAL ESTATE CUSTOM FIELD LIBRARY

### Pre-Built Fields for Agents

**Recommended Custom Fields for Real Estate:**

### FOR ALL CONTACTS (People)

| Field Name | Type | Options/Notes | Why You Need It |
|------------|------|---------------|-----------------|
| **Lead Source** | Dropdown | Zillow, Realtor.com, Referral, Facebook, Google, Open House, SOI, Other | Track marketing ROI |
| **Referral Source** | Text | Name of person who referred | Thank referral partners |
| **Home Anniversary** | Date | Date they closed/moved in | Anniversary outreach automation |
| **Years in Home** | Number | Calculate or manually enter | Equity conversations, upsizing prompts |
| **Purchase Price** | Currency | Original purchase price | Equity analysis, market updates |
| **Estimated Home Value** | Currency | Current estimated value | Listing conversations |
| **Property Type** | Dropdown | SFR, Condo, Townhome, Multi-Family, Land, Other | Segmentation |
| **Preferred Lender** | Text | Lender they work with | Referral opportunities |
| **Transaction Coordinator** | Text | TC name if using one | Team coordination |

### FOR BUYERS (Stage = Warm/Hot)

| Field Name | Type | Options/Notes | Why You Need It |
|------------|------|---------------|-----------------|
| **Pre-Approved** | Checkbox | Yes/No | Buyer readiness indicator |
| **Pre-Approval Amount** | Currency | Max approved amount | Budget filtering |
| **Lender Name** | Text | Who pre-approved them | Follow up with lender |
| **Budget Min** | Currency | Minimum price range | Property matching |
| **Budget Max** | Currency | Maximum price range | Property matching |
| **Preferred Areas** | Text Area | Henderson, Summerlin, etc. | Listing alerts |
| **Bedrooms Min** | Number | Minimum bedrooms needed | Property matching |
| **Bathrooms Min** | Number | Minimum bathrooms needed | Property matching |
| **Must-Haves** | Text Area | Pool, RV parking, single-story, etc. | Property matching |
| **Move Timeline** | Dropdown | ASAP, 30 days, 60 days, 90 days, 6+ months | Pipeline prioritization |
| **Cash Buyer** | Checkbox | Yes/No | Offer strategy |

### FOR INVESTORS

| Field Name | Type | Options/Notes | Why You Need It |
|------------|------|---------------|-----------------|
| **Investment Type** | Dropdown | Fix & Flip, Buy & Hold, Short-Term Rental, Multi-Family | Opportunity matching |
| **Investment Budget** | Currency | Max they'll spend per property | Deal filtering |
| **Cash or Finance** | Dropdown | Cash, Finance, Both | Strategy planning |
| **Preferred ROI %** | Number | Minimum return expected | Deal qualification |
| **# of Properties Owned** | Number | Current portfolio size | Relationship context |

### FOR SELLERS (Stage = Warm/Hot)

| Field Name | Type | Options/Notes | Why You Need It |
|------------|------|---------------|-----------------|
| **Reason for Selling** | Dropdown | Upsizing, Downsizing, Relocating, Financial, Estate, Other | Messaging strategy |
| **Listing Timeline** | Dropdown | ASAP, 30 days, 60 days, 90 days, 6+ months | Pipeline prioritization |
| **Expected List Price** | Currency | What they think it's worth | CMA conversation starter |
| **Mortgage Balance** | Currency | What they owe | Equity calculation |
| **Home Improvements** | Text Area | Recent upgrades | Listing prep, pricing |

### FOR PAST CLIENTS

| Field Name | Type | Options/Notes | Why You Need It |
|------------|------|---------------|-----------------|
| **Closing Date** | Date | When transaction closed | Anniversary tracking |
| **Home Anniversary** | Date | When they moved in (might be same as closing) | Personal touch outreach |
| **Gross Commission** | Currency | What you earned | Lifetime value tracking |
| **Would Refer** | Dropdown | Definitely, Probably, Unsure, No | Segment into Fan/Advocate |
| **Referrals Sent** | Number | How many people they've referred | VIP recognition |

**IMPORTANT:** You have **25 custom field limit**. Prioritize based on YOUR business model!

---

## MODULE CF4: USING CUSTOM FIELDS

### Filling In & Filtering On Custom Data

**HOW (Video - 4-5 min)**

*Screen recording showing:*

### Part 1: Add Data to Contact

1. Open contact (Sarah Martinez)
2. Scroll to Custom Fields
3. Fill: Lead Source (Zillow), Pre-Approved (✓), Amount ($550K), Budget ($525K), Areas (Summerlin, Henderson), Timeline (60 days)
4. Save

**Result:** Record contains searchable custom data

### Part 2: Bulk Edit Custom Fields

**Scenario:** Mark 100 Zillow imports

1. Go to People → Filter recently imported
2. Select all
3. Bulk Edit → Set Custom Field
4. Field: Lead Source → Value: Zillow
5. Apply

**Result:** All marked "Lead Source: Zillow"

### Part 3: Filter by Custom Fields

**Scenario:** Find pre-approved buyers >$500K in Summerlin

1. People → Create Audience
2. Filters: Pre-Approved = Yes, Budget Max > $500K, Areas = "Summerlin"
3. Name: "Summerlin Buyers $500K+"
4. Save

**Result:** Dynamic qualified buyer list

### Part 4: Export Custom Field Data

**Scenario:** Report closings with commission

1. Create Audience: Closing Date 2025
2. Export → Select fields: Name, Email, Date, Price, Commission
3. Download CSV → Send to broker

**WHAT IF (Text)**

**Q: "Can I make fields required?"**
- A: Not directly. Create Audience for "missing required data" and work through them.

**Q: "Use fields in MAIA?"**
- A: Yes. Example: "Show contacts where Lead Source = Zillow and Move Timeline = ASAP"

**Q: "Use in Mail Merge?"**
- A: Yes. Example: "Hi {{FirstName}}, I saw you're looking in {{Preferred Areas}}..."

**Q: "Team visibility?"**
- A: Yes, if contacts shared. Fields are account-wide.

---

## MODULE CF5: CUSTOM FIELDS + AUTOMATION

### Trigger Actions Based on Custom Data

**WHY (Video - 3-4 min)**

**Hook:** "Custom fields + Audiences + Campaigns = automation triggers."

**WHAT (Text + Visual)**

### Automation Use Cases

**1. Home Anniversary:** Field: Home Anniversary → Audience: This Month → Campaign: Auto-send card → Result: Annual touchpoint

**2. Buyer Re-Engagement:** Field: Move Timeline → Audience: 90-Day Stale → Reminder: Weekly check → Result: No lost buyers

**3. Investor Alerts:** Field: Investment Type → Audience: Fix & Flip >$200K → Workflow: Mail Merge → Result: Targeted outreach

**4. ROI Tracking:** Field: Lead Source → Report: Group closed deals by source → Result: Data-driven budget decisions

**HOW (Video - 5-6 min)**

*Screen recording showing:*

### Example: Automate Home Anniversary Outreach

**Step 1: Ensure Custom Field Exists**
- Home Anniversary (Date field) - ✓

**Step 2: Create Audience**
1. **Audiences → Create Audience**
2. **Name:** "Home Anniversary This Month"
3. **Filters:**
   - Home Anniversary Month = [Current Month]
   - Segment = Past Client (or any closed client)
4. **Save**

**Step 3: Create Campaign (or Manual)**

**Option A - Automated:**
1. Campaigns → Create
2. Trigger: "Home Anniversary This Month" audience
3. Send template: "Happy Home Anniversary"
4. Activate

**Option B - Manual:**
1. Check audience weekly
2. Send personalized cards/emails

**Step 4: Track Results**
- Monitor replies, referrals, ROI

---

## MODULE CF6: ADVANCED STRATEGIES

### Power User Tactics

### Strategy 1: Lead Source Attribution

1. Create Lead Source field (Dropdown)
2. Options: Zillow, Realtor.com, Google, Facebook, Referral, Open House, SOI, Walk-In
3. Assign lead source for every contact
4. Export closed deals annually, group by source
5. Calculate ROI: Ad spend ÷ gross commission

**Result:** Know which marketing works

### Strategy 2: Sphere of Influence Tiers

1. Create SOI Tier field (Dropdown)
2. Options: Inner Circle (50), Tier 2 (100), Tier 3 (200), Outer (500+)
3. Assign by relationship strength
4. Filter: Inner Circle = monthly calls, Outer = quarterly newsletters

**Result:** Prioritized SOI

### Strategy 3: Investment Criteria Matching

1. Create fields: Investment Type, Max Price, Min ROI %, Preferred Areas
2. When property available: Create matching audience, Mail Merge
3. Track: Which investors close vs. browse

**Result:** Faster investor closings

### Strategy 4: Commission Tracking & Lifetime Value

1. Create Gross Commission field (Currency)
2. Fill for every closed deal
3. Export: Total per client, identify top 20%
4. Top revenue clients get VIP service

**Result:** Focus on highest-value relationships

---

## MODULE CF7: BEST PRACTICES & PITFALLS

### Do's and Don'ts

**DO:**

✅ **Plan before creating:** List fields needed, create top 20
✅ **Use dropdowns for consistency:** Avoid variation chaos
✅ **Document field meanings:** Add descriptions for team
✅ **Start small:** Create 5 essential, expand later
✅ **Use in Audiences:** Make actionable, not just storage
✅ **Export regularly:** Back up monthly

**DON'T:**

❌ **Don't create 25 fields day 1:** You'll regret half
❌ **Don't use text when dropdowns work:** Ruins filtering
❌ **Don't create for temporary data:** Use tags/notes
❌ **Don't forget to fill:** Empty fields useless
❌ **Don't change field types:** Can lose data
❌ **Don't duplicate:** "Lead Source" and "Where They Came From" redundant

**Common Pitfalls:**

| Pitfall | Why | Fix |
|---------|-----|-----|
| **Empty Fields** | Never filled | Create workflow |
| **Inconsistent Data** | Text instead of dropdowns | Use dropdowns for <20 values |
| **Too Many Fields** | Created "just in case" | Only create weekly-use fields |
| **Unclear Naming** | Team confusion | Use descriptive: "Home Anniversary" not "HA" |
| **No Audience Usage** | Store but never filter | Ask: "How will I use this?" |

---

## COMPLETION

**Congratulations! You just mastered Custom Fields!**

**What you now know:**

✅ When to use custom fields vs. tags vs. notes
✅ How to create different field types (text, dropdown, date, currency, checkbox)
✅ 25+ real estate custom field ideas
✅ How to fill in, filter, and export custom field data
✅ How to use custom fields in Audiences and Campaigns
✅ Advanced strategies for lead attribution, ROI tracking, and automation
✅ Best practices and common pitfalls

**The time and revenue you just unlocked:**

| What Custom Fields Give You | Impact |
|------------------------------|--------|
| **Home Anniversary tracking** | 5-10 referrals per year = $50K-$100K in GCI |
| **Lead Source attribution** | Know which marketing works = Stop wasting $5K-$10K/year on bad ads |
| **Pre-Approved filtering** | Find ready buyers in 5 seconds = Close deals 2x faster |
| **Investment criteria matching** | Send targeted property alerts = 3x investor conversion |
| **Commission tracking** | Identify top 20% clients = Focus on highest-value relationships |

**That's 5-10 extra deals per year. Plus marketing budget saved. Time to go use it!**

**Your next steps:**

1. Plan 10 most important fields
2. Create 5 essential today: Lead Source, Home Anniversary, plus 3 more
3. Fill data for 20 contacts
4. Create 1 Audience: "Buyers - Pre-Approved"
5. Set monthly reminder to fill fields for new contacts

**Master Custom Fields:**
- Track marketing ROI precisely
- Automate personalized outreach
- Filter database surgically
- Build data-driven strategies
- Increase referrals by 50%

**Want to go deeper?**

Check out related Deep Dives:
- **Deep Dive 7: Customizing Segments & Audiences** - Use custom fields in advanced filtering
- **Deep Dive 3: Templates & Campaigns** - Automate based on custom field triggers
- **Deep Dive 9: Analytics & Reporting** - Report on custom field data

---

## HELP CENTER RESOURCES

**Official Cloze Documentation:**

- [Custom Fields Category](https://help.cloze.com) - 25 articles
- [Customizations Category](https://help.cloze.com) - 37 articles covering Segments, Next Steps, and Custom Fields

---

*Document Version: 1.0*
*Last Updated: January 2025*
*Created for: howtoCloze.com / contactladder.com*
