"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvestmentCalculator } from "@/components/calculators/investment-calculator"
import { RetirementCalculator } from "@/components/calculators/retirement-calculator"
import { Footer } from "@/components/footer"

export default function CalculatorsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Financial Calculators
              </h1>
              <p className="mt-4 text-white/80 md:text-xl">
                Use our calculators to plan your financial future and make informed investment decisions.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="investment" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto md:grid-cols-2">
                <TabsTrigger value="investment">Investment Calculator</TabsTrigger>
                <TabsTrigger value="retirement">Retirement Calculator</TabsTrigger>
              </TabsList>
              <TabsContent value="investment" className="mt-6">
                <InvestmentCalculator />
              </TabsContent>
              <TabsContent value="retirement" className="mt-6">
                <RetirementCalculator />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary text-secondary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Need Professional Financial Advice?</h2>
              <p className="text-secondary-foreground/80 md:text-xl">
                Our team of expert advisors is available to help you create a personalized investment plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <a
                  href="/contact"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Contact an Advisor
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
