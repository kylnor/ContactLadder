'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sparkles, Loader2 } from 'lucide-react'
import { CalculatorResults } from './NinjaCalc'

interface OnboardingFormProps {
  userName: string
  userId: string
  calculatorData?: CalculatorResults | null
  onComplete?: (data: any) => void // Optional callback for multi-step flow
}

export function OnboardingForm({ userName, userId, calculatorData, onComplete }: OnboardingFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    skillLevel: '',
    focusAreas: [] as string[],
    primaryGoal: '',
    painPoint: '',
  })

  const handleCheckboxChange = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter((a) => a !== area)
        : [...prev.focusAreas, area],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // If onComplete callback is provided, this is part of a multi-step flow
    if (onComplete) {
      onComplete(formData)
      setLoading(false)
      return
    }

    // Otherwise, submit directly to API (standalone mode)
    try {
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userId,
          calculatorData
        }),
      })

      if (response.ok) {
        router.push('/dashboard')
        router.refresh()
      } else {
        alert('Failed to complete onboarding. Please try again.')
        setLoading(false)
      }
    } catch (error) {
      console.error('Onboarding error:', error)
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const isValid =
    formData.skillLevel &&
    formData.focusAreas.length > 0 &&
    formData.primaryGoal

  return (
    <div className="mx-auto max-w-2xl px-8 py-12">
      <div className="mb-8 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-[#2c66e2]" />
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {userName}!
          </h1>
        </div>
        <p className="text-lg text-gray-600">
          Let's personalize your Cloze training experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Skill Level */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <label className="mb-4 block text-lg font-semibold text-gray-900">
            What's your current skill level with Cloze?
          </label>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-gray-200 p-4 transition-colors hover:border-[#2c66e2] has-[:checked]:border-[#2c66e2] has-[:checked]:bg-blue-50">
              <input
                type="radio"
                name="skillLevel"
                value="beginner"
                checked={formData.skillLevel === 'beginner'}
                onChange={(e) =>
                  setFormData({ ...formData, skillLevel: e.target.value })
                }
                className="mt-1 h-4 w-4 text-[#2c66e2]"
              />
              <div>
                <div className="font-semibold text-gray-900">Beginner</div>
                <div className="text-sm text-gray-600">
                  Just getting started or using basic features only
                </div>
              </div>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-gray-200 p-4 transition-colors hover:border-[#2c66e2] has-[:checked]:border-[#2c66e2] has-[:checked]:bg-blue-50">
              <input
                type="radio"
                name="skillLevel"
                value="intermediate"
                checked={formData.skillLevel === 'intermediate'}
                onChange={(e) =>
                  setFormData({ ...formData, skillLevel: e.target.value })
                }
                className="mt-1 h-4 w-4 text-[#2c66e2]"
              />
              <div>
                <div className="font-semibold text-gray-900">Intermediate</div>
                <div className="text-sm text-gray-600">
                  Contacts organized, using pipelines and basic automation
                </div>
              </div>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-gray-200 p-4 transition-colors hover:border-[#2c66e2] has-[:checked]:border-[#2c66e2] has-[:checked]:bg-blue-50">
              <input
                type="radio"
                name="skillLevel"
                value="advanced"
                checked={formData.skillLevel === 'advanced'}
                onChange={(e) =>
                  setFormData({ ...formData, skillLevel: e.target.value })
                }
                className="mt-1 h-4 w-4 text-[#2c66e2]"
              />
              <div>
                <div className="font-semibold text-gray-900">Advanced</div>
                <div className="text-sm text-gray-600">
                  Using advanced automation, templates, and team features
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <label className="mb-4 block text-lg font-semibold text-gray-900">
            What do you want to focus on? (Select all that apply)
          </label>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              {
                value: 'contacts',
                label: 'Contact Organization',
                desc: 'Managing relationships better',
              },
              {
                value: 'marketing',
                label: 'Marketing & Outreach',
                desc: 'Email campaigns and engagement',
              },
              {
                value: 'followup',
                label: 'Follow-up Systems',
                desc: 'Never miss a follow-up',
              },
              {
                value: 'automation',
                label: 'Automation',
                desc: 'Save time with workflows',
              },
              {
                value: 'teams',
                label: 'Team Collaboration',
                desc: 'Working with assistants or team',
              },
              {
                value: 'transactions',
                label: 'Transaction Management',
                desc: 'Tracking deals and closings',
              },
            ].map((area) => (
              <label
                key={area.value}
                className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-gray-200 p-4 transition-colors hover:border-[#2c66e2] has-[:checked]:border-[#2c66e2] has-[:checked]:bg-blue-50"
              >
                <input
                  type="checkbox"
                  checked={formData.focusAreas.includes(area.value)}
                  onChange={() => handleCheckboxChange(area.value)}
                  className="mt-1 h-4 w-4 text-[#2c66e2]"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {area.label}
                  </div>
                  <div className="text-sm text-gray-600">{area.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Primary Goal */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <label className="mb-4 block text-lg font-semibold text-gray-900">
            What's your primary goal right now?
          </label>
          <select
            value={formData.primaryGoal}
            onChange={(e) =>
              setFormData({ ...formData, primaryGoal: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-[#2c66e2] focus:outline-none focus:ring-2 focus:ring-[#2c66e2]"
          >
            <option value="">Select your primary goal...</option>
            <option value="get-organized">
              Get organized and set up my system
            </option>
            <option value="close-more-deals">
              Close more deals and grow my business
            </option>
            <option value="save-time">
              Save time with automation and efficiency
            </option>
            <option value="improve-followup">
              Never miss a follow-up or opportunity
            </option>
            <option value="better-relationships">
              Build better client relationships
            </option>
            <option value="team-coordination">
              Improve team coordination
            </option>
          </select>
        </div>

        {/* Optional Pain Point */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <label className="mb-4 block text-lg font-semibold text-gray-900">
            Any specific challenges? (Optional)
          </label>
          <textarea
            value={formData.painPoint}
            onChange={(e) =>
              setFormData({ ...formData, painPoint: e.target.value })
            }
            placeholder="e.g., I have too many unorganized contacts, struggling with email templates, etc."
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-400 focus:border-[#2c66e2] focus:outline-none focus:ring-2 focus:ring-[#2c66e2]"
            rows={3}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            disabled={!isValid || loading}
            className="min-w-[200px]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {onComplete ? 'Processing...' : 'Creating Your Path...'}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                {onComplete ? 'Continue' : 'Create My Learning Path'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
