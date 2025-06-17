"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left font-medium">What is the minimum investment amount?</AccordionTrigger>
          <AccordionContent>
            The minimum investment amount varies by product. For our Tesah Treasury Trust (TTT), the minimum is
            GH₵1,000. For the Tesah Future Fund (TFF), the minimum is GH₵5,000. Please contact our investment advisors
            for specific details on other investment products.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left font-medium">How do I open an investment account?</AccordionTrigger>
          <AccordionContent>
            Opening an investment account is simple. You can register online through our client portal, visit our office
            in person, or contact our customer service team. You'll need to provide identification documents, complete
            our account opening forms, and make your initial investment.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left font-medium">
            What are the fees associated with your investment products?
          </AccordionTrigger>
          <AccordionContent>
            Our fee structure is transparent and competitive. We charge a management fee ranging from 1.5% to 2.5% per
            annum depending on the investment product. Some products may have performance fees for returns above a
            certain threshold. There are no hidden charges, and all fees are clearly disclosed in our product
            documentation.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-left font-medium">
            How often will I receive statements on my investments?
          </AccordionTrigger>
          <AccordionContent>
            We provide monthly statements for all investment accounts. These statements are available through our online
            client portal and can also be sent via email. Quarterly comprehensive performance reports are also provided
            to give you a deeper understanding of your investment performance.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-left font-medium">
            Can I withdraw my investment before maturity?
          </AccordionTrigger>
          <AccordionContent>
            Yes, most of our investment products allow for early withdrawals, though some may have a notice period or
            early withdrawal fees. Fixed-term investments may have specific terms regarding early redemption. Please
            consult the specific product terms or speak with your investment advisor for details on your particular
            investment.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
