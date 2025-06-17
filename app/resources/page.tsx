import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ResourcesSection } from "@/components/resources-section"
import { FAQSection } from "@/components/faq-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Resources - Tesah Capital Limited",
  description: "Access investment resources, forms, and frequently asked questions from Tesah Capital Limited.",
}

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Resources</h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Access investment forms, fact sheets, market reports, and educational resources to help you make
                informed investment decisions.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div id="forms">
                <h2 className="text-3xl font-bold tracking-tighter mb-6">Investment Resources</h2>
                <p className="text-muted-foreground mb-8">
                  Download important forms, fact sheets, and market reports to help you with your investment journey.
                </p>
                <ResourcesSection />
              </div>
              <div id="faq">
                <h2 className="text-3xl font-bold tracking-tighter mb-6">Frequently Asked Questions</h2>
                <p className="text-muted-foreground mb-8">
                  Find answers to common questions about our investment products and services.
                </p>
                <FAQSection />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Need More Information?</h2>
              <p className="text-primary-foreground/80 md:text-xl">
                Our team is available to answer any questions you may have about our investment products and services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/client-portal">Client Portal</Link>
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
