"use client"

import MarketData from "./MarketData"
import { Suspense } from "react"
import Loading from "./loading"

export default function MarketDataPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MarketData />
    </Suspense>
  )
}
