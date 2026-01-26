import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Reset onboarding status
    const { error } = await supabase
      .from('user_preferences')
      .update({
        onboarding_completed: false,
        onboarding_assessment: {},
        recommended_modules: [],
        gci_goal: null,
        average_sale_price: null,
        commission_percent: null,
        magic_number: null,
      })
      .eq('user_id', user.id)

    if (error) {
      console.error('Reset onboarding error:', error)
      return NextResponse.json(
        { error: 'Failed to reset onboarding' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Reset onboarding error:', error)
    return NextResponse.json(
      { error: 'Failed to reset onboarding' },
      { status: 500 }
    )
  }
}
