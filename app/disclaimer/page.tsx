import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Disclaimer | Tesah Capital",
  description: "Disclaimer for Tesah Capital Limited",
}

export default function DisclaimerPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Disclaimer</h1>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Important disclaimers regarding the use of Tesah Capital Limited's services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Disclaimer of Warranties</h2>
              <p>
                You acknowledge and agree that this site is provided on an "as is" and "as available" basis. None of
                Tesah Capital Limited (Tesah), its affiliates or their respective officers, directors, employees or
                agents guarantees the timeliness, accuracy, reliability, completeness, or usefulness of any of the site.
                None of the Tesah parties warrant that this site or downloads will meet your needs or expectations, or
                be uninterrupted, secure or error free or that this site, its server or any files available for
                downloading through this site are free of computer viruses or other harmful elements. Tesah have no
                responsibility for viruses or any other damage that may be caused to you as a result of using this site.
                Periods of volatile or unusual market activity, in particular, may affect systems availability or
                response time.
              </p>

              <p>
                You expressly agree that the entire risk as to the quality and performance of this site and the
                timeliness, usefulness, accuracy or completeness of the site is assumed solely by you. Tesah and its
                affiliated parties or agents hereby specifically disclaim any representations, endorsements, guarantees,
                or warranties, express or implied, regarding this site, including without limitation, the implied
                warranties of merchantability and fitness for a particular purpose and non-infringement of third-party
                rights. Without limiting the generality of the foregoing, all of the Tesah parties disclaim any
                warranties with respect to any results that may be obtained from the use of this site.
              </p>

              <h3 className="text-xl font-semibold">Connectivity</h3>
              <p>
                You agree that you are responsible for the means you use to access the Site and understand that your
                hardware, software, the Internet, your Internet Service Provider, and other third parties involved in
                connecting you to our Site may not perform as intended or desired.
              </p>

              <h3 className="text-xl font-semibold">Third party damages</h3>
              <p>
                Tesah also disclaims responsibility for damages third parties may cause to you through the use of this
                Site, whether intentional or unintentional. For example, you understand that hackers could breach our
                security procedures and that Tesah will not be responsible for any related damages.
              </p>

              <h3 className="text-xl font-semibold">Content and Data</h3>
              <p>
                Reasonable precautions have been taken to ensure that Site Content is complete and accurate. However,
                due to the nature of information delivery technology and the necessity of using multiple data sources,
                including Third Party Content, we are unable to assure the accuracy of the data you access through this
                Site. Site Content is presented only as of the date published or indicated and may be superseded by
                subsequent market events or other reasons. Tesah has no duty to update this Site or any Site Content. We
                shall not be liable to you or any third party for any damages arising from any actions or investment
                decisions taken by you based on the accuracy of the data presented through this site.
              </p>

              <p>
                Speculation or stated beliefs about future events, such as market and economic conditions, company or
                security performance, upcoming product offerings or other projections are "forward-looking statements".
                These forward-looking statements represent the beliefs of the speaker/author and do not necessarily
                represent the views of Tesah or any of its parties. General business, market, economic and political
                conditions could cause actual results to differ materially from what the speaker/author presently
                anticipates or projects.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Terms and Conditions for Online Services</h2>

              <h3 className="text-xl font-semibold">Registration</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Personal and account details provided should be accurate and valid. Accounts created are subject to
                  vetting by the staff of Tesah and can be revoked if found to be fictitious. Names, emails and phone
                  numbers provided should match with our records.
                </li>
                <li>
                  By registering for the Online top-up service, you will be able to make deposits into any Tesah
                  Investment Solutions, even if you have not previously done so.
                </li>
                <li>
                  Tesah will not be responsible for any loss or delay occasioned by any error on the part of the client
                  in the process of inputting his/her personal or contact details.
                </li>
              </ul>

              <h3 className="text-xl font-semibold">Top up</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  A transfer fee of 1.5% will be charged on the value of all transactions made using mobile money.
                </li>
                <li>A transfer fee of 2.3% will be charged on the value of all transactions made using debit card.</li>
                <li>
                  Tesah will not be responsible for any loss or delay occasioned by any error on the part of the client
                  in the process of inputting his/her investment instructions.
                </li>
                <li>
                  All top ups will be deemed successful SUBJECT to validation of the card or mobile number used via the
                  corresponding bank or service provider. Should a card or mobile number be successfully validated and
                  thereby authorized, the deposit may take up to 72 hours to reflect in client's Tesah Investment
                  account. Clients whose transactions are not successfully validated will receive an email from Tesah
                  advising them to contact their card issuers or service providers for transaction authentication.
                </li>
                <li>
                  Should a transaction be successful and then subsequently is determined to be fraudulent, Tesah will
                  immediately place a lien on the client's account until the transaction is successfully validated or
                  otherwise.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
