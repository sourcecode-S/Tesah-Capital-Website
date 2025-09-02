import Link from "next/link"
import { ArrowRight, Check, DollarSign, PieChart, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Investment Accounts - Tesah Capital Limited",
  description: "Open a personalized investment account with Tesah Capital and start building your wealth today.",
}

export default function InvestmentAccountsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Investment Accounts</h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Open a personalized investment account and start building your wealth with professional guidance.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl mb-12">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-4">
                Your Gateway to Investment Success
              </h2>
              <p className="text-muted-foreground">
                Our investment accounts are designed to provide you with access to our professional fund management
                services, whether you're just starting your investment journey or looking to diversify your existing
                portfolio.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Individual Investment Account */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Individual Account</CardTitle>
                  </div>
                  <CardDescription>Perfect for personal wealth building</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Start your investment journey with our individual investment account, designed for personal wealth
                    accumulation and financial goal achievement.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Minimum investment from GH₵1,000</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Access to all investment products</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Online account management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Regular performance reports</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/client-portal">
                      Open Account <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Joint Investment Account */}
              <Card className="border-secondary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-secondary/10">
                      <PieChart className="h-5 w-5 text-secondary" />
                    </div>
                    <CardTitle>Joint Account</CardTitle>
                  </div>
                  <CardDescription>Ideal for couples and families</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Build wealth together with our joint investment account, perfect for couples planning for their
                    future or families saving for common goals.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Shared account management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Multiple signatories options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Combined investment power</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Flexible withdrawal terms</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-secondary hover:bg-secondary/90" asChild>
                    <Link href="/client-portal">
                      Open Account <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Corporate Investment Account */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Corporate Account</CardTitle>
                  </div>
                  <CardDescription>For businesses and organizations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Optimize your corporate cash management and grow your business reserves with our corporate
                    investment account solutions.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Higher investment minimums</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Dedicated relationship manager</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Customized reporting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Board resolution support</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/contact">
                      Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Why Choose Our Investment Accounts?</h2>
                <p className="text-muted-foreground md:text-lg mb-6">
                  Our investment accounts provide you with professional fund management, transparent reporting, and
                  access to carefully selected investment opportunities.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Regulatory Protection</h3>
                      <p className="text-muted-foreground">
                        Your investments are protected under SEC and NPRA regulations, ensuring the highest standards of
                        security and compliance.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 p-2 rounded-lg shrink-0">
                      <TrendingUp className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Professional Management</h3>
                      <p className="text-muted-foreground">
                        Our experienced fund managers actively monitor and optimize your investments to maximize returns
                        while managing risk.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                      <PieChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Diversified Portfolio</h3>
                      <p className="text-muted-foreground">
                        Access to a range of investment products allows you to build a diversified portfolio suited to
                        your risk profile and goals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/placeholder.svg?height=500&width=500"
                    alt="Investment Account Benefits"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">How to Open Your Account</h2>
              <p className="text-muted-foreground md:text-lg">
                Getting started with your investment account is simple and straightforward.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Complete Application</h3>
                <p className="text-muted-foreground">
                  Fill out our online application form or visit our office to complete the account opening process.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Submit Documents</h3>
                <p className="text-muted-foreground">
                  Provide the required identification and supporting documents for account verification.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Start Investing</h3>
                <p className="text-muted-foreground">
                  Make your initial deposit and begin your investment journey with professional guidance.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/client-portal">
                  Open Your Account Today <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary text-secondary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Start Investing?</h2>
              <p className="text-secondary-foreground/80 md:text-xl">
                Join thousands of investors who trust Tesah Capital to grow their wealth. Open your investment account
                today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <Link href="/client-portal">Open Account</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/contact">Speak to an Advisor</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
