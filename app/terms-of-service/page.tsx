import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Tesah Capital",
  description: "Terms of Service for Tesah Capital Limited",
}

export default function TermsOfServicePage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Terms of Service</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Terms and conditions for using Tesah Capital Limited's services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Authorized Use, Users and Online Account Access</h2>

              <h3 className="text-xl font-semibold">Personal use</h3>
              <p>
                This Site is intended only for your personal, non-commercial use, unless both parties have agreed
                otherwise in writing. This Site is intended for both residents and non-residents of Ghana. However,
                anyone who may access this site from locations outside of Ghana, are responsible for compliance with all
                applicable laws.
              </p>

              <h3 className="text-xl font-semibold">No solicitations</h3>
              <p>
                Nothing on this Site shall be considered a solicitation to buy or an offer to sell, or a recommendation
                for, a security, or any other product or service, to any person in any jurisdiction where such
                solicitation, offer, recommendation, purchase or sale would be unlawful under the laws of that
                jurisdiction.
              </p>

              <h3 className="text-xl font-semibold">
                No investment recommendations or professional advice; use of tools
              </h3>
              <p>
                This Site is not intended to provide any tax, legal, insurance or investment advice, and nothing on the
                Site should be construed as a recommendation, by us or any third party, to acquire or dispose off any
                investment or security, or to engage in any investment strategy or transaction. While certain tools
                available on the Site may provide general investment or financial analyses based upon your personalized
                input, such results are not to be construed as our providing investment recommendations or advice.
                Unless otherwise specified, you are solely responsible for determining whether any investment, security
                or strategy or any other product or service, is appropriate or suitable for you based on your investment
                objectives. Please seek the advice of a licensed Investment Advisor before you invest.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
