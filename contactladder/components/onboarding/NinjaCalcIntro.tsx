'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calculator, ArrowRight } from 'lucide-react'

interface NinjaCalcIntroProps {
  onContinue: () => void
  userName: string
}

export function NinjaCalcIntro({ onContinue, userName }: NinjaCalcIntroProps) {
  return (
    <div className="mx-auto max-w-4xl px-8 py-12">
      <div className="mb-8 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <Calculator className="h-10 w-10 text-[#2c66e2]" />
          <h1 className="text-4xl font-bold text-gray-900">
            Let's See How Many Contacts You Need
          </h1>
        </div>
        <p className="text-lg text-gray-600">
          Understanding your database size is the foundation of your success
        </p>
      </div>

      {/* Video Section */}
      <Card className="mb-8 shadow-lg">
        <CardContent className="p-6">
          <div className="mb-4">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              The Ninja Selling Database Formula
            </h2>
            <p className="text-gray-600">
              Watch this quick explanation of how the database calculation works and why it matters for your business
            </p>
          </div>

          {/* Video Placeholder - Replace with actual video URL */}
          <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center border-2 border-gray-200">
            <div className="text-center p-8">
              <Calculator className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <p className="text-gray-500 font-medium">
                Video: Understanding Your Database Size
              </p>
              <p className="text-sm text-gray-400 mt-2">
                (Video will be embedded here)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Concepts */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <Card className="border-l-4 border-l-[#2c66e2]">
          <CardContent className="p-6">
            <h3 className="mb-2 font-semibold text-gray-900">Client Value Formula</h3>
            <p className="text-sm text-gray-600">
              Your average home sale price × 0.0035 = value per contact. This factor
              accounts for average commission rates and realistic conversion rates.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#4DBDBD]">
          <CardContent className="p-6">
            <h3 className="mb-2 font-semibold text-gray-900">Database Size</h3>
            <p className="text-sm text-gray-600">
              Your GCI goal ÷ client value = target database size. This tells you
              exactly how many quality relationships you need to build.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#F37C5F]">
          <CardContent className="p-6">
            <h3 className="mb-2 font-semibold text-gray-900">Quality Over Quantity</h3>
            <p className="text-sm text-gray-600">
              These should be people who know, like, and trust you. Focus on
              building real relationships, not just collecting contacts.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <h3 className="mb-2 font-semibold text-gray-900">Your Roadmap</h3>
            <p className="text-sm text-gray-600">
              Once you know your magic number, you'll have a clear roadmap for
              building your business with confidence.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <Button onClick={onContinue} size="lg" className="min-w-[250px]">
          Calculate My Numbers
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
