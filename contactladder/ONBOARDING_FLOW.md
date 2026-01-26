# 3-Step Onboarding Flow 🚀

## Overview
New users go through a comprehensive 3-step onboarding process that combines skills assessment with the Ninja Selling Database Calculator.

## Flow Steps

### Step 1: Skills Assessment 📋
**Component:** `OnboardingForm`
**Purpose:** Understand user's current skill level and goals

Collects:
- Skill level (Beginner, Intermediate, Advanced)
- Focus areas (Properties, Contacts, Marketing, Automation, Teams, Follow-up)
- Primary goal (Get organized, Close deals, Save time, etc.)
- Optional pain points

**CTA Button:** "Continue"

---

### Step 2: Ninja Calc Introduction 🎓
**Component:** `NinjaCalcIntro`
**Purpose:** Educate users about the Ninja Selling Database formula before they calculate

Features:
- Headline: "Let's See How Many Contacts You Need"
- Video explanation section (placeholder ready for video URL)
- 4 key concept cards:
  - Client Value Formula
  - Database Size
  - Quality Over Quantity
  - Your Roadmap

**CTA Button:** "Calculate My Numbers"

---

### Step 3: Database Calculator 🧮
**Component:** `NinjaCalc`
**Purpose:** Calculate user's magic number and business metrics

Inputs:
- Annual GCI Goal
- Average Home Sale Price
- Average Commission Rate (decimal)
- Current Clients In Database

Live Calculations:
- **Client Value** = Home Price × 0.0035
- **GCI per Transaction** = Home Price × Commission Rate
- **Transactions Needed** = GCI Goal ÷ GCI per Transaction
- **Target Database Size** = GCI Goal ÷ Client Value
- **Additional Contacts Needed** = Target DB - Current Contacts

**CTA Button:** "Continue to Complete Onboarding" → Submits everything to API

---

## Technical Implementation

### Files Created/Modified

**New Components:**
- `/components/onboarding/OnboardingFlow.tsx` - 3-step wizard controller
- `/components/onboarding/NinjaCalc.tsx` - Calculator component
- `/components/onboarding/NinjaCalcIntro.tsx` - Video introduction page
- `/components/ui/card.tsx` - Card UI components

**Modified:**
- `/components/onboarding/OnboardingForm.tsx` - Added onComplete callback support
- `/app/(platform)/onboarding/page.tsx` - Uses OnboardingFlow instead of OnboardingForm
- `/app/api/onboarding/complete/route.ts` - Saves calculator data to database

### Data Flow

1. **Assessment Data Collected** → Stored in state
2. **Video Viewed** → User educated on concepts
3. **Calculator Data Collected** → Combined with assessment data
4. **API Submission** → Everything saved at once:
   ```json
   {
     "skillLevel": "intermediate",
     "focusAreas": ["properties", "marketing"],
     "primaryGoal": "close-more-deals",
     "painPoint": "...",
     "calculatorData": {
       "gciGoal": 250000,
       "homePrice": 500000,
       "commissionRate": 0.025,
       "currentContacts": 150,
       "clientValue": 1750,
       "targetDatabaseSize": 143,
       "contactsNeeded": 0
     }
   }
   ```

### Database Schema

Saved to `user_preferences` table:
- `gci_goal` (NUMERIC) - Annual GCI goal
- `average_sale_price` (NUMERIC) - Average home price
- `commission_percent` (NUMERIC) - Commission rate
- `magic_number` (INTEGER) - Target database size
- `onboarding_assessment` (JSONB) - Skills assessment responses
- `recommended_modules` (TEXT[]) - AI-generated learning path
- `onboarding_completed` (BOOLEAN) - Set to true after completion

---

## Next Steps

### Add Video Content
Replace the placeholder in `NinjaCalcIntro.tsx`:

```tsx
{/* Replace this placeholder */}
<div className="aspect-video rounded-lg bg-gray-100...">
  {/* Video placeholder */}
</div>

{/* With actual video embed */}
<div className="aspect-video rounded-lg overflow-hidden">
  <iframe
    src="YOUR_VIDEO_URL"
    className="w-full h-full"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
</div>
```

### Video Script Available
See `/video-scripts/essentials/ninja-calc.md` (to be created) for recording the explanation video

---

## User Experience

**Before:** Users completed assessment → Immediately created learning path

**Now:** Users complete assessment → Learn about database formula → Calculate their numbers → Complete onboarding with full context

**Benefits:**
- Users understand WHY they need a certain database size
- Calculator data informs personalized content (greeting with GCI goal, etc.)
- Education happens at the right time (before calculation, not after)
- Complete business profile captured for future personalization

---

## Build Status
✅ All components created
✅ Data flow wired up
✅ API integration complete
✅ Database schema ready
✅ Build compiling successfully

**Ready for testing!**
