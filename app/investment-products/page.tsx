import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { InvestmentProducts } from "@/components/investment-products"

export const metadata: Metadata = {
  title: "Investment Products | Tesah Capital",
  description:
    "Explore Tesah Capital's diverse range of investment products including mutual funds, ETFs, bonds, and alternative investments designed to meet your financial goals.",
}

export default function InvestmentProductsPage() {
  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Investment Products</h1>
              <p className="text-xl md:text-2xl mb-8">
                Discover our comprehensive range of investment solutions designed to help you build wealth and achieve
                your financial objectives
              </p>
            </div>
          </div>
        </section>

        {/* Investment Products Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Investment Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From traditional investments to alternative strategies, we offer a diverse portfolio of products to meet
                various risk profiles and investment horizons.
              </p>
            </div>
            <InvestmentProducts />
          </div>
        </section>

        {/* Investment Philosophy Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Investment Philosophy</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our investment approach is built on fundamental principles that guide our decision-making process and
                  risk management strategies.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg p-8 shadow-lg">
                  <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">Research-Driven</h3>
                  <p className="text-gray-600 text-center">
                    Our investment decisions are backed by rigorous research and analysis, ensuring we identify the best
                    opportunities while managing risks effectively.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-8 shadow-lg">
                  <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">Long-Term Focus</h3>
                  <p className="text-gray-600 text-center">
                    We believe in the power of long-term investing, focusing on sustainable growth and value creation
                    over extended time horizons.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-8 shadow-lg">
                  <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">Risk Management</h3>
                  <p className="text-gray-600 text-center">
                    Comprehensive risk management is at the core of our investment process, protecting capital while
                    pursuing attractive returns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Track Record of Success</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our investment products have consistently delivered strong performance across various market
                  conditions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <div className="text-gray-600">Years of Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">$2B+</div>
                  <div className="text-gray-600">Assets Under Management</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-gray-600">Satisfied Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">12%</div>
                  <div className="text-gray-600">Average Annual Return</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Investment Journey</h2>
              <p className="text-xl mb-8">
                Ready to explore our investment products? Contact us today to discuss which solutions align with your
                financial goals.
              </p>
              <div className="space-x-4">
                <a
                  href="/contact"
                  className="inline-block bg-white text-primary px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium"
                >
                  Get Started
                </a>
                <a
                  href="/resources"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-primary transition-colors font-medium"
                >
                  Download Brochure
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
