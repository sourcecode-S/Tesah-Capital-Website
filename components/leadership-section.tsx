"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface LeaderInfo {
  name: string
  title: string
  bio: string
  image: string
}

export function LeadershipSection() {
  const [selectedLeader, setSelectedLeader] = useState<number | null>(null)

  const leadershipData: LeaderInfo[] = [
    {
      name: "Eugene Mensah",
      title: "Managing Director",
      bio: "Eugene Mensah brings extensive experience in investment management and financial services to his role as Managing Director. With a strong background in portfolio management and strategic leadership, he guides Tesah Capital's vision and growth strategy. His expertise in African markets and commitment to client success has been instrumental in establishing Tesah Capital as a trusted investment partner.",
      image: "/images/leadership/Mr_Mensah.jpg",
    },
    {
      name: "Kwame Boamah",
      title: "Chief Operating Officer",
      bio: "Kwame Boamah oversees the day-to-day operations of Tesah Capital, ensuring operational excellence across all departments. With his background in business administration and financial operations, he implements efficient processes that support the company's strategic objectives. His leadership fosters a culture of innovation and continuous improvement throughout the organization.",
      image: "/images/leadership/Mr_Boamah.jpg",
    },
    {
      name: "Eric Nana Otoo",
      title: "Chief Investment Officer",
      bio: "Eric Nana Otoo leads Tesah Capital's investment strategy and portfolio management activities. With deep expertise in financial markets and asset allocation, he directs the investment team in identifying opportunities that deliver optimal returns for clients. His analytical approach and market insights are key to the company's successful investment performance.",
      image: "/images/leadership/Mr_Eric_Nana_Otoo.jpg",
    },
    {
      name: "Dr. Samuel Yankson",
      title: "Head of Research",
      bio: "Dr. Samuel Yankson directs Tesah Capital's research initiatives, providing critical market analysis and investment insights. His academic background and practical experience in economic research inform the company's investment decisions and market strategies. Under his leadership, the research team delivers valuable intelligence that supports Tesah Capital's investment approach.",
      image: "/images/leadership/Dr_Yankson.jpg",
    },
    {
      name: "Eugenia Basheer",
      title: "Head of Client Relations",
      bio: "Eugenia Basheer leads Tesah Capital's client relations team, ensuring exceptional service and support for all clients. Her expertise in relationship management and client communication helps build lasting partnerships based on trust and understanding. She is dedicated to understanding client needs and delivering personalized investment solutions that meet their financial goals.",
      image: "/images/leadership/Madam_Eugenia.jpg",
    },
  ]

  return (
    <>
      

      <Dialog open={selectedLeader !== null} onOpenChange={(open) => !open && setSelectedLeader(null)}>
        {selectedLeader !== null && (
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{leadershipData[selectedLeader].name}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-40 h-40 overflow-hidden rounded-full bg-muted shrink-0">
                <img
                  src={leadershipData[selectedLeader].image || "/placeholder.svg"}
                  alt={leadershipData[selectedLeader].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold md:hidden">{leadershipData[selectedLeader].name}</h3>
                <p className="text-primary font-medium mb-2">{leadershipData[selectedLeader].title}</p>
                <p className="text-muted-foreground">{leadershipData[selectedLeader].bio}</p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
