import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

const SYSTEM_PROMPT = `You are a helpful Cloze training assistant conducting an onboarding assessment for real estate agents.

Your goal: Ask 3-5 questions to understand:
1. Their SKILL level with Cloze - not how long they've used it, but how well they USE it (beginner, intermediate, advanced)
   - Do they have contacts organized? Using pipelines? Automations? Or just basic features?
2. What they want to focus on (e.g., properties, marketing, automation, teams)
3. Their biggest pain points or goals
4. Their preferred learning style (if relevant)

IMPORTANT: Someone could use Cloze for 10 years but still be a beginner if they only use basic features and don't have contacts organized.

Guidelines:
- Be friendly and conversational
- Keep questions short and clear
- Accept various answer formats (A/B/C choices, free text, etc.)
- After 3-5 questions, provide a summary and say you're creating their personalized learning path
- End with: "Perfect! I'm creating your personalized learning path now. You'll see your recommended modules in just a moment!"

When you're ready to complete the assessment, your response should start with "COMPLETE:" followed by the summary.

Extract and structure the assessment data in your thinking:
- experience_level: "beginner" | "intermediate" | "advanced"
- focus_areas: array of focus topics
- goals: array of goals/pain points
- learning_style: description`

export async function POST(request: NextRequest) {
  try {
    const { messages, userId } = await request.json()

    // Convert messages to Anthropic format
    const anthropicMessages = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    }))

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: anthropicMessages,
    })

    const assistantMessage = response.content[0].type === 'text'
      ? response.content[0].text
      : ''

    // Check if assessment is complete
    const isComplete = assistantMessage.startsWith('COMPLETE:')

    if (isComplete) {
      // Extract assessment data from conversation
      const assessment = await extractAssessment(messages, userId)

      // Generate personalized learning path
      const recommendedModules = await generateLearningPath(assessment, userId)

      // Save to database
      const supabase = await createClient()
      await supabase
        .from('user_preferences')
        .update({
          onboarding_assessment: assessment,
          recommended_modules: recommendedModules,
          onboarding_completed: true,
        })
        .eq('user_id', userId)

      return NextResponse.json({
        message: assistantMessage.replace('COMPLETE:', '').trim(),
        complete: true,
      })
    }

    return NextResponse.json({
      message: assistantMessage,
      complete: false,
    })

  } catch (error) {
    console.error('Assessment API error:', error)
    return NextResponse.json(
      { error: 'Failed to process assessment' },
      { status: 500 }
    )
  }
}

async function extractAssessment(messages: any[], userId: string) {
  const conversation = messages.map(m => `${m.role}: ${m.content}`).join('\n\n')

  const extractionResponse = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 512,
    system: `Extract structured assessment data from this conversation. Return ONLY valid JSON with this exact structure:
{
  "experience_level": "beginner" | "intermediate" | "advanced",
  "focus_areas": ["properties", "marketing", etc],
  "goals": ["improve follow-up", "track transactions", etc],
  "summary": "brief summary of their needs"
}`,
    messages: [
      {
        role: 'user',
        content: `Extract assessment data from this conversation:\n\n${conversation}`
      }
    ],
  })

  const jsonText = extractionResponse.content[0].type === 'text'
    ? extractionResponse.content[0].text
    : '{}'

  try {
    return JSON.parse(jsonText)
  } catch {
    return {
      experience_level: 'beginner',
      focus_areas: [],
      goals: [],
      summary: 'General Cloze training'
    }
  }
}

async function generateLearningPath(assessment: any, userId: string): Promise<string[]> {
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
  const modulesList = modules.map(m =>
    `${m.slug} (${m.category}): ${m.title} - ${m.description?.substring(0, 100)}`
  ).join('\n')

  const recommendationResponse = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
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

Recommend 5-10 modules in priority order.`
      }
    ],
  })

  const recommendedText = recommendationResponse.content[0].type === 'text'
    ? recommendationResponse.content[0].text
    : '[]'

  try {
    return JSON.parse(recommendedText)
  } catch {
    // Fallback: return first 5 essentials then popular deep dives
    return modules.slice(0, 8).map(m => m.slug)
  }
}
