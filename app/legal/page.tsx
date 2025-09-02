import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Legal Information | Tesah Capital",
  description: "Legal information, terms, privacy policy, and disclaimers for Tesah Capital Limited",
}

export default function LegalPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Legal Information
              </h1>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Important legal information regarding the use of Tesah Capital Limited's services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <div className="space-y-16">
            {/* Privacy Policy Section */}
            <div id="privacy-policy" className="space-y-8 scroll-mt-24">
              <h2 className="text-3xl font-bold tracking-tighter border-b pb-4">Privacy Policy</h2>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Authorized Use, Users and Online Account Access</h3>

                  <h4 className="text-xl font-semibold">Personal use</h4>
                  <p>
                    This Site is intended only for your personal, non-commercial use, unless both parties have agreed
                    otherwise in writing. This Site is intended for both residents and non-residents of Ghana. However,
                    anyone who may access this site from locations outside of Ghana, are responsible for compliance with
                    all applicable laws.
                  </p>

                  <h4 className="text-xl font-semibold">No solicitations</h4>
                  <p>
                    Nothing on this Site shall be considered a solicitation to buy or an offer to sell, or a
                    recommendation for, a security, or any other product or service, to any person in any jurisdiction
                    where such solicitation, offer, recommendation, purchase or sale would be unlawful under the laws of
                    that jurisdiction.
                  </p>

                  <h4 className="text-xl font-semibold">
                    No investment recommendations or professional advice; use of tools
                  </h4>
                  <p>
                    This Site is not intended to provide any tax, legal, insurance or investment advice, and nothing on
                    the Site should be construed as a recommendation, by us or any third party, to acquire or dispose
                    off any investment or security, or to engage in any investment strategy or transaction. While
                    certain tools available on the Site may provide general investment or financial analyses based upon
                    your personalized input, such results are not to be construed as our providing investment
                    recommendations or advice. Unless otherwise specified, you are solely responsible for determining
                    whether any investment, security or strategy or any other product or service, is appropriate or
                    suitable for you based on your investment objectives. Please seek the advice of a licensed
                    Investment Advisor before you invest.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms of Service Section */}
            <div id="terms-of-service" className="space-y-8 scroll-mt-24">
              <h2 className="text-3xl font-bold tracking-tighter border-b pb-4">Terms of Service</h2>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Authorized Use, Users and Online Account Access</h3>

                  <h4 className="text-xl font-semibold">Personal use</h4>
                  <p>
                    This Site is intended only for your personal, non-commercial use, unless both parties have agreed
                    otherwise in writing. This Site is intended for both residents and non-residents of Ghana. However,
                    anyone who may access this site from locations outside of Ghana, are responsible for compliance with
                    all applicable laws.
                  </p>

                  <h4 className="text-xl font-semibold">No solicitations</h4>
                  <p>
                    Nothing on this Site shall be considered a solicitation to buy or an offer to sell, or a
                    recommendation for, a security, or any other product or service, to any person in any jurisdiction
                    where such solicitation, offer, recommendation, purchase or sale would be unlawful under the laws of
                    that jurisdiction.
                  </p>

                  <h4 className="text-xl font-semibold">
                    No investment recommendations or professional advice; use of tools
                  </h4>
                  <p>
                    This Site is not intended to provide any tax, legal, insurance or investment advice, and nothing on
                    the Site should be construed as a recommendation, by us or any third party, to acquire or dispose
                    off any investment or security, or to engage in any investment strategy or transaction. While
                    certain tools available on the Site may provide general investment or financial analyses based upon
                    your personalized input, such results are not to be construed as our providing investment
                    recommendations or advice. Unless otherwise specified, you are solely responsible for determining
                    whether any investment, security or strategy or any other product or service, is appropriate or
                    suitable for you based on your investment objectives. Please seek the advice of a licensed
                    Investment Advisor before you invest.
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer Section */}
            <div id="disclaimer" className="space-y-8 scroll-mt-24">
              <h2 className="text-3xl font-bold tracking-tighter border-b pb-4">Disclaimer</h2>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Disclaimer of Warranties</h3>
                  <p>
                    You acknowledge and agree that this site is provided on an "as is" and "as available" basis. None of
                    Tesah Capital Limited (Tesah), its affiliates or their respective officers, directors, employees or
                    agents guarantees the timeliness, accuracy, reliability, completeness, or usefulness of any of the
                    site. None of the Tesah parties warrant that this site or downloads will meet your needs or
                    expectations, or be uninterrupted, secure or error free or that this site, its server or any files
                    available for downloading through this site are free of computer viruses or other harmful elements.
                    Tesah have no responsibility for viruses or any other damage that may be caused to you as a result
                    of using this site. Periods of volatile or unusual market activity, in particular, may affect
                    systems availability or response time.
                  </p>

                  <p>
                    You expressly agree that the entire risk as to the quality and performance of this site and the
                    timeliness, usefulness, accuracy or completeness of the site is assumed solely by you. Tesah and its
                    affiliated parties or agents hereby specifically disclaim any representations, endorsements,
                    guarantees, or warranties, express or implied, regarding this site, including without limitation,
                    the implied warranties of merchantability and fitness for a particular purpose and non-infringement
                    of third-party rights. Without limiting the generality of the foregoing, all of the Tesah parties
                    disclaim any warranties with respect to any results that may be obtained from the use of this site.
                  </p>

                  <h4 className="text-xl font-semibold">Connectivity</h4>
                  <p>
                    You agree that you are responsible for the means you use to access the Site and understand that your
                    hardware, software, the Internet, your Internet Service Provider, and other third parties involved
                    in connecting you to our Site may not perform as intended or desired.
                  </p>

                  <h4 className="text-xl font-semibold">Third party damages</h4>
                  <p>
                    Tesah also disclaims responsibility for damages third parties may cause to you through the use of
                    this Site, whether intentional or unintentional. For example, you understand that hackers could
                    breach our security procedures and that Tesah will not be responsible for any related damages.
                  </p>

                  <h4 className="text-xl font-semibold">Content and Data</h4>
                  <p>
                    Reasonable precautions have been taken to ensure that Site Content is complete and accurate.
                    However, due to the nature of information delivery technology and the necessity of using multiple
                    data sources, including Third Party Content, we are unable to assure the accuracy of the data you
                    access through this Site. Site Content is presented only as of the date published or indicated and
                    may be superseded by subsequent market events or other reasons. Tesah has no duty to update this
                    Site or any Site Content. We shall not be liable to you or any third party for any damages arising
                    from any actions or investment decisions taken by you based on the accuracy of the data presented
                    through this site.
                  </p>

                  <p>
                    Speculation or stated beliefs about future events, such as market and economic conditions, company
                    or security performance, upcoming product offerings or other projections are "forward-looking
                    statements". These forward-looking statements represent the beliefs of the speaker/author and do not
                    necessarily represent the views of Tesah or any of its parties. General business, market, economic
                    and political conditions could cause actual results to differ materially from what the
                    speaker/author presently anticipates or projects.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Terms and Conditions for Online Services</h3>

                  <h4 className="text-xl font-semibold">Registration</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Personal and account details provided should be accurate and valid. Accounts created are subject
                      to vetting by the staff of Tesah and can be revoked if found to be fictitious. Names, emails and
                      phone numbers provided should match with our records.
                    </li>
                    <li>
                      By registering for the Online top-up service, you will be able to make deposits into any Tesah
                      Investment Solutions, even if you have not previously done so.
                    </li>
                    <li>
                      Tesah will not be responsible for any loss or delay occasioned by any error on the part of the
                      client in the process of inputting his/her personal or contact details.
                    </li>
                  </ul>

                  <h4 className="text-xl font-semibold">Top up</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      A transfer fee of 1.5% will be charged on the value of all transactions made using mobile money.
                    </li>
                    <li>
                      A transfer fee of 2.3% will be charged on the value of all transactions made using debit card.
                    </li>
                    <li>
                      Tesah will not be responsible for any loss or delay occasioned by any error on the part of the
                      client in the process of inputting his/her investment instructions.
                    </li>
                    <li>
                      All top ups will be deemed successful SUBJECT to validation of the card or mobile number used via
                      the corresponding bank or service provider. Should a card or mobile number be successfully
                      validated and thereby authorized, the deposit may take up to 72 hours to reflect in client's Tesah
                      Investment account. Clients whose transactions are not successfully validated will receive an
                      email from Tesah advising them to contact their card issuers or service providers for transaction
                      authentication.
                    </li>
                    <li>
                      Should a transaction be successful and then subsequently is determined to be fraudulent, Tesah
                      will immediately place a lien on the client's account until the transaction is successfully
                      validated or otherwise.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Complaints Section */}
            <div id="complaints" className="space-y-8 scroll-mt-24">
              <h2 className="text-3xl font-bold tracking-tighter border-b pb-4">Complaints</h2>
              <div className="space-y-4">
                <p>
                  Tesah Capital Limited (Tesah) is committed to treating you with respect and consideration in all
                  dealings. From time to time however, a misunderstanding or error may occur regarding matters of
                  privacy. In such circumstances, Tesah will act diligently to resolve the problem and will contact you
                  as soon as possible within 24 hours of our receipt of your complaint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
