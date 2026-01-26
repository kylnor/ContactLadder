import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { moduleId } = await request.json()

    const supabase = await createClient()

    // Get user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if progress record exists
    const { data: existing } = await supabase
      .from('module_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('module_id', moduleId)
      .single()

    if (existing) {
      // Update existing
      await supabase
        .from('module_progress')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          last_accessed_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
    } else {
      // Create new
      await supabase.from('module_progress').insert({
        user_id: user.id,
        module_id: moduleId,
        status: 'completed',
        completed_at: new Date().toISOString(),
        last_accessed_at: new Date().toISOString(),
      })
    }

    // Get next recommended module
    const { data: preferences } = await supabase
      .from('user_preferences')
      .select('recommended_modules')
      .eq('user_id', user.id)
      .single()

    const recommendedModules = preferences?.recommended_modules || []
    const currentIndex = recommendedModules.indexOf(moduleId)
    const nextModuleSlug =
      currentIndex !== -1 && currentIndex < recommendedModules.length - 1
        ? recommendedModules[currentIndex + 1]
        : null

    // If we have a next module, get its category
    let nextModuleUrl = null
    if (nextModuleSlug) {
      const { data: nextModule } = await supabase
        .from('modules')
        .select('category')
        .eq('slug', nextModuleSlug)
        .single()

      if (nextModule) {
        nextModuleUrl = `/training/${nextModule.category}/${nextModuleSlug}`
      }
    }

    return NextResponse.json({
      success: true,
      nextModuleUrl,
    })
  } catch (error) {
    console.error('Module completion error:', error)
    return NextResponse.json(
      { error: 'Failed to mark module as complete' },
      { status: 500 }
    )
  }
}
