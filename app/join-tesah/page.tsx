import type { Metadata } from "next"
import JoinTesahClientPage from "./JoinTesahClientPage"

export const metadata: Metadata = {
  title: "Join Tesah Capital | Career Opportunities",
  description:
    "Explore career opportunities at Tesah Capital and join our team of investment professionals. Apply for open positions and grow your career with us.",
}

export default function JoinTesahPage() {
  // This page uses a client component, so updates should be made in JoinTesahClientPage.tsx
  return <JoinTesahClientPage />
}
