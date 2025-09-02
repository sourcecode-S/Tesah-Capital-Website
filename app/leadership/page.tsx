"use client"

import { Footer } from "@/components/footer"
import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function LeadershipPage() {
  const leadershipData = [
    {
      name: "Eric Nana Otoo",
      title: "Board Chairman",
      shortBio:
        "Over 15 years of experience in investment banking, consulting and private equity with Goldman Sachs, Mckinsey and Duet.",
      fullBio: `Mr. Otoo has about 15 years of experience in investment banking, consulting and private equity, having worked with Goldman Sachs, Mckinsey and Duet, among others.

His experience in finance was honed at Goldman Sachs & Co.'s New York City office from 2007, where his responsibilities included coordinating and managing origination, valuation, acquisition and due diligence for investment transactions. In 2006 and later between 2010 and 2013, he worked as a strategy consultant at McKinsey's New York City office, where he worked with senior executives and boards across different industries on various strategic, finance and operational issues. His work involved transformation programs at some of the major US banks and the broader financial services sector.

Mr. Otoo received his Master of Business Administration (MBA) degree from Harvard Business School as a Jack Kent Cooke Scholar. He received his certification as a Chartered Financial Analyst (CFA) in 2005, and as a Certified Management Accountant (CMA) and a Certified Financial Manager (CFM) in 2004. Mr. Otoo attended Grinnell College in the US, for his undergraduate studies where he received majors in Economics and Computer Science with Phi Beta Kappa honors.`,
      image: "/images/leadership/Mr_Eric_Nana_Otoo.jpg",
      color: "primary",
    },
    {
      name: "Eugenia Basheer",
      title: "Managing Director",
      shortBio:
        "Over 12 years of experience in Ghanaian capital and money markets with expertise in corporate finance and investment analysis.",
      fullBio: `Eugenia has over 12 years of experience in the Ghanaian capital and money markets.

She has vast experience in corporate finance, investment analysis, money market transactions, and customer service.

One of her great achievements in asset management services was that under her leadership, over 90% of pension funds under management outperformed their benchmark returns in 2013 and 2014.

Eugenia holds an MBA in Business Administration (MIS option) and BA (Economics) from the University of Ghana.`,
      image: "/images/leadership/Madam_Eugenia.jpg",
      color: "secondary",
    },
    {
      name: "Mensah Seneadza",
      title: "Non-Executive Director",
      shortBio:
        "Nearly 18 years of management experience in consumer goods, telecommunications and broadcast media across Africa.",
      fullBio: `Mr. Mensah Seneadza brings to the board, close to 18 years' experience in management in the fast-moving consumer goods market, telecommunications and broadcast media. He brings to bear best practices and expertise in marketing and business development from leading multinationals like Unilever, Vodafone and Coca-Cola International. He is currently Country Manager, Ghana and business head, West Africa, for Schweppes International Ltd, owners of the Lucozade and Ribena brands.

Mensah's work has spanned across many African countries including Nigeria, Kenya, Liberia, Sierra Leone, Cape Verde and The Gambia, just to mention a few.

Mensah plays advisory and non-executive director roles for a number of start-up firms in the agribusiness, human capital and logistics space. He is a council member of Regentropfen College of Applied Sciences and plays leadership roles in a number of reputable social, faith-based and not-for-profit organizations.

He is passionate about turnaround strategy development and execution, people development and brand building.

Mensah has a Bachelors' degree in Geography and Resource Development from the University of Ghana, and an EMBA in marketing from the University of Ghana Business School.`,
      image: "/images/leadership/Mr_Mensah.jpg",
      color: "primary",
    },
    {
      name: "Kwabena Boamah",
      title: "Non-Executive Director",
      shortBio:
        "15 years of international business experience across financial, information, technology and banking sectors in Emerging Markets.",
      fullBio: `Mr. Boamah is a senior executive with 15 years of international business experience across the financial, information, technology and banking sectors. His specialism is focused within Emerging Markets, driving sales of complex solutions and sales strategy.

As the Regional Director - West Africa for Temenos, Mr. Boamah is responsible for growing P&L and driving a team of experts, which includes partner organizations to win new business opportunities in West Africa.

Mr. Boamah's business has focused on exponentially growing its footprint in the financial inclusion space via payment services, telcos, retail banks, governments and World Bank-funded projects.

He serves on the board of Signature Kitchens (private) Ltd, a Ghanaian corporation principally engaged in the business of ultra-high-end living space design, manufacture and fitment in Ghana's capital.

He holds an MSc in Financial Markets & Derivatives from London Guildhall University, and a Bloomberg Professional Product Certification from Bloomberg University.`,
      image: "/images/leadership/Mr_Boamah.jpg",
      color: "secondary",
    },
    {
      name: "Dr. Justice Duffu Yankson",
      title: "Non-Executive Director",
      shortBio:
        "Experienced in fund management with expertise in pension funds, investment, corporate law and governance.",
      fullBio: `Dr. Yankson has vast experience in fund management (especially pension fund management) as well as investment, corporate law and governance.

He is a Representative of Trades Union Congress/Organised Labour on the board of NPRA.

Dr. Justice Duffu Yankson is a practicing Medical Doctor and Lawyer (Attorney). He also holds an MBA (Finance) from the University of Ghana Business School.

Dr Yankson is a product of St. Augustine's College, Cape Coast, University of Ghana, Legon and the Ghana School of Law.`,
      image: "/images/leadership/Dr_Yankson.jpg",
      color: "primary",
    },
  ]

  const [openDialogs, setOpenDialogs] = useState(leadershipData.map(() => false))

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Our Leadership Team</h1>
                <p className="max-w-[900px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Meet the experienced professionals who guide our vision and strategy
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Profiles */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
              {leadershipData.map((leader, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div
                    className="w-80 h-80 rounded-full overflow-hidden mb-8 cursor-pointer transition-transform hover:scale-105"
                    onClick={() => {
                      const newOpenDialogs = [...openDialogs]
                      newOpenDialogs[index] = true
                      setOpenDialogs(newOpenDialogs)
                    }}
                  >
                    <Image
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      width={256}
                      height={256}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-3xl font-bold">{leader.name}</h2>
                  <p className={`text-${leader.color} font-medium text-xl`}>{leader.title}</p>
                  <p className="mt-3 text-lg text-muted-foreground">{leader.shortBio}</p>
                  <Button
                    variant="ghost"
                    className="mt-5 text-lg px-6 py-2"
                    onClick={() => {
                      const newOpenDialogs = [...openDialogs]
                      newOpenDialogs[index] = true
                      setOpenDialogs(newOpenDialogs)
                    }}
                  >
                    View Full Profile
                  </Button>

                  <Dialog
                    open={openDialogs[index]}
                    onOpenChange={(open) => {
                      const newOpenDialogs = [...openDialogs]
                      newOpenDialogs[index] = open
                      setOpenDialogs(newOpenDialogs)
                    }}
                  >
                    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-4xl">{leader.name}</DialogTitle>
                        <DialogDescription className={`text-${leader.color} font-medium text-2xl`}>
                          {leader.title}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col md:flex-row gap-10 mt-8">
                        <div className="md:w-1/3 flex-shrink-0">
                          <Image
                            src={leader.image || "/placeholder.svg"}
                            alt={leader.name}
                            width={500}
                            height={500}
                            className="rounded-lg w-full h-auto object-cover"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <div className="whitespace-pre-line text-left text-xl leading-relaxed">{leader.fullBio}</div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
