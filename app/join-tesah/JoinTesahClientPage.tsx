"use client"

import type React from "react"
import { useRouter } from "next/router"

const JoinTesahClientPage: React.FC = () => {
  const router = useRouter()

  const handleJoin = () => {
    // Logic to handle joining the Tesah client
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Join Tesah Client</h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleJoin}>
            Join Now
          </button>
        </div>
      </main>
    </div>
  )
}

export default JoinTesahClientPage
