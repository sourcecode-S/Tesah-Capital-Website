import { Footer } from "@/components/footer"

export const metadata = {
  title: "Achievements - Tesah Capital Limited",
  description: "Explore the milestones and achievements of Tesah Capital Limited since 2010.",
}

export default function AchievementsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Our Achievements
              </h1>
              <p className="mt-4 text-white/80 md:text-xl">Milestones that have shaped our journey since 2010.</p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <div className="space-y-8">
                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-muted">
                  <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground -translate-x-1/2">
                    1
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">2010: Establishment</h3>
                    <p className="text-muted-foreground">
                      Tesah Capital Limited was incorporated under the laws of Ghana to provide fund management services
                      to pension trustees, financial and non-financial institutions, corporates and individuals.
                    </p>
                  </div>
                </div>
                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-muted">
                  <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground -translate-x-1/2">
                    2
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">2011: SEC License</h3>
                    <p className="text-muted-foreground">
                      Obtained license from the Securities and Exchange Commission (SEC) as an Investment Advisor and
                      Fund Manager, allowing us to officially begin operations.
                    </p>
                  </div>
                </div>
                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-muted">
                  <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground -translate-x-1/2">
                    3
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">2012: NPRA Registration</h3>
                    <p className="text-muted-foreground">
                      Registered by the National Pensions and Regulatory Authority (NPRA) as a Pension Fund Manager,
                      expanding our service offerings to include pension fund management.
                    </p>
                  </div>
                </div>
                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-muted">
                  <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground -translate-x-1/2">
                    4
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">2015: Expanded Service Offerings</h3>
                    <p className="text-muted-foreground">
                      Grew our capabilities to meet the needs of our clients over time and offered alternative ways to
                      achieve investment growth and capital preservation.
                    </p>
                  </div>
                </div>
                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-muted">
                  <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground -translate-x-1/2">
                    5
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">2018: Market Recognition</h3>
                    <p className="text-muted-foreground">
                      Received industry recognition for our investment performance and client service excellence.
                    </p>
                  </div>
                </div>
                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-muted">
                  <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground -translate-x-1/2">
                    6
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">2020: 10th Anniversary</h3>
                    <p className="text-muted-foreground">
                      Celebrated 10 years of successful operations, having established ourselves as a trusted investment
                      partner in Ghana and across Africa.
                    </p>
                  </div>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground -translate-x-1/2">
                    7
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Present Day: Continued Growth</h3>
                    <p className="text-muted-foreground">
                      Today, we continue to expand our services and client base, remaining steadfast in our commitment
                      to protect and grow our clients' wealth and savings over the long term.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <img
                  src="/images/tesah-awards-event.jpeg"
                  alt="Tesah Capital team presenting investment products at an awards event"
                  className="rounded-lg object-cover w-full"
                  width={600}
                  height={400}
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Awards & Recognition</h2>
                <p className="text-muted-foreground md:text-lg">
                  Our commitment to excellence has been recognized through various awards and accolades in the financial
                  services industry.
                </p>
                <ul className="space-y-4">
                  <li className="rounded-lg border bg-background p-4">
                    <h3 className="font-bold">Best Fund Manager</h3>
                    <p className="text-sm text-muted-foreground">Ghana Financial Services Excellence Awards, 2019</p>
                  </li>
                  <li className="rounded-lg border bg-background p-4">
                    <h3 className="font-bold">Excellence in Pension Fund Management</h3>
                    <p className="text-sm text-muted-foreground">West African Business Awards, 2018</p>
                  </li>
                  <li className="rounded-lg border bg-background p-4">
                    <h3 className="font-bold">Investment Advisory Firm of the Year</h3>
                    <p className="text-sm text-muted-foreground">African Banking Awards, 2017</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
