'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { NinjaCalc, CalculatorResults } from './NinjaCalc'
import { NinjaCalcIntro } from './NinjaCalcIntro'
import { OnboardingForm } from './OnboardingForm'

interface OnboardingFlowProps {
  userName: string
  userId: string
}

type OnboardingStep = 'assessment' | 'video' | 'calculator' | 'submitting'

export function OnboardingFlow({ userName, userId }: OnboardingFlowProps) {
  const router = useRouter()
  const [step, setStep] = useState<OnboardingStep>('assessment')
  const [assessmentData, setAssessmentData] = useState<any>(null)

  const handleAssessmentComplete = (data: any) => {
    setAssessmentData(data)
    setStep('video')
  }

  const handleVideoComplete = () => {
    setStep('calculator')
  }

  const handleCalculatorComplete = async (calculatorData: CalculatorResults) => {
    setStep('submitting')

    try {
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...assessmentData,
          userId,
          calculatorData,
        }),
      })

      if (response.ok) {
        router.push('/dashboard')
        router.refresh()
      } else {
        alert('Failed to complete onboarding. Please try again.')
        setStep('calculator') // Go back to calculator on error
      }
    } catch (error) {
      console.error('Onboarding error:', error)
      alert('Something went wrong. Please try again.')
      setStep('calculator') // Go back to calculator on error
    }
  }

  if (step === 'assessment') {
    return (
      <OnboardingForm
        userName={userName}
        userId={userId}
        onComplete={handleAssessmentComplete}
      />
    )
  }

  if (step === 'video') {
    return <NinjaCalcIntro onContinue={handleVideoComplete} userName={userName} />
  }

  if (step === 'calculator' || step === 'submitting') {
    return (
      <NinjaCalc
        onComplete={handleCalculatorComplete}
        userName={userName}
        isSubmitting={step === 'submitting'}
      />
    )
  }

  return null
}
