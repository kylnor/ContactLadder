import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Admin auth check helper
 */
async function checkAdminAuth() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { authorized: false, supabase, user: null }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) {
    return { authorized: false, supabase, user }
  }

  return { authorized: true, supabase, user }
}

/**
 * POST /api/admin/modules
 * Create a new training module
 */
export async function POST(request: NextRequest) {
  const { authorized, supabase } = await checkAdminAuth()

  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.slug || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, category' },
        { status: 400 }
      )
    }

    // Prepare module data
    const moduleData = {
      slug: body.slug,
      title: body.title,
      description: body.description || '',
      category: body.category,
      order_index: body.order_index || 1,
      estimated_duration: body.estimated_duration || 30,
      prerequisites: body.prerequisites || [],
      video_urls: body.video_urls || {},
      header_image: body.header_image || null,
      is_published: body.is_published || false,
      content: body.content || '',
      content_path: `content/${body.category}/${body.slug}.md`, // For reference
    }

    // Insert module
    const { data, error } = await supabase
      .from('modules')
      .insert(moduleData)
      .select()
      .single()

    if (error) {
      console.error('Error creating module:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to create module' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, module: data }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/admin/modules:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
