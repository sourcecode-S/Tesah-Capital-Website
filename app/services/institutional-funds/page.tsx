import Link from "next/link"
import { ArrowRight, Check, Building, Briefcase, Users, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Institutional Funds - Tesah Capital Limited",
  description: "Tailor-made fund management services for institutions, corporates, churches, clubs and associations.",
}

export default function InstitutionalFundsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Institutional Funds</h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Tailor-made fund management services for institutions, corporates, churches, clubs and associations.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl mb-12">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-4">Our Institutional Fund Services</h2>
              <p className="text-muted-foreground">
                We offer tailor made fund management services for institutions, corporates, churches, clubs and
                associations to meet specific investment objectives with competitive returns. Our institutional fund
                management proposition includes the setup of the fund, investment policy statement design, templates for
                trust deeds; and fund administration services where applicable.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Provident Fund Management */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Provident Fund Management</CardTitle>
                  </div>
                  <CardDescription>Long-term financial growth for employees</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Provident Funds are unique schemes designed to encourage employees to develop a savings culture for
                    long-term financial growth and to supplement their incomes for major life projects and/or during
                    retirement.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Customized fund design</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Employee contribution management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Regulatory compliance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Regular performance reporting</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/contact">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Endowment Fund */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Endowment Fund</CardTitle>
                  </div>
                  <CardDescription>Sustainable funding for charitable institutions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Endowment Funds are investment portfolios established to provide sustainable funding for charitable
                    and nonprofit institutions such as churches, schools, communities, hospitals, old student
                    associations, etc.) to meet future projects.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Long-term capital preservation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Sustainable income generation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Customized investment policy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Transparent governance structure</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/contact">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Corporate Funds */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Corporate Funds</CardTitle>
                  </div>
                  <CardDescription>Optimized returns for company assets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Corporate funds are generally large funds, usually belonging to a company or an institution. When
                    corporate funds are well-managed, their institutions are able to enjoy additional inflows.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Strategic cash management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Liquidity optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Risk-adjusted returns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Customized reporting</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/contact">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Pension Funds */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Pension Funds</CardTitle>
                  </div>
                  <CardDescription>Retirement planning for organizations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Our pension desk offers pension fund management services to trustees, corporate investors for Tier 2
                    and Tier 3 pension schemes.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Regulatory compliant pension management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Tier 2 & Tier 3 scheme expertise</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Long-term investment strategy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Trustee support and education</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/contact">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
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
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Our Institutional Fund Process</h2>
                <p className="text-muted-foreground md:text-lg mb-6">
                  We follow a structured approach to institutional fund management, ensuring that each fund is tailored
                  to the specific needs and objectives of the institution.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Initial Consultation</h3>
                      <p className="text-muted-foreground">
                        We meet with key stakeholders to understand the institution's financial goals, risk tolerance,
                        and specific requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Fund Design & Documentation</h3>
                      <p className="text-muted-foreground">
                        We create a customized investment policy statement, trust deed templates, and other necessary
                        documentation.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Implementation</h3>
                      <p className="text-muted-foreground">
                        We set up the fund structure, establish governance processes, and begin investing according to
                        the agreed strategy.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium">Ongoing Management & Reporting</h3>
                      <p className="text-muted-foreground">
                        We actively manage the fund, provide regular performance reports, and make adjustments as needed
                        to meet objectives.
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="mt-8 bg-primary hover:bg-primary/90" asChild>
                  <Link href="/contact">
                    Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl transform rotate-3"></div>
                <div className="bg-background rounded-xl border shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Why Choose Our Institutional Fund Services</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-1 mt-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Expertise & Experience</h4>
                        <p className="text-muted-foreground">
                          Our team has extensive experience in managing institutional funds across various sectors.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-1 mt-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Customized Solutions</h4>
                        <p className="text-muted-foreground">
                          We create tailored fund structures and investment strategies based on your institution's
                          specific needs.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-1 mt-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Regulatory Compliance</h4>
                        <p className="text-muted-foreground">
                          We ensure that all funds are managed in compliance with relevant regulations and best
                          practices.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-1 mt-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Transparent Reporting</h4>
                        <p className="text-muted-foreground">
                          We provide clear, comprehensive reports on fund performance and activities.
                        </p>
                      </div>
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Optimize Your Institution's Funds?
              </h2>
              <p className="text-secondary-foreground/80 md:text-xl">
                Contact us today to learn how our institutional fund management services can help your organization
                achieve its financial objectives.
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
