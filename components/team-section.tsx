"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TeamInfo {
  name: string
  description: string
  fullDescription: string
  image: string
  head: {
    name: string
    title: string
    image: string
    bio: string
  }
}

export function TeamSection() {
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null)

  const teamData: TeamInfo[] = [
    {
      name: "Client Service",
      description: "Dedicated to providing exceptional service and support to all our clients.",
      fullDescription:
        "Our Client Service team is the primary point of contact for all client inquiries and requests. They work tirelessly to ensure that our clients receive prompt, professional, and personalized service at every touchpoint. The team handles account openings, transaction processing, statement delivery, and general inquiries. With a deep understanding of our products and services, they provide clear and accurate information to help clients make informed investment decisions. Client satisfaction is their top priority, and they continuously seek ways to enhance the client experience through proactive communication and responsive service.",
      image: "/placeholder.svg?height=300&width=800&text=Client+Service+Team",
      head: {
        name: "Eleanor Neequaye",
        title: "Head of Client Service",
        image: "/images/team/eleanor.jpg",
        bio: 'Role: Portfolio Manager & Investment Advisor, Tesah Capital Limited (since October 2017 — 7 years 9 months). At Tesah Capital: Featured in the 2021 "Tesah Future Fund" annual report as Portfolio Manager based in Accra\'s Trust Towers.',
      },
    },
    {
      name: "Accounts",
      description: "Managing financial records and ensuring accuracy in all transactions.",
      fullDescription:
        "The Accounts team is responsible for maintaining the financial integrity of the company and client portfolios. They handle all accounting functions, including transaction processing, reconciliations, financial reporting, and audit support. This team ensures that all client transactions are accurately recorded and that financial statements reflect the true position of investments. They work closely with external auditors and regulatory bodies to ensure compliance with accounting standards and reporting requirements. Their meticulous attention to detail and commitment to accuracy provides the foundation for the trust our clients place in us.",
      image: "/placeholder.svg?height=300&width=800&text=Accounts+Team",
      head: {
        name: "Okofo (Arhin) Osei-Donkor",
        title: "Head of Finance & Administration",
        image: "/images/team/okofo.jpeg",
        bio: "Role: Head of Finance & Administration, Tesah Capital Limited (since January 2021). Previous Experience: Served as Accounts & Finance Manager at NDK Capital Limited from September 2016 before joining Tesah Capital. Tesah Capital is a Ghana‑based asset management firm founded in 2010, with 200–500 employees.",
      },
    },
    {
      name: "Investments",
      description: "Expert portfolio managers focused on delivering optimal investment returns.",
      fullDescription:
        "Our Investments team consists of experienced portfolio managers and analysts who are responsible for implementing investment strategies and managing client portfolios. They conduct thorough market analysis, identify investment opportunities, and make strategic asset allocation decisions to optimize returns while managing risk. The team follows a disciplined investment process, combining fundamental research with quantitative analysis to inform their decisions. They continuously monitor portfolio performance and make adjustments as market conditions change. With their deep knowledge of African markets and global economic trends, they work to deliver consistent, competitive returns for our clients.",
      image: "/placeholder.svg?height=300&width=800&text=Investment+Team",
      head: {
        name: "Kenneth Annoh",
        title: "Head of Pensions & Institutions",
        image: "/images/team/kenneth-tesah.png",
        bio: "Role: Head of Pensions & Institutions, Tesah Capital Limited. Expertise & Education: Specializes in investment banking, wealth management, and business strategy, with educational ties to the University of Ghana. Industry Role: Listed as the contact person for Tesah Capital in Ghana's NPRA register, underscoring his regulatory responsibilities within pension fund management.",
      },
    },
    {
      name: "Research",
      description: "Analyzing market trends and opportunities to inform investment decisions.",
      fullDescription:
        "The Research team is the analytical engine behind our investment decisions. They conduct in-depth research on economies, industries, and individual securities to identify trends and opportunities. Using both quantitative and qualitative methods, they analyze financial data, economic indicators, and market developments to provide insights that inform our investment strategies. The team produces regular research reports and market updates that help both our investment professionals and clients understand market dynamics. Their rigorous approach to research, combined with their deep understanding of African markets, gives us a competitive edge in identifying value and managing risk.",
      image: "/placeholder.svg?height=300&width=800&text=Research+Team",
      head: {
        name: "Joshua Eyram Adagbe",
        title: "Senior Research & Compliance Analyst",
        image: "/images/team/joshua-tesah.jpg",
        bio: 'Role: Senior Research & Compliance Analyst, Tesah Capital Limited (since August 2022). Early Career: Began freelance roles as Investment Analyst and Financial Analyst in May 2022 before joining full-time. Research Contributions: Co-authored Tesah Capital\'s 2021 "Banking Sector Performance Review," showcasing his research capabilities.',
      },
    },
  ]

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {teamData.map((team, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setSelectedTeam(i)}
          >
            <div className="relative h-40 w-40 overflow-hidden rounded-full bg-muted">
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary">
                {team.name.charAt(0)}
              </div>
            </div>
            <h3 className="mt-4 text-xl font-bold">{team.name}</h3>
            <p className="text-muted-foreground">{team.description}</p>
          </div>
        ))}
      </div>

      <Dialog open={selectedTeam !== null} onOpenChange={(open) => !open && setSelectedTeam(null)}>
        {selectedTeam !== null && (
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{teamData[selectedTeam].name} Team</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Team Head Section */}
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start border-b pb-6">
                <div className="w-48 h-48 overflow-hidden rounded-full bg-muted shrink-0">
                  <img
                    src={teamData[selectedTeam].head.image || "/placeholder.svg"}
                    alt={teamData[selectedTeam].head.name}
                    className="w-full h-full object-cover object-center"
                    style={{ objectPosition: "center top" }}
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold">{teamData[selectedTeam].head.name}</h3>
                  <p className="text-primary font-medium mb-2">{teamData[selectedTeam].head.title}</p>
                  <p className="text-sm text-muted-foreground">{teamData[selectedTeam].head.bio}</p>
                </div>
              </div>

              <p className="text-foreground">{teamData[selectedTeam].fullDescription}</p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
