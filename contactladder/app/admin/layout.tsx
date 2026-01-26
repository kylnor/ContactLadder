import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Settings, BookOpen, Home } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-[#2c66e2]" />
                <h1 className="text-xl font-bold text-gray-900">Admin Console</h1>
              </div>

              <nav className="flex items-center gap-6">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#2c66e2] transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  Modules
                </Link>
              </nav>
            </div>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}
