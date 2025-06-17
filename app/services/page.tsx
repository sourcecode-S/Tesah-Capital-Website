import { BarChart3, ChevronRight, Shield, TrendingUp, Check, Users, LineChart, Building, Briefcase } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Services - Tesah Capital Limited",
  description: "Explore the investment and fund management services offered by Tesah Capital Limited.",
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Comprehensive investment solutions tailored to your financial goals.
              </p>
            </div>
          </div>
        </section>

        {/* Investment Accounts Section */}
        <section id="investment-accounts" className="w-full py-12 md:py-24 lg:py-32 border-b">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-primary text-sm mb-4">
                  <BarChart3 className="h-4 w-4 inline mr-1" />
                  Core Service
                </div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Investment Accounts</h2>
                <p className="text-muted-foreground md:text-lg mb-6">
                  We offer a range of investment accounts designed to meet your specific financial goals and
                  circumstances, whether you're looking for growth, income, or planning for the future.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-1 mt-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Tesah Growth Account</h3>
                      <p className="text-muted-foreground">
                        A flexible investment account designed to provide you with both income and growth on each cedi
                        investment with the potential to earn returns above interest rates on the prevailing Government
                        of Ghana instruments.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-1 mt-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Tesah International Account</h3>
                      <p className="text-muted-foreground">
                        An investment package for Ghanaians and other foreign nationals living abroad. It presents a
                        great opportunity to optimize returns on your funds through investments in Ghana.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-1 mt-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Tesah Junior Account</h3>
                      <p className="text-muted-foreground">
                        Tesah Junior Account (TJA) provides children and youth under the age of 18 an opportunity to
                        build a culture to invest and grow wealth for the future. It also provides parents or guardians
                        the opportunity to invest towards their child's education.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-1 mt-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Tesah Trust Account</h3>
                      <p className="text-muted-foreground">
                        This gives opportunity to resident and non-resident individuals to open an investment account in
                        trust for another person (resident and non-resident) other than a minor (below 18 years).
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90" asChild>
                  <Link href="/services/investment-accounts">
                    Learn More <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl transform rotate-3"></div>
                <div className="bg-background rounded-xl border shadow-lg p-6">
                  <div className="flex items-center gap-4 mb-6 border-b pb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <LineChart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Investment Account Benefits</h3>
                      <p className="text-sm text-muted-foreground">Key features of our investment accounts</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Competitive Returns</span>
                      <span className="text-primary font-bold">Above Market Rates</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Minimum Investment</span>
                      <span>Varies by Account Type</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Account Management</span>
                      <span>Professional & Personalized</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Access</span>
                      <span>Online & In-Person</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Reporting</span>
                      <span>Regular Statements & Updates</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wealth Management Section */}
        <section id="wealth-management" className="w-full py-12 md:py-24 lg:py-32 border-b bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="order-2 md:order-1">
                <div className="relative">
                  <div className="absolute -z-10 inset-0 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-3xl transform -rotate-3"></div>
                  <div className="bg-background rounded-xl border shadow-lg p-6">
                    <div className="flex items-center gap-4 mb-6 border-b pb-4">
                      <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Wealth Management Tiers</h3>
                        <p className="text-sm text-muted-foreground">Choose the tier that fits your needs</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-secondary shrink-0" />
                        <span>Prestige Tier: Personalized Investment Guidance</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-secondary shrink-0" />
                        <span>Gold Tier: Unique Investment Strategies</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-secondary shrink-0" />
                        <span>Platinum Tier: In-depth Lifestyle Goal Support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block rounded-lg bg-secondary/10 px-3 py-1 text-secondary text-sm mb-4">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Specialized Service
                </div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Wealth Management</h2>
                <p className="text-muted-foreground md:text-lg mb-6">
                  We help you grow and protect your wealth over time through a well-defined investment strategy that
                  suits specific individual financial objectives.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-secondary/10 p-1 mt-1">
                      <Check className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Prestige Tier Wealth Management</h3>
                      <p className="text-muted-foreground">
                        Get personalized investment guidance that is tailored to meet your financial needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-secondary/10 p-1 mt-1">
                      <Check className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Gold Tier Wealth Management</h3>
                      <p className="text-muted-foreground">
                        We define and implement unique investment strategies based on your preferences and risk
                        appetite.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-secondary/10 p-1 mt-1">
                      <Check className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Platinum Tier Wealth Management</h3>
                      <p className="text-muted-foreground">
                        We offer you in-depth support to help you manage your money and meet your lifestyle goal.
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="bg-secondary hover:bg-secondary/90" asChild>
                  <Link href="/services/wealth-management">
                    Learn More <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Institutional Funds Section */}
        <section id="institutional-funds" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-primary text-sm mb-4">
                  <TrendingUp className="h-4 w-4 inline mr-1" />
                  Institutional Service
                </div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Institutional Funds</h2>
                <p className="text-muted-foreground md:text-lg mb-6">
                  We offer tailor made fund management services for institutions, corporates, churches, clubs and
                  associations to meet specific investment objectives with competitive returns. Our institutional fund
                  management proposition includes the setup of the fund, investment policy statement design, templates
                  for trust deeds; and fund administration services where applicable.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-1 mt-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Provident Fund Management</h3>
                      <p className="text-muted-foreground">
                        Provident Funds are unique schemes designed to encourage employees to develop a savings culture
                        for long-term financial growth and to supplement their incomes for major life projects and/or
                        during retirement.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-1 mt-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Endowment Fund</h3>
                      <p className="text-muted-foreground">
                        Endowment Funds are investment portfolios established to provide sustainable funding for
                        charitable and nonprofit institutions such as churches, schools, communities, hospitals, old
                        student associations, etc.) to meet future projects.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-1 mt-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Corporate Funds</h3>
                      <p className="text-muted-foreground">
                        Corporate funds are generally large funds, usually belonging to a company or an institution.
                        When corporate funds are well-managed, their institutions are able to enjoy additional inflows.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-1 mt-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Pension Funds</h3>
                      <p className="text-muted-foreground">
                        Our pension desk offers pension fund management services to trustees, corporate investors for
                        Tier 2 and Tier 3 pension schemes.
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90" asChild>
                  <Link href="/services/institutional-funds">
                    Learn More <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl transform rotate-3"></div>
                <div className="bg-background rounded-xl border shadow-lg p-6">
                  <div className="flex items-center gap-4 mb-6 border-b pb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Institutional Services</h3>
                      <p className="text-sm text-muted-foreground">Comprehensive fund management solutions</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Fund Setup & Design</h4>
                      <p className="text-sm text-muted-foreground">
                        Complete setup of funds with customized investment policy statements and trust deed templates.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Fund Administration</h4>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive administration services including record-keeping, reporting, and compliance.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Investment Management</h4>
                      <p className="text-sm text-muted-foreground">
                        Professional management of fund assets to achieve specific investment objectives with
                        competitive returns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Investment Products</h2>
              <p className="mt-4 text-muted-foreground">
                Explore our range of investment products designed to meet different investment objectives and risk
                profiles.
              </p>
              <Button className="mt-8 bg-primary hover:bg-primary/90" size="lg" asChild>
                <Link href="/investment-products">View Our Investment Products</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary text-secondary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Start Your Investment Journey?
              </h2>
              <p className="text-secondary-foreground/80 md:text-xl">
                Contact us today to learn how we can help you achieve your financial goals.
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
