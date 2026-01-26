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
 * PUT /api/admin/modules/[id]
 * Update an existing training module
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, supabase } = await checkAdminAuth()

  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const { id } = await params
    const body = await request.json()

    // Prepare update data
    const updateData = {
      title: body.title,
      slug: body.slug,
      description: body.description || '',
      category: body.category,
      order_index: body.order_index || 1,
      estimated_duration: body.estimated_duration || 30,
      prerequisites: body.prerequisites || [],
      video_urls: body.video_urls || {},
      header_image: body.header_image || null,
      is_published: body.is_published || false,
      content: body.content || '',
      updated_at: new Date().toISOString(),
    }

    // Update module
    const { data, error } = await supabase
      .from('modules')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating module:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to update module' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, module: data }, { status: 200 })
  } catch (error) {
    console.error('Error in PUT /api/admin/modules/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/modules/[id]
 * Delete a training module
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, supabase } = await checkAdminAuth()

  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const { id } = await params

    // Delete module
    const { error } = await supabase.from('modules').delete().eq('id', id)

    if (error) {
      console.error('Error deleting module:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to delete module' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error in DELETE /api/admin/modules/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
