import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, Video, TrendingUp, CheckCircle2 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-solid border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="text-[#2c66e2]">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-[#111317] text-xl font-bold tracking-tight">
              ContactLadder
            </h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-[#111317] text-sm font-medium hover:text-[#2c66e2] transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-[#111317] text-sm font-medium hover:text-[#2c66e2] transition-colors"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-[#111317] text-sm font-medium hover:text-[#2c66e2] transition-colors"
            >
              About
            </a>
            <Link href="/signup">
              <button className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#2c66e2] text-white text-sm font-bold tracking-wide hover:bg-[#1e4fc2] transition-colors">
                Get Started
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="w-full bg-white">
          <div className="max-w-[1280px] mx-auto px-6 py-10 lg:px-10">
            <div className="relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-20 text-center shadow-xl">
              <div className="relative z-10 flex flex-col items-center gap-6">
                <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight max-w-3xl">
                  Master Cloze. <span className="text-[#4DBDBD]">Grow Your Business.</span>
                </h1>
                <p className="text-gray-300 text-base md:text-xl font-normal leading-relaxed max-w-2xl">
                  The ultimate training platform for real estate professionals to master Cloze CRM and scale their operations with automated workflows and expert strategies.
                </p>
                <div className="flex flex-wrap gap-4 mt-4 justify-center">
                  <Link href="/signup">
                    <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-white text-[#2c66e2] text-base font-bold shadow-lg hover:bg-blue-50 transition-all">
                      Get Started Free
                    </button>
                  </Link>
                  <Link href="/login">
                    <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 border-2 border-white/40 text-white text-base font-bold backdrop-blur-sm hover:bg-white/10 transition-all">
                      Sign In
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="bg-white py-16 md:py-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col gap-12">
              <div className="text-center md:text-left flex flex-col gap-4">
                <h2 className="text-[#111317] text-3xl md:text-4xl font-black leading-tight">
                  Why Choose ContactLadder?
                </h2>
                <p className="text-gray-500 text-lg max-w-2xl">
                  Our comprehensive training platform provides everything you need to become a CRM power user and turn your database into a closing machine.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Feature 1 - Orange */}
                <div className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F37C5F]/10">
                    <BookOpen className="h-6 w-6 text-[#F37C5F]" />
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold">
                    Comprehensive Modules
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Deep dives into every CRM feature to ensure no tool goes unused in your daily workflow.
                  </p>
                </div>

                {/* Feature 2 - Teal */}
                <div className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4DBDBD]/10">
                    <Video className="h-6 w-6 text-[#4DBDBD]" />
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold">
                    Video Training
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Step-by-step visual guides designed for easy learning and immediate field implementation.
                  </p>
                </div>

                {/* Feature 3 - Yellow */}
                <div className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F9C74F]/10">
                    <TrendingUp className="h-6 w-6 text-[#F9C74F]" />
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold">
                    Track Progress
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Monitor your improvement with a personal dashboard that tracks your module completion.
                  </p>
                </div>

                {/* Feature 4 - Blue */}
                <div className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#2c66e2]/10">
                    <CheckCircle2 className="h-6 w-6 text-[#2c66e2]" />
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold">
                    Personalized Learning
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Curated learning paths specifically tailored to your unique real estate niche and market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 text-center">
            <h2 className="text-[#111317] text-3xl md:text-4xl font-black mb-4">
              Ready to Master Your CRM?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of real estate professionals growing their business with ContactLadder. Start your journey toward organized excellence today.
            </p>
            <Link href="/signup">
              <button className="flex mx-auto min-w-[200px] cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-[#2c66e2] text-white text-base font-bold hover:bg-[#1e4fc2] transition-colors shadow-lg">
                Start Your Training Today
              </button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 px-4 py-12 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <a href="#" className="hover:text-[#2c66e2] transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-[#2c66e2] transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-[#2c66e2] transition-colors">
                  Contact Us
                </a>
              </div>
              <div className="text-center text-sm text-gray-600">
                <p>&copy; 2025 ContactLadder. All rights reserved.</p>
<parameter name="mt-1 italic text-gray-500">
                  Master your CRM, master your market.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
