# ESSENTIALS MODULE 0E: IMPORT & EXPORT CONTACTS

## howtoCloze.com / contactladder.com

---

## MODULE OVERVIEW

**Goal:** Get your existing contacts into Cloze quickly and accurately, and know how to export data when you need it.

**Who This Is For:** New users setting up Cloze for the first time, or agents migrating from another CRM.

**Time to Complete:** 10-15 minutes

**Prerequisites:**
- Cloze account created
- Email/Phone/Calendar connected (Module 0A-0C)
- Ninja Selling view enabled (Module 0D)

---

## MODULE 0E: IMPORT YOUR CONTACTS

### Getting Your Database Into Cloze

**WHY (Video - 2-3 min)**

| Version | Audience | Hook |
|---------|----------|------|
| A | Coming from another CRM | "You've spent years building your database. The last thing you want is to manually re-enter 2,000 contacts. Import them in 10 minutes and get back to selling." |
| B | Has contacts in spreadsheet | "Your contacts are in Excel, Google Sheets, or your phone. Cloze can import them all at once—no typing, no copying, no double-entry." |
| C | Starting fresh | "Even if you're new, you have contacts somewhere—your phone, email signature, holiday card list. Import them now so Cloze can start tracking your relationships immediately." |

**Story to include:**

> "Switched from Top Producer. 3,000 contacts. Exported CSV, imported to Cloze, running in 20 minutes. No contacts lost. Zero manual entry!"

**WHAT (Text + Visual)**

### What You Can Import

**Supported Import Sources:**

| Source | What It Imports | Notes |
|--------|----------------|-------|
| **CSV File** | People, companies, custom fields | Most common - works from Excel, Google Sheets, other CRMs |
| **Excel (.xlsx)** | People, companies, custom fields | Direct Excel import |
| **Google Contacts** | People | Direct integration |
| **Other CRMs** | Export to CSV first, then import | Works with Top Producer, Follow Up Boss, LionDesk, etc. |
| **Phone Contacts** | People | Via phone sync (Module 0B) |
| **Email Contacts** | People | Via email sync (Module 0A) |

**What Gets Imported:**

- Names (first, last, company)
- Email addresses (multiple per contact)
- Phone numbers (mobile, home, work)
- Addresses (mailing, home, work)
- Notes and custom fields
- Tags (if formatted correctly)
- Segments (if mapped)
- Important dates (birthdays, anniversaries)

**What Does NOT Import:**

- Email history (Cloze pulls this from your connected email after import)
- Transaction history (use Properties feature to add these)
- Calendar events (sync your calendar separately)
- Files and attachments (add these manually after import)

**Key Insight:** Import equals contacts. Email/phone sync equals history. Combined equals complete picture. Why this matters: You've spent years building relationships. Get your database into Cloze in 10 minutes, not 10 days.

**HOW (Video - 5-6 min)**

*Screen recording showing:*

### Part 1: Preparing Your Import File

**If starting from Excel/Google Sheets:**

1. Open your spreadsheet
2. Ensure you have these columns (minimum):
   - First Name
   - Last Name
   - Email Address
   - Phone Number
3. Recommended additional columns:
   - Company
   - Mailing Address
   - City, State, ZIP
   - Notes
   - Tags
   - Segment
4. Save as CSV (File → Save As → CSV)

**If exporting from another CRM:**

1. In your old CRM, find "Export" or "Download"
2. Select "All Contacts" or your desired list
3. Choose CSV format
4. Download the file

**Cleanup Before Import:** Remove blank rows, fix typos, standardize phones, check duplicates, remove test data. The result: Clean import on first try. No errors. No duplicate cleanup later. Done!

### Part 2: Importing Into Cloze

1. **Open Cloze** → Go to Settings (gear icon)
2. **Click "Import & Export"**
3. **Click "Import People"**
4. **Select your CSV file** → Click "Upload"
5. **Map your fields:**
   - Cloze shows your CSV columns on the left
   - Match them to Cloze fields on the right
   - Example: Your "First" column → Cloze "First Name"
   - Example: Your "Email" column → Cloze "Email Address"
6. **Review the preview:**
   - Cloze shows first 5 rows
   - Verify data looks correct
   - If something's wrong, go back and re-map
7. **Handle duplicates:**
   - Choose: "Merge with existing" (recommended) or "Create new"
   - Merge = if email matches, update existing contact
   - Create new = imports as separate contact even if email exists
8. **Click "Import"**
9. **Wait for processing:**
   - Small imports (<500): 1-2 minutes
   - Large imports (2000+): 5-10 minutes
10. **Review import summary:**
    - Shows: X contacts imported, Y updated, Z skipped
    - If errors exist, download error report

### Part 3: Post-Import Cleanup

1. **Go to People** → Filter by "Recently Added"
2. **Spot-check 10-20 contacts:**
   - Did names import correctly?
   - Are phone numbers formatted properly?
   - Did tags/segments apply?
3. **Check for duplicates:**
   - Cloze auto-suggests merges
   - Review merge suggestions (People → Duplicates)
4. **Assign segments to imported contacts:**
   - Most imports will have NO segment assigned
   - Use your "Contacts to Classify" audience
   - Do 10 per day to organize them

**Common Import Issues & Fixes:**

| Issue | Why It Happens | How to Fix |
|-------|---------------|------------|
| Names in one column ("John Smith") | CSV has full name, not first/last separate | In Cloze, map to "Full Name" field, Cloze splits it |
| Phone numbers missing area code | Old data incomplete | Add manually or re-import with corrected CSV |
| Emails show as invalid | Typos in original data | Fix in Cloze after import or re-import |
| All contacts marked "Company" | Mapped to wrong field | Re-import with corrected field mapping |
| Nothing imported | File format issue | Re-save as CSV (UTF-8) and try again |

**WHAT IF (Text)**

**Q: "What if I have 10,000 contacts? Will that slow down Cloze?"**
- A: Cloze can handle large databases. Import in batches if you prefer (2,000 at a time). Processing might take 15-20 minutes for 10K contacts.

**Q: "What if some contacts have multiple email addresses?"**
- A: Cloze supports multiple emails per contact. In your CSV,  have Email1, Email2, Email3 columns. Map each to "Email Address" and Cloze will add all three.

**Q: "What if I imported wrong and need to start over?"**
- A: You can delete the imported contacts (filter by "Recently Added" → select all → archive/delete) and re-import. Or just re-import with "merge" setting to update them.

**Q: "Can I import custom fields like 'Referral Source' or 'Home Anniversary'?"**
- A: Yes! First, create the custom fields in Cloze (Settings → Custom Fields), THEN import with those columns mapped. See Deep Dive 8: Custom Fields for details.

**Q: "What if my import shows errors?"**
- A: Download the error report. Common errors: invalid email format, missing required fields, or encoding issues. Fix in your CSV and re-import.

**Q: "Should I import everyone or just my best contacts?"**
- A: Import everyone. You can segment and organize after. It's easier to archive contacts you don't need than to manually add them later when you remember someone.

**Q: "What if I want to import transactions or properties?"**
- A: Contact import is for PEOPLE. Properties are imported separately (see Deep Dive 1: Properties). Transactions can be manually added or imported via MLS integration.

---

## EXPORT YOUR CONTACTS

### Getting Data Out of Cloze

**WHY (Video - 1-2 min)**

| Version | Audience | Hook |
|---------|----------|------|
| A | Needs backup | "Your database is your business. Export it monthly for backup. You're never at the mercy of one platform. Sleep better at night!" |
| B | Needs mailing list | "Want to send holiday cards, postcards, or use a mail merge tool outside Cloze? Export your contacts with addresses. 500 labels printed in 10 minutes." |
| C | Compliance / broker request | "Your broker wants a list of your clients. You need to comply with data requests. Export gives you exactly what you need in seconds. Boom." |

**WHAT (Text + Visual)**

### What You Can Export

**Export Options:**

| Export Type | What It Includes | Use Case |
|-------------|-----------------|----------|
| **All Contacts** | Everyone in your database | Full backup, migration to new CRM |
| **Filtered Contacts** | Only contacts matching a filter (Segment, Tag, Audience) | Targeted lists (all buyers, all Henderson contacts, etc.) |
| **Address Labels** | Names and mailing addresses formatted for labels | Holiday cards, postcards, direct mail |
| **Custom Export** | Select specific fields to include | Broker reports, compliance, specific data analysis |

**Export File Formats:**

- **CSV**: Opens in Excel, Google Sheets, imports to other CRMs
- **Excel (.xlsx)**: Native Excel format
- **Label format**: Avery label templates for printing

**What Gets Exported:**

- All contact info (names, emails, phones, addresses)
- Segments and Stages
- Tags
- Custom fields
- Notes (if selected)
- Last contact date
- Relationship strength scores

**What Does NOT Export:**

- Email history (conversations stay in your email)
- Attachments and files
- Timeline activity details
- Calendar events

**HOW (Video - 3-4 min)**

*Screen recording showing:*

### Part 1: Export All Contacts

1. **Go to People**
2. **Click the "..." menu** (three dots, top right)
3. **Select "Export"**
4. **Choose format:** CSV or Excel
5. **Select fields to include:**
   - Basic Info (name, email, phone)
   - Addresses
   - Segments and Tags
   - Custom Fields
   - Notes
6. **Click "Export"**
7. **Download the file** (opens in browser or saves to Downloads folder)

### Part 2: Export Filtered Contacts (Specific List)

1. **Go to People**
2. **Apply filters or select an Audience:**
   - Example: Segment = Advocate
   - Example: Tag = #investor
   - Example: Audience = "Hot Buyers"
3. **Click "Select All"** (selects all in current view)
4. **Click the "..." menu**
5. **Select "Export"**
6. **Choose format and fields**
7. **Click "Export"**

Result: Only contacts matching your filter are exported

### Part 3: Export for Mailing Labels

1. **Go to People**
2. **Filter for contacts with mailing addresses:**
   - Filter: Has Address = Yes
3. **Select desired contacts** (or Select All)
4. **Click "..." menu → "Export Labels"**
5. **Choose label template:**
   - Avery 5160 (most common)
   - Avery 8160
   - Other standard formats
6. **Download PDF**
7. **Print on label sheets**

### Part 4: Monthly Backup Workflow

**Recommended: Export your full database monthly for backup**

1. First Monday of each month
2. Export All Contacts → CSV format
3. Save to cloud storage (Dropbox, Google Drive, OneDrive)
4. Name file: "Cloze_Backup_2025-01-01.csv"
5. Keep last 6 months of backups, delete older

**WHAT IF (Text)**

**Q: "How often should I export for backup?"**
- A: Monthly is recommended. If you're actively adding lots of contacts, weekly. If you're mostly static, quarterly is fine.

**Q: "Can I export my entire Cloze database including emails and history?"**
- A: Contact data exports, but email history lives in your email account (Gmail, Outlook). As long as your email is connected, that history stays. Back up your email separately via your email provider.

**Q: "What if I export and the file won't open?"**
- A: Try Excel format instead of CSV, or open CSV in Google Sheets. Encoding issues can occur with special characters - re-export with UTF-8 encoding.

**Q: "Can I export just phone numbers for a calling list?"**
- A: Yes! When exporting, deselect all fields except Name and Mobile Phone. You'll get a clean calling list.

**Q: "Can I export to import into another tool like Mailchimp?"**
- A: Yes. Export with Name and Email fields, then import that CSV into Mailchimp or other platforms.

**Q: "What if I need to export for a specific date range (e.g., 'all contacts added in 2024')?"**
- A: Create an Audience with filter "Date Added" in 2024, then export that audience.

---

## COMPLETION

**You just mastered Import & Export!**

**Here's what you unlocked:**

✅ Prepare CSV files for clean import
✅ Import contacts from Excel, CSV, or other CRMs
✅ Map fields correctly during import
✅ Handle duplicates like a pro
✅ Export contacts for backup or mailing lists
✅ Create address labels in minutes

**That's 10+ hours saved on manual data entry.** 3,000 contacts imported in 20 minutes instead of 3 weeks of typing. Monthly backups that take 2 minutes, not 2 hours. Holiday card labels printed in 10 minutes instead of addressing 500 envelopes by hand.

**Your next steps:**

1. If you haven't imported yet: Prepare your CSV and import your contacts now
2. After import: Use "Contacts to Classify" audience to assign segments (10 per day)
3. Set a reminder: Monthly export for backup
4. Proceed to Module 1: Why CRM? (if completing Essentials in order)

**Pro Tips:** Clean as you go, merge duplicates liberally, allow 24hrs for sync, import once then rely on auto-sync

Time to get your database working for you!

---

## HELP CENTER RESOURCES

**Official Cloze Documentation:**

- [Importing and Exporting Category](https://help.cloze.com/category/1560-importing-and-exporting) - 30 articles
- [Importing Category](https://help.cloze.com/category/1561-importing) - 21 articles
- [Exporting Category](https://help.cloze.com/category/1575-exporting) - 6 articles

---

*Module Version: 1.0*
*Last Updated: January 2025*
*Created for: howtoCloze.com / contactladder.com*
