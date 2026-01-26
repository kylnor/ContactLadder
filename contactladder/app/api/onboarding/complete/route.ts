import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(request: NextRequest) {
  try {
    const { skillLevel, focusAreas, primaryGoal, painPoint, userId, calculatorData } =
      await request.json()

    // Create assessment object
    const assessment = {
      experience_level: skillLevel,
      focus_areas: focusAreas,
      goals: [primaryGoal, ...(painPoint ? [painPoint] : [])],
      summary: `${skillLevel} level user focused on ${focusAreas.join(', ')} with goal: ${primaryGoal}`,
    }

    // Generate personalized learning path using AI
    const recommendedModules = await generateLearningPath(assessment, userId)

    // Save to database
    const supabase = await createClient()
    const updateData: any = {
      onboarding_assessment: assessment,
      recommended_modules: recommendedModules,
      onboarding_completed: true,
    }

    // Include calculator data if provided
    if (calculatorData) {
      updateData.gci_goal = calculatorData.gciGoal
      updateData.average_sale_price = calculatorData.homePrice
      updateData.commission_percent = calculatorData.commissionRate
      updateData.magic_number = Math.round(calculatorData.targetDatabaseSize)
    }

    await supabase
      .from('user_preferences')
      .update(updateData)
      .eq('user_id', userId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Onboarding completion error:', error)
    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    )
  }
}

async function generateLearningPath(
  assessment: any,
  userId: string
): Promise<string[]> {
  const supabase = await createClient()

  // Get all published modules
  const { data: modules } = await supabase
    .from('modules')
    .select('slug, title, category, description, content')
    .eq('is_published', true)
    .order('category')
    .order('order_index')

  if (!modules) return []

  // Use AI to recommend module order based on assessment
  const modulesList = modules
    .map(
      (m) =>
        `${m.slug} (${m.category}): ${m.title} - ${m.description?.substring(0, 100)}`
    )
    .join('\n')

  const recommendationResponse = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 512,
    system: `You are recommending a personalized learning path for a Cloze user.

Given their assessment and available modules, recommend 5-10 modules in priority order.

Return ONLY a JSON array of module slugs in recommended order:
["slug1", "slug2", "slug3", ...]

Prioritize based on:
- Experience level (beginners need essentials first)
- Focus areas (match to relevant deep dives)
- Goals (help them achieve their specific objectives)`,
    messages: [
      {
        role: 'user',
        content: `Assessment:
${JSON.stringify(assessment, null, 2)}

Available Modules:
${modulesList}

Recommend 5-10 modules in priority order.`,
      },
    ],
  })

  const recommendedText =
    recommendationResponse.content[0].type === 'text'
      ? recommendationResponse.content[0].text
      : '[]'

  try {
    return JSON.parse(recommendedText)
  } catch {
    // Fallback: return first 5 essentials then popular deep dives
    return modules.slice(0, 8).map((m) => m.slug)
  }
}
