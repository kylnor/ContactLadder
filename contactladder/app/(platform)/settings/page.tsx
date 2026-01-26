import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Settings</h1>
          <p className="text-lg text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Profile Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <p className="text-base text-gray-900">
                {profile?.full_name || 'Not set'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <p className="text-base text-gray-900">{user.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member Since
              </label>
              <p className="text-base text-gray-900">
                {new Date(user.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Account Settings
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">
                  Receive updates about your progress
                </p>
              </div>
              <div className="text-sm text-gray-500">Coming soon</div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Learning Reminders</p>
                <p className="text-sm text-gray-600">
                  Get reminded to continue your training
                </p>
              </div>
              <div className="text-sm text-gray-500">Coming soon</div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Data Export</p>
                <p className="text-sm text-gray-600">
                  Download your training data
                </p>
              </div>
              <div className="text-sm text-gray-500">Coming soon</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
