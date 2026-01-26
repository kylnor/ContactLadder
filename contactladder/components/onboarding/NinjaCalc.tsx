'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { DollarSign, Home as HomeIcon, Percent, Info, Loader2, AlertCircle } from 'lucide-react'

interface NinjaCalcProps {
  onComplete: (data: CalculatorResults) => void
  userName: string
  isSubmitting?: boolean
}

export interface CalculatorResults {
  gciGoal: number
  homePrice: number
  commissionRate: number
  clientValue: number
  gciPerTransaction: number
  transactionsNeeded: number
  targetDatabaseSize: number
}

export function NinjaCalc({ onComplete, userName, isSubmitting = false }: NinjaCalcProps) {
  const [formData, setFormData] = useState({
    gciGoal: '',
    homePrice: '',
    commissionRate: '',
  })

  const [results, setResults] = useState({
    gciPerTransaction: 0,
    transactionsNeeded: 0,
    targetDatabaseSize: 0,
    clientValue: 0,
  })

  const [showWarningModal, setShowWarningModal] = useState(false)
  const [hasCheckedDatabase, setHasCheckedDatabase] = useState(false)
  const [showCalendarModal, setShowCalendarModal] = useState(false)

  const formatCurrency = (value: number): string => {
    if (isNaN(value) || !isFinite(value)) return '$0'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number): string => {
    if (isNaN(value) || !isFinite(value)) return '0'
    return new Intl.NumberFormat('en-US').format(Math.round(value))
  }

  const calculateResults = () => {
    const gciGoal = parseFloat(parseCurrencyInput(formData.gciGoal)) || 0
    const homePrice = parseFloat(parseCurrencyInput(formData.homePrice)) || 0
    const commissionPercent = parseFloat(formData.commissionRate) || 0

    if (gciGoal <= 0 || homePrice <= 0 || commissionPercent <= 0) {
      setResults({
        gciPerTransaction: 0,
        transactionsNeeded: 0,
        targetDatabaseSize: 0,
        clientValue: 0,
      })
      return
    }

    // Convert percentage to decimal (e.g., 2.5 becomes 0.025)
    const commissionRate = commissionPercent / 100
    const gciPerTransaction = homePrice * commissionRate
    const transactionsNeeded = gciPerTransaction > 0 ? gciGoal / gciPerTransaction : 0
    const clientValue = homePrice * 0.0035
    const targetDatabaseSize = clientValue > 0 ? gciGoal / clientValue : 0

    setResults({
      gciPerTransaction: isFinite(gciPerTransaction) ? gciPerTransaction : 0,
      transactionsNeeded: isFinite(transactionsNeeded) ? transactionsNeeded : 0,
      targetDatabaseSize: isFinite(targetDatabaseSize) ? targetDatabaseSize : 0,
      clientValue: isFinite(clientValue) ? clientValue : 0,
    })
  }

  useEffect(() => {
    calculateResults()
  }, [formData])

  const formatCurrencyInput = (value: string): string => {
    const numericOnly = value.replace(/\D/g, '')
    if (!numericOnly) return ''
    const num = parseInt(numericOnly)
    if (isNaN(num)) return ''
    return num.toLocaleString('en-US')
  }

  const parseCurrencyInput = (value: string): string => {
    return value.replace(/\D/g, '')
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCurrencyBlur = (field: keyof typeof formData, value: string) => {
    if (field === 'gciGoal' || field === 'homePrice') {
      const formatted = formatCurrencyInput(value)
      setFormData((prev) => ({
        ...prev,
        [field]: formatted,
      }))
    }
    checkDatabaseSize()
  }

  const checkDatabaseSize = () => {
    // Only check if all fields are filled
    const gciGoal = parseFloat(parseCurrencyInput(formData.gciGoal)) || 0
    const homePrice = parseFloat(parseCurrencyInput(formData.homePrice)) || 0
    const commissionPercent = parseFloat(formData.commissionRate) || 0

    if (gciGoal > 0 && homePrice > 0 && commissionPercent > 0) {
      setHasCheckedDatabase(true)
      if (results.targetDatabaseSize > 200) {
        // Delay modal appearance for smoother transition
        setTimeout(() => {
          setShowWarningModal(true)
        }, 300)
      } else {
        setShowWarningModal(false)
      }
    }
  }

  const handleContinue = () => {
    const gciGoal = parseFloat(parseCurrencyInput(formData.gciGoal)) || 0
    const homePrice = parseFloat(parseCurrencyInput(formData.homePrice)) || 0
    const commissionPercent = parseFloat(formData.commissionRate) || 0

    if (gciGoal <= 0 || homePrice <= 0 || commissionPercent <= 0) {
      alert('Please fill in all required fields with valid values')
      return
    }

    // Convert percentage to decimal for storage (e.g., 2.5 becomes 0.025)
    const commissionRate = commissionPercent / 100

    onComplete({
      gciGoal,
      homePrice,
      commissionRate,
      clientValue: results.clientValue,
      gciPerTransaction: results.gciPerTransaction,
      transactionsNeeded: results.transactionsNeeded,
      targetDatabaseSize: results.targetDatabaseSize,
    })
  }

  const isValid =
    parseFloat(parseCurrencyInput(formData.gciGoal)) > 0 &&
    parseFloat(parseCurrencyInput(formData.homePrice)) > 0 &&
    parseFloat(formData.commissionRate) > 0

  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Welcome, {userName}! Let's Calculate Your Numbers
        </h1>
        <p className="text-lg text-gray-600">
          First, we'll figure out how many contacts you need to hit your income goal
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Your Goals & Current Status
            </CardTitle>
            <p className="text-sm text-gray-600">
              Enter your information to calculate your database requirements
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Annual GCI Goal */}
            <div className="space-y-2">
              <Label htmlFor="gciGoal" className="flex items-center text-sm font-medium text-gray-700">
                <DollarSign className="mr-2 h-4 w-4 text-blue-600" />
                Annual GCI Goal
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-900">
                  $
                </span>
                <Input
                  id="gciGoal"
                  type="text"
                  placeholder="250,000"
                  className="pl-8 bg-white text-gray-900 border-gray-300"
                  value={formData.gciGoal}
                  onChange={(e) => handleInputChange('gciGoal', e.target.value)}
                  onBlur={(e) => handleCurrencyBlur('gciGoal', e.target.value)}
                />
              </div>
            </div>

            {/* Average Home Sale Price */}
            <div className="space-y-2">
              <Label htmlFor="homePrice" className="flex items-center text-sm font-medium text-gray-700">
                <HomeIcon className="mr-2 h-4 w-4 text-blue-600" />
                Average Home Sale Price
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-900">
                  $
                </span>
                <Input
                  id="homePrice"
                  type="text"
                  placeholder="500,000"
                  className="pl-8 bg-white text-gray-900 border-gray-300"
                  value={formData.homePrice}
                  onChange={(e) => handleInputChange('homePrice', e.target.value)}
                  onBlur={(e) => handleCurrencyBlur('homePrice', e.target.value)}
                />
              </div>
            </div>

            {/* Commission Rate */}
            <div className="space-y-2">
              <Label htmlFor="commissionRate" className="flex items-center text-sm font-medium text-gray-700">
                <Percent className="mr-2 h-4 w-4 text-blue-600" />
                Average Commission Rate
              </Label>
              <div className="relative">
                <Input
                  id="commissionRate"
                  type="number"
                  placeholder="2.5"
                  min="0"
                  max="100"
                  step="0.1"
                  className="pr-8 bg-white text-gray-900 border-gray-300"
                  value={formData.commissionRate}
                  onChange={(e) => handleInputChange('commissionRate', e.target.value)}
                  onBlur={checkDatabaseSize}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-sm text-gray-600">
                  %
                </span>
              </div>
              <p className="text-xs text-gray-500">Enter as percentage (e.g., 2.5 for 2.5%)</p>
            </div>

            {/* Client Value Display */}
            <div className="space-y-2">
              <Label className="flex items-center text-sm font-medium text-gray-700">
                <DollarSign className="mr-2 h-4 w-4 text-blue-600" />
                Client Value
              </Label>
              <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                <span className="text-lg font-semibold text-gray-900">
                  {results.clientValue > 0 ? formatCurrency(results.clientValue) : '$0'}
                </span>
                <span className="ml-2 text-sm text-gray-600">per contact</span>
              </div>
              <p className="text-xs text-gray-500">Home Price × 0.0035</p>
            </div>
          </CardContent>
        </Card>

        {/* Results Display */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Your Database Requirements
            </CardTitle>
            <p className="text-sm text-gray-600">
              Calculations based on the Ninja Selling model
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* GCI per Transaction */}
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Average GCI per Transaction</h3>
                  <p className="text-sm text-gray-600">Home Price × Commission Rate</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-blue-600">
                    {formatCurrency(results.gciPerTransaction)}
                  </span>
                </div>
              </div>
            </div>

            {/* Transactions Needed */}
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Transactions Needed</h3>
                  <p className="text-sm text-gray-600">GCI Goal ÷ GCI per Transaction</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-emerald-600">
                    {formatNumber(results.transactionsNeeded)}
                  </span>
                  <span className="block text-sm text-gray-600">transactions</span>
                </div>
              </div>
            </div>

            {/* Target Database Size */}
            <div className={`rounded-lg border p-4 ${
              results.targetDatabaseSize > 200
                ? 'border-orange-200 bg-orange-50'
                : 'border-purple-100 bg-purple-50'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">Target Database Size</h3>
                    {results.targetDatabaseSize > 200 && (
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">GCI Goal ÷ Client Value</p>
                  {results.targetDatabaseSize > 200 && (
                    <p className="text-xs text-orange-600 font-medium mt-1">Too many contacts for flow</p>
                  )}
                </div>
                <div className="text-right">
                  <span className={`text-xl font-bold ${
                    results.targetDatabaseSize > 200 ? 'text-orange-600' : 'text-purple-600'
                  }`}>
                    {formatNumber(results.targetDatabaseSize)}
                  </span>
                  <span className="block text-sm text-gray-600">contacts</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleContinue}
                disabled={!isValid || isSubmitting}
                size="lg"
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Completing Onboarding...
                  </>
                ) : (
                  'Continue to Complete Onboarding'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Section */}
      <Card className="mt-8 shadow-lg">
        <CardContent className="p-6">
          <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
            <Info className="mr-2 h-5 w-5 text-blue-600" />
            About the Ninja Selling Model
          </h3>
          <div className="mb-6 grid gap-6 text-sm text-gray-600 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium text-gray-800">Database Formula</h4>
              <p>
                Your database size is calculated by dividing your GCI goal by your client
                value. Client value is your average sales price × 0.0035. The 0.0035 factor
                blends in both average commission rates and today's conversion rates.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-gray-800">Quality Over Quantity</h4>
              <p>
                Focus on building relationships with quality contacts who know, like, and
                trust you. Regular communication and value-driven interactions are key to
                success.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning Modal for Large Database */}
      <Dialog open={showWarningModal} onOpenChange={setShowWarningModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl text-orange-600">
              <AlertCircle className="h-6 w-6" />
              That's Too Many Contacts
            </DialogTitle>
            <DialogDescription className="text-base text-gray-700 pt-2">
              You can't be in flow with {Math.round(results.targetDatabaseSize)} people. The Ninja Selling model works best with a database of 200 or fewer quality contacts.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Video Section */}
            <div className="rounded-lg bg-gray-100 border-2 border-gray-200">
              <div className="aspect-video flex items-center justify-center p-8">
                <div className="text-center">
                  <Info className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                  <p className="text-gray-500 font-medium">
                    Video: Adjusting Your Numbers for Flow
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    (Video will be embedded here)
                  </p>
                </div>
              </div>
            </div>

            {/* Guidance */}
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Don't Change Your Goal</h4>
              <p className="text-sm text-gray-700 mb-3">
                Your GCI goal of {formatCurrency(parseFloat(parseCurrencyInput(formData.gciGoal)) || 0)} is your dream. Keep it! Instead, change <strong>how</strong> you get there:
              </p>

              <div className="space-y-3">
                <div className="bg-white rounded-md p-3 border border-blue-100">
                  <div className="flex items-start gap-2">
                    <HomeIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm">Increase Your Average Sale Price</h5>
                      <p className="text-xs text-gray-600 mt-1">
                        Current: {formatCurrency(parseFloat(parseCurrencyInput(formData.homePrice)) || 0)}<br />
                        Work in a higher-priced market or target luxury properties to increase the value of each transaction.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-md p-3 border border-blue-100">
                  <div className="flex items-start gap-2">
                    <Percent className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm">Increase Your Commission Rate</h5>
                      <p className="text-xs text-gray-600 mt-1">
                        Current: {formData.commissionRate}%<br />
                        Represent both sides of transactions, or negotiate higher commission splits to earn more per deal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button
                onClick={() => {
                  setShowWarningModal(false)
                  setShowCalendarModal(true)
                }}
                variant="outline"
                className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Schedule Time with Trainer
              </Button>
              <Button onClick={() => setShowWarningModal(false)} variant="default">
                I Understand
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Calendar Modal */}
      <Dialog open={showCalendarModal} onOpenChange={setShowCalendarModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl">Schedule Training Session</DialogTitle>
            <DialogDescription>
              Book a one-on-one session with Kyle to discuss your database strategy
            </DialogDescription>
          </DialogHeader>
          <div className="w-full h-[600px] overflow-auto">
            <iframe
              src="https://cal.com/kylenorthup/cloze"
              className="w-full h-full border-0"
              frameBorder="0"
              title="Schedule Training Session"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
