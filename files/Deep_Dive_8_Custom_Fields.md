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

> "Every agent's business is unique. You might track referral sources, home anniversaries, commission structures, or investment property criteria. Custom Fields let you track EXACTLY what matters to YOUR business, then filter, report, and act on that data."

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

**Story to include:**

> "I track 'Home Anniversary' for every past client—the date they closed and moved in. One year later, Cloze reminds me automatically. I send a personalized 'Happy 1-Year Home Anniversary!' card. Clients are floored. That custom field generates 5-10 referrals a year."

**WHAT (Text + Visual)**

### Custom Fields vs. Tags vs. Notes

**Know the difference:**

| Feature | Purpose | Example | Searchable | Reportable |
|---------|---------|---------|------------|------------|
| **Custom Fields** | Structured data with specific format | "Referral Source: Zillow" | Yes, advanced filtering | Yes, can export |
| **Tags** | Simple labels/categories | #investor #luxury #henderson | Yes, simple filtering | Limited |
| **Notes** | Freeform text | "Met at coffee, discussed budget..." | Yes, text search | No |

**When to Use Custom Fields:**

✅ When you need structured, consistent data
✅ When you want to filter by specific values
✅ When you need to report/export the data
✅ When the information is permanent or semi-permanent

**When NOT to Use Custom Fields:**

❌ For temporary notes (use Notes instead)
❌ For simple categorization (use Tags instead)
❌ For data that changes constantly
❌ When you're close to the 25-field limit and the data isn't critical

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

> "Dropdown fields are your friend. Instead of 50 agents typing 'Referral', 'referral', 'Refferal', and 'REF'—create a dropdown with consistent options. Makes filtering and reporting clean."

---

## MODULE CF2: CREATING CUSTOM FIELDS

### Building Your Field Library

**HOW (Video - 5-6 min)**

*Screen recording showing:*

### Part 1: Create a Simple Text Field

1. **Go to Settings → Customizations → Custom Fields**
2. **Click "Add Custom Field"**
3. **Choose field type: "Text"**
4. **Name the field: "Referral Source"**
5. **Description (optional):** "Where did this lead come from?"
6. **Applies to:** Choose "People" (or Companies, Deals, Projects)
7. **Click "Save"**

**Result:** "Referral Source" now appears as an editable field on all contact records

### Part 2: Create a Dropdown Field (Recommended for Consistency)

1. **Go to Settings → Customizations → Custom Fields**
2. **Click "Add Custom Field"**
3. **Choose field type: "Dropdown"**
4. **Name the field: "Lead Source"**
5. **Add options:**
   - Zillow
   - Realtor.com
   - Facebook Ad
   - Google Ad
   - Referral - Past Client
   - Referral - Agent
   - Open House
   - Sphere of Influence
   - Walk-in/Call-in
   - Other
6. **Set default (optional):** "Sphere of Influence"
7. **Click "Save"**

**Result:** Clean, consistent dropdown for lead source tracking

### Part 3: Create a Date Field

1. **Add Custom Field**
2. **Type: "Date"**
3. **Name: "Home Anniversary"**
4. **Description:** "Date client closed and moved into their home"
5. **Applies to: People**
6. **Save**

**Result:** Can filter for "Home Anniversary = 1 year ago" for anniversary outreach

### Part 4: Create a Currency Field

1. **Add Custom Field**
2. **Type: "Currency"**
3. **Name: "Purchase Price"**
4. **Description:** "Price client paid for their home"
5. **Save**

**Result:** Track home purchase prices for market analysis and equity conversations

### Part 5: Create a Checkbox Field

1. **Add Custom Field**
2. **Type: "Checkbox"**
3. **Name: "Pre-Approved"**
4. **Description:** "Is buyer pre-approved for financing?"
5. **Default value:** Unchecked
6. **Save**

**Result:** Quick yes/no indicator for buyer readiness

**WHAT IF (Text)**

**Q: "Can I edit a custom field after creating it?"**
- A: Yes! You can change the name, description, and options (for dropdowns). But changing the field type may cause data loss.

**Q: "What happens if I delete a custom field?"**
- A: All data in that field is permanently deleted from all contacts. You'll get a warning before confirming. Export your data first if you need to save it.

**Q: "Can I reorder custom fields?"**
- A: Yes, drag and drop in the Custom Fields settings to change the order they appear on contact records.

**Q: "Do custom fields work with import/export?"**
- A: Yes! When importing, map your CSV columns to custom fields. When exporting, include custom fields in the export.

**Q: "Can I create custom fields for Companies, not just People?"**
- A: Yes! When creating a field, choose what it "Applies to": People, Companies, Deals, or Projects.

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

### Part 1: Add Custom Field Data to a Contact

1. **Open a contact** (e.g., Sarah Martinez)
2. **Scroll to Custom Fields section** (usually below standard fields)
3. **Fill in relevant fields:**
   - Lead Source: Zillow
   - Pre-Approved: ✓ (checked)
   - Pre-Approval Amount: $550,000
   - Budget Max: $525,000
   - Preferred Areas: Summerlin, Henderson
   - Move Timeline: 60 days
4. **Click "Save" or auto-saves**

**Result:** Sarah's record now contains searchable, filterable custom data

### Part 2: Bulk Edit Custom Fields

**Scenario:** You imported 100 contacts from a Zillow campaign and want to mark them all as "Lead Source: Zillow"

1. **Go to People**
2. **Filter to recently imported contacts** (or tag them #zillowimport first)
3. **Select all** (checkbox at top)
4. **Click bulk edit icon** (three dots → Bulk Edit)
5. **Choose "Set Custom Field"**
6. **Field: Lead Source**
7. **Value: Zillow**
8. **Apply**

**Result:** All 100 contacts now have "Lead Source: Zillow"

### Part 3: Filter by Custom Fields

**Scenario:** Find all pre-approved buyers with budget >$500K in Summerlin

1. **Go to People**
2. **Click Audiences → Create Audience**
3. **Add filters:**
   - Pre-Approved = Yes
   - Budget Max > $500,000
   - Preferred Areas contains "Summerlin"
4. **Name audience:** "Summerlin Buyers $500K+"
5. **Save**

**Result:** Dynamic list of qualified buyers for Summerlin listings $500K+

### Part 4: Export Custom Field Data

**Scenario:** Broker wants a report of all your closings this year with commission data

1. **Create Audience:**
   - Closing Date between 1/1/2025 - 12/31/2025
2. **Export audience**
3. **Select fields to export:**
   - Name
   - Email
   - Closing Date
   - Purchase Price
   - Gross Commission
4. **Download CSV**
5. **Open in Excel** → Send to broker

**WHAT IF (Text)**

**Q: "Can I make certain custom fields required?"**
- A: Not directly, but you can create an Audience for "contacts missing required data" and work through them systematically.

**Q: "Can I use custom fields in MAIA prompts?"**
- A: Yes! Example: "Show me all contacts where Lead Source = Zillow and Move Timeline = ASAP"

**Q: "Can I use custom fields in Mail Merge?"**
- A: Yes! You can personalize emails with custom field data. Example: "Hi {{FirstName}}, I saw you're looking in {{Preferred Areas}}..."

**Q: "Can team members see my custom fields?"**
- A: Yes, if contacts are shared with the team. Custom fields are account-wide, not user-specific.

---

## MODULE CF5: CUSTOM FIELDS + AUTOMATION

### Trigger Actions Based on Custom Data

**WHY (Video - 3-4 min)**

**Hook:** "Custom fields aren't just for storing data. Combined with Audiences and Campaigns, they become automation triggers."

**WHAT (Text + Visual)**

### Automation Use Cases

**1. Home Anniversary Outreach**

**Setup:**
- Custom Field: Home Anniversary (Date)
- Audience: "Home Anniversary This Month"
  - Filter: Home Anniversary = [Current Month]
- Campaign: Auto-send anniversary card/email

**Result:** Automated touchpoint every year

**2. Buyer Re-Engagement**

**Setup:**
- Custom Field: Move Timeline (Dropdown)
- Audience: "90-Day Buyers Going Stale"
  - Filter: Move Timeline = 90 days AND Last Contact >30 days ago
- Reminder: Weekly check this audience and reach out

**Result:** Never lose a buyer to neglect

**3. Investor Deal Alerts**

**Setup:**
- Custom Field: Investment Type (Dropdown)
- Audience: "Fix & Flip Investors"
  - Filter: Investment Type = Fix & Flip AND Investment Budget >$200K
- Workflow: When you get a distressed property listing, Mail Merge this audience

**Result:** Targeted outreach to right investors

**4. Referral Source ROI Tracking**

**Setup:**
- Custom Field: Lead Source (Dropdown)
- Report: Export all closed deals, group by Lead Source
- Analysis: Which lead sources convert best?

**Result:** Data-driven marketing budget decisions

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

**Step 3: Create Campaign (or Manual Outreach)**

**Option A - Automated Campaign:**
1. **Campaigns → Create Campaign**
2. **Trigger:** Contact enters "Home Anniversary This Month" audience
3. **Action:** Send email template "Happy Home Anniversary"
4. **Email:**
   ```
   Subject: Happy {{Years in Home}}-Year Home Anniversary, {{FirstName}}!

   Hi {{FirstName}},

   Can you believe it's been {{Years in Home}} years since you moved into your home on {{Address}}?! Time flies when you're making memories.

   I hope you and {{Spouse}} are enjoying the house. If there's anything you need—contractor recommendations, home value updates, or just coffee to catch up—I'm always here.

   Cheers to many more years in your home!

   [Your Name]
   ```
5. **Activate**

**Option B - Manual Outreach:**
1. **Check "Home Anniversary This Month" audience weekly**
2. **Send personalized cards or emails manually**

**Step 4: Track Results**
- Monitor replies
- Note any referrals that come from anniversary outreach
- Calculate ROI of this touchpoint

---

## MODULE CF6: ADVANCED STRATEGIES

### Power User Tactics

### Strategy 1: Lead Source Attribution

**Track every dollar back to its source:**

1. **Create:** Lead Source custom field (Dropdown)
2. **Options:** Zillow, Realtor.com, Google Ads, Facebook Ads, Referral - Past Client, Referral - Agent, Open House, SOI, Yard Sign, Walk-In
3. **For every new contact:** Assign lead source immediately
4. **For closed deals:** Export annually, group by lead source
5. **Calculate ROI:** Ad spend per source ÷ gross commission from that source

**Result:** Know exactly which marketing channels work

### Strategy 2: Sphere of Influence Tiers

**Go beyond "SOI" segment:**

1. **Create:** SOI Tier custom field (Dropdown)
2. **Options:** Inner Circle (50), Tier 2 (100), Tier 3 (200), Outer (500+)
3. **Assign based on relationship strength**
4. **Filter:** "Inner Circle" gets monthly personal calls, "Outer" gets quarterly newsletters

**Result:** Prioritized SOI management

### Strategy 3: Investment Criteria Matching

**For investor-focused agents:**

1. **Create custom fields:**
   - Investment Type (Dropdown)
   - Max Price (Currency)
   - Min ROI % (Number)
   - Preferred Areas (Text Area)
2. **When new investment property comes available:**
   - Create audience matching criteria
   - Mail Merge targeted investors
3. **Track:** Which investors close vs. which just browse

**Result:** Faster investor closings

### Strategy 4: Commission Tracking & Lifetime Value

**Understand your most valuable clients:**

1. **Create:** Gross Commission (Currency field)
2. **Fill in for every closed deal**
3. **Create calculated field or export:**
   - Total commissions per client
   - Identify top 20% by revenue
4. **VIP treatment:** Top revenue clients get Advocate-level service

**Result:** Focus time on highest-value relationships

---

## MODULE CF7: BEST PRACTICES & PITFALLS

### Do's and Don'ts

**DO:**

✅ **Plan before creating:** List all fields you need, then create the 20 most important
✅ **Use dropdowns for consistency:** Avoid "Referral", "referral", "Refferal" chaos
✅ **Document field meanings:** Add descriptions so team members know what each field means
✅ **Start small:** Create 5 essential fields, expand as needed
✅ **Use fields in Audiences:** Make them actionable, not just data storage
✅ **Export regularly:** Back up custom field data monthly

**DON'T:**

❌ **Don't create 25 fields on day 1:** You'll regret half of them
❌ **Don't use text fields when dropdowns work:** Inconsistent data ruins filtering
❌ **Don't create fields for temporary data:** Use tags or notes instead
❌ **Don't forget to fill them in:** Empty fields = useless fields
❌ **Don't change field types after data exists:** Can cause data loss
❌ **Don't create duplicate fields:** "Lead Source" and "Where They Came From" is redundant

**Common Pitfalls:**

| Pitfall | Why It Happens | How to Avoid |
|---------|----------------|--------------|
| **Empty Fields** | Created fields but never filled them in | Create workflow: "Add custom fields when adding new contacts" |
| **Inconsistent Data** | Used text fields instead of dropdowns | Use dropdowns for any field with <20 possible values |
| **Too Many Fields** | Created "just in case" fields | Only create fields you'll use weekly |
| **Unclear Naming** | Field names unclear to team | Use descriptive names: "Home Anniversary" not "HA" |
| **No Audience Usage** | Stored data but never filter/act on it | For every field, ask: "How will I use this to find people?" |

---

## COMPLETION

**Congratulations! You've completed Deep Dive 8: Custom Fields.**

**What you now know:**

✅ When to use custom fields vs. tags vs. notes
✅ How to create different field types (text, dropdown, date, currency, checkbox)
✅ 25+ real estate custom field ideas
✅ How to fill in, filter, and export custom field data
✅ How to use custom fields in Audiences and Campaigns
✅ Advanced strategies for lead attribution, ROI tracking, and automation
✅ Best practices and common pitfalls

**Your next steps:**

1. **Plan your custom fields:** List the 10 most important for YOUR business
2. **Create 5 essential fields today:** Lead Source, Home Anniversary, and 3 others
3. **Fill in data for 20 contacts:** Practice the workflow
4. **Create 1 Audience using custom fields:** Example: "Buyers - Pre-Approved"
5. **Set monthly reminder:** Fill in custom fields for new contacts

**Master Custom Fields and you'll:**
- Track marketing ROI with precision
- Automate personalized outreach (anniversary cards, buyer re-engagement)
- Filter your database with surgical precision
- Build data-driven business strategies
- Increase referrals with relationship-based automation

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
