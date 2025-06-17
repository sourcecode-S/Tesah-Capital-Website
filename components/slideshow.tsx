"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      image: "/images/tesah-future-fund-banner.jpeg",
      title: "Tesah Future Fund",
      description: "Our flagship equity fund designed for long-term growth",
    },
    {
      image: "/images/tesah-treasury-trust-banner.jpeg",
      title: "Tesah Treasury Trust",
      description: "A fixed income fund focused on capital preservation and steady returns",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col items-end justify-end text-white p-2 sm:p-4">
            <div className="text-right max-w-xs sm:max-w-2xl">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 text-right leading-tight">
                {slide.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-right opacity-90 leading-relaxed">
                {slide.description}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
