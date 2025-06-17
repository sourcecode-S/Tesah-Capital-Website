"use client"
import { Building, Facebook, Instagram, Linkedin, Twitter, PhoneIcon as WhatsApp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function ContactPageClient() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Get in touch with our team to learn more about our services.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Get In Touch</h2>
                <p className="text-muted-foreground md:text-lg">
                  Interested in our services? Contact us today to learn how we can help you achieve your investment
                  goals.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    <span>Tesah Capital Limited, Accra, Ghana</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>(+233 302 977813)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>(+233 302 977471)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>info@tesah.azurewebsites.net</span>
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="text-xl font-bold mb-4">Office Hours</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>8:00 AM - 5:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday:</span>
                      <span>9:00 AM - 1:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="https://www.instagram.com/tesahcapital"
                      className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <Instagram className="h-5 w-5 text-primary" />
                      <span>Instagram</span>
                    </Link>
                    <Link
                      href="https://wa.me/233501452038"
                      className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <WhatsApp className="h-5 w-5 text-primary" />
                      <span>WhatsApp 1</span>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/tesah-capital-limited"
                      className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <Linkedin className="h-5 w-5 text-primary" />
                      <span>LinkedIn</span>
                    </Link>
                    <Link
                      href="https://x.com/tesahcapital"
                      className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <Twitter className="h-5 w-5 text-primary" />
                      <span>X (Twitter)</span>
                    </Link>
                    <Link
                      href="https://www.facebook.com/tesahcapital"
                      className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <Facebook className="h-5 w-5 text-primary" />
                      <span>Facebook</span>
                    </Link>
                    <Link
                      href="https://wa.me/233501546859"
                      className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <WhatsApp className="h-5 w-5 text-primary" />
                      <span>WhatsApp 2</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="space-y-4 bg-background p-6 rounded-lg shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Send us a message</h3>
                  <p className="text-sm text-muted-foreground">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="first-name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        First name
                      </label>
                      <input
                        id="first-name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="last-name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Last name
                      </label>
                      <input
                        id="last-name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Investment Inquiry"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your message here"
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter">Our Location</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Visit us at our office on the 8th floor of the SSNIT Emporium, Airport Residential Area, Accra, Ghana.
              </p>
            </div>
            <div className="mt-8 aspect-video w-full overflow-hidden rounded-lg border shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5301411573486!2d-0.1852223!3d5.6022223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a5309cabfbb%3A0x63bd5f7e7ad8c48e!2sSSNIT%20Emporium%2C%20Airport%20Residential%20Area%2C%20Accra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1712661500000!5m2!1sen!2sus&markers=color:red%7Clabel:T%7C5.6022223,-0.1852223"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tesah Capital Limited Location at 8th floor, SSNIT Emporium"
                className="w-full h-full"
                aria-label="Map showing Tesah Capital Limited's office location on the 8th floor of SSNIT Emporium, Airport Residential Area, Accra, Ghana"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
