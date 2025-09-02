import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { LeadershipSection } from "@/components/leadership-section"
import { TeamSection } from "@/components/team-section"

export const metadata: Metadata = {
  title: "About Tesah Capital | Our Story & Leadership",
  description:
    "Learn about Tesah Capital's history, mission, and the experienced team that drives our success in investment management and financial services.",
}

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">About Tesah Capital</h1>
              <p className="text-xl md:text-2xl mb-8">
                Building wealth through strategic investment management and personalized financial solutions
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Story</h2>
              <div className="prose prose-lg mx-auto">
                <p className="text-lg text-gray-700 mb-6">
                  Founded with a vision to democratize access to sophisticated investment strategies, Tesah Capital has
                  grown from a boutique investment firm to a trusted partner for individuals and institutions seeking
                  superior financial outcomes.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Our journey began with a simple belief: that every investor deserves access to institutional-quality
                  investment management, regardless of their portfolio size. This philosophy continues to drive our
                  commitment to excellence and innovation in everything we do.
                </p>
                <p className="text-lg text-gray-700">
                  Today, we manage assets across multiple strategies, serving clients who value our disciplined
                  approach, transparent communication, and unwavering focus on long-term value creation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Mission & Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Integrity</h3>
                  <p className="text-gray-600">
                    We conduct business with the highest ethical standards, ensuring transparency and honesty in all our
                    interactions.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Excellence</h3>
                  <p className="text-gray-600">
                    We strive for excellence in investment management, client service, and operational efficiency to
                    deliver superior outcomes.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Partnership</h3>
                  <p className="text-gray-600">
                    We build long-term partnerships with our clients, understanding their unique needs and goals to
                    provide tailored solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <LeadershipSection />

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get to know the dedicated professionals who make Tesah Capital a trusted partner in your financial
                journey.
              </p>
            </div>
            <TeamSection />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
