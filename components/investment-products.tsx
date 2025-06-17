"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function InvestmentProducts() {
  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border rounded-lg mb-4 border-primary/20" id="ttt">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex flex-col items-start text-left">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-primary text-sm mb-2">
                Money Market Fund
              </div>
              <h3 className="text-xl font-bold">Tesah Treasury Trust (TTT)</h3>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {/* TTT Banner Image */}
                <div className="w-full overflow-hidden rounded-lg mb-4">
                  <Image
                    src="/images/tesah-treasury-trust-banner.jpeg"
                    alt="Tesah Treasury Trust - Looking for a risk-free collective investment scheme?"
                    width={800}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-muted-foreground mb-4">
                  The Tesah Treasury Trust is a money market fund designed to provide investors with income, capital
                  preservation, and liquidity through investments in high-quality, short-term money market instruments.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Risk Level:</span>
                    <span className="text-green-600">Low</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Minimum Investment:</span>
                    <span>GH₵1,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Management Fee:</span>
                    <span>1.5% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Recommended Holding Period:</span>
                    <span>3+ months</span>
                  </div>
                </div>
                <Button className="mt-2" asChild>
                  <Link href="/investment-products">
                    Invest Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Historical Performance</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>1 Year</span>
                      <span className="font-medium text-green-600">+12.8%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "62%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>3 Years</span>
                      <span className="font-medium text-green-600">+38.5%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>5 Years</span>
                      <span className="font-medium text-green-600">+67.2%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border rounded-lg mb-4 border-secondary/20" id="tff">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex flex-col items-start text-left">
              <div className="inline-block rounded-lg bg-secondary/10 px-3 py-1 text-secondary text-sm mb-2">
                Equity Fund
              </div>
              <h3 className="text-xl font-bold">Tesah Future Fund (TFF)</h3>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {/* TFF Banner Image */}
                <div className="w-full overflow-hidden rounded-lg mb-4">
                  <Image
                    src="/images/tesah-future-fund-banner.jpeg"
                    alt="Tesah Future Fund - Let Tesah help you invest in a brighter future today"
                    width={800}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-muted-foreground mb-4">
                  The Tesah Future Fund is an equity-focused fund that aims to achieve long-term capital growth through
                  investments in stocks and other equity securities across African markets, with a focus on high-growth
                  sectors.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Risk Level:</span>
                    <span className="text-amber-600">Medium-High</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Minimum Investment:</span>
                    <span>GH₵5,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Management Fee:</span>
                    <span>2.5% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Recommended Holding Period:</span>
                    <span>5+ years</span>
                  </div>
                </div>
                <Button className="mt-2 bg-secondary hover:bg-secondary/90" asChild>
                  <Link href="/investment-products">
                    Invest Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Historical Performance</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>1 Year</span>
                      <span className="font-medium text-green-600">+19.4%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="bg-secondary h-full" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>3 Years</span>
                      <span className="font-medium text-green-600">+62.8%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="bg-secondary h-full" style={{ width: "82%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>5 Years</span>
                      <span className="font-medium text-green-600">+103.5%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="bg-secondary h-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
