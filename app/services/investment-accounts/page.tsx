import Link from "next/link"
import { ArrowRight, Check, ChevronRight, Coins, PiggyBank, School, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Investment Accounts - Tesah Capital Limited",
  description:
    "Explore our range of investment accounts designed to meet your specific financial goals and circumstances.",
}

export default function InvestmentAccountsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Investment Accounts</h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Tailored investment solutions to meet your specific financial goals and circumstances.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Our Investment Account Options</h2>
              <p className="mt-4 text-muted-foreground">
                We offer a range of investment accounts designed to meet your specific financial goals and
                circumstances, whether you're looking for growth, income, or planning for the future.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Tesah Growth Account */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Coins className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Tesah Growth Account</CardTitle>
                  </div>
                  <CardDescription>Flexible investment with competitive returns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    A flexible investment account designed to provide you with both income and growth on each cedi
                    investment with the potential to earn returns above interest rates on the prevailing Government of
                    Ghana instruments.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Competitive returns above market rates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Flexible investment terms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Professional fund management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Regular performance reporting</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/contact">
                      Open an Account <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Tesah International Account */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Tesah International Account</CardTitle>
                  </div>
                  <CardDescription>For Ghanaians and foreign nationals abroad</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    An investment package for Ghanaians and other foreign nationals living abroad. It presents a great
                    opportunity to optimize returns on your funds through investments in Ghana.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Remote account management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Currency conversion options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Access to Ghanaian investment opportunities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Dedicated international client support</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/contact">
                      Open an Account <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Tesah Junior Account */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <School className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Tesah Junior Account</CardTitle>
                  </div>
                  <CardDescription>Investment for children under 18</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Tesah Junior Account (TJA) provides children and youth under the age of 18 an opportunity to build a
                    culture to invest and grow wealth for the future. It also provides parents or guardians the
                    opportunity to invest towards their child's education.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Education-focused investment options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Long-term growth potential</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Parental/guardian control until maturity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Financial literacy resources for young investors</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/contact">
                      Open an Account <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Tesah Trust Account */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <PiggyBank className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Tesah Trust Account</CardTitle>
                  </div>
                  <CardDescription>Investment in trust for another person</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    This gives opportunity to resident and non-resident individuals to open an investment account in
                    trust for another person (resident and non-resident) other than a minor (below 18 years).
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Legal trust structure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Flexible beneficiary options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Customizable trust terms and conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Professional trust management</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/contact">
                      Open an Account <ArrowRight className="ml-2 h-4 w-4" />
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
                <h2 className="text-3xl font-bold tracking-tighter mb-4">How to Open an Account</h2>
                <p className="text-muted-foreground md:text-lg mb-6">
                  Opening an investment account with Tesah Capital is simple and straightforward. Our team will guide
                  you through every step of the process.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Complete Application Form</h3>
                      <p className="text-muted-foreground">
                        Fill out our application form with your personal details and investment preferences.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Provide Required Documentation</h3>
                      <p className="text-muted-foreground">
                        Submit identification documents and proof of address as required.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Initial Deposit</h3>
                      <p className="text-muted-foreground">
                        Make your initial investment deposit to activate your account.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium">Account Activation</h3>
                      <p className="text-muted-foreground">
                        Your account will be activated and you'll receive access to our client portal.
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="mt-8 bg-primary hover:bg-primary/90" asChild>
                  <Link href="/contact">
                    Contact Us to Get Started <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl transform rotate-3"></div>
                <div className="bg-background rounded-xl border shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h4 className="font-medium mb-2">What is the minimum investment amount?</h4>
                      <p className="text-muted-foreground">
                        Minimum investment amounts vary by account type, starting from as low as GH₵1,000 for some
                        accounts.
                      </p>
                    </div>
                    <div className="border-b pb-4">
                      <h4 className="font-medium mb-2">How often will I receive statements?</h4>
                      <p className="text-muted-foreground">
                        We provide monthly statements and quarterly comprehensive performance reports.
                      </p>
                    </div>
                    <div className="border-b pb-4">
                      <h4 className="font-medium mb-2">Can I withdraw my funds before maturity?</h4>
                      <p className="text-muted-foreground">
                        Yes, most accounts allow for early withdrawals, though some may have notice periods or early
                        withdrawal fees.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">How are my investments managed?</h4>
                      <p className="text-muted-foreground">
                        Your investments are professionally managed by our team of experienced fund managers according
                        to your risk profile and investment objectives.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary text-secondary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Start Investing?</h2>
              <p className="text-secondary-foreground/80 md:text-xl">
                Contact us today to open an investment account and begin your journey to financial growth.
              </p>
              <Button size="lg" className="mt-4 bg-primary hover:bg-primary/90" asChild>
                <Link href="/contact">Contact Us Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
