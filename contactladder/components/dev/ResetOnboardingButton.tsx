'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { RotateCcw, Loader2 } from 'lucide-react'

export function ResetOnboardingButton() {
  const router = useRouter()
  const [isResetting, setIsResetting] = useState(false)

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset your onboarding? This will clear all your assessment data and calculator results.')) {
      return
    }

    setIsResetting(true)

    try {
      const response = await fetch('/api/onboarding/reset', {
        method: 'POST',
      })

      if (response.ok) {
        router.push('/onboarding')
        router.refresh()
      } else {
        alert('Failed to reset onboarding. Please try again.')
        setIsResetting(false)
      }
    } catch (error) {
      console.error('Reset error:', error)
      alert('Something went wrong. Please try again.')
      setIsResetting(false)
    }
  }

  return (
    <Button
      onClick={handleReset}
      disabled={isResetting}
      variant="outline"
      size="lg"
    >
      {isResetting ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Resetting...
        </>
      ) : (
        <>
          <RotateCcw className="mr-2 h-5 w-5" />
          Reset Onboarding
        </>
      )}
    </Button>
  )
}
