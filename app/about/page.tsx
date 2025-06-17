import { Shield, Lightbulb, Users, GraduationCap } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section"

export const metadata = {
  title: "About Us - Tesah Capital Limited",
  description: "Learn about Tesah Capital Limited, your investment gateway to Africa since 2010.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Tesah Capital</h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Your trusted investment partner in Africa since 2010.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <img
                  src="/images/tesah-office-building.jpeg"
                  alt="Tesah Capital office building"
                  className="rounded-lg object-cover w-full h-auto"
                  width={600}
                  height={400}
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Our Story</h2>
                <p className="text-muted-foreground md:text-lg">
                  Tesah Capital Limited was incorporated in 2010 under the laws of Ghana to provide fund management
                  services to pension trustees, financial and non-financial institutions, corporates and individuals.
                </p>
                <p className="text-muted-foreground md:text-lg">
                  We are licensed by the Securities and Exchange Commission (SEC) as an Investment Advisor and Fund
                  Manager and registered by the National Pensions and Regulatory Authority (NPRA) as a Pension Fund
                  Manager.
                </p>
                <p className="text-muted-foreground md:text-lg">
                  As your investment Gateway to Africa, we have grown our capabilities to meet the needs of our clients
                  over time and offer alternative ways to achieve investment growth and capital preservation. Our
                  achievements and milestones since formation in 2010 continue to shape our business and we remain
                  steadfast in our commitment to protect and grow our clients' wealth and savings over the long term.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="values">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Core Values</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The principles that guide our operations and client relationships.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Shield className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Trust</h3>
                <p className="text-center text-muted-foreground">
                  We build lasting relationships based on integrity, transparency, and reliability in all our dealings.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Lightbulb className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Innovation</h3>
                <p className="text-center text-muted-foreground">
                  We continuously seek creative solutions and embrace new technologies to deliver superior investment
                  outcomes.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Customer Centricity</h3>
                <p className="text-center text-muted-foreground">
                  We place our clients at the heart of everything we do, tailoring our services to meet their unique
                  needs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <GraduationCap className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Knowledge</h3>
                <p className="text-center text-muted-foreground">
                  We leverage our deep expertise and continuous learning to make informed investment decisions for our
                  clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32" id="team">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Our Team</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Our dedicated teams work together to provide exceptional service and investment expertise.
              </p>
            </div>
            <div className="mx-auto max-w-5xl">
              <TeamSection />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
