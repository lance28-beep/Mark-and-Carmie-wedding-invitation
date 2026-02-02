"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"
import { Cormorant_Garamond, Cinzel } from "next/font/google"
import { siteConfig } from "@/content/site"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
})

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "When is the wedding?",
    answer:
      `Our wedding will be held on ${siteConfig.ceremony.date} (${siteConfig.ceremony.day}) at ${siteConfig.ceremony.time}. We kindly ask guests to arrive by ${siteConfig.ceremony.guestsTime} to help us begin promptly.`,
  },
  {
    question: "Where will the ceremony and reception take place?",
    answer:
      `The ceremony will be held at ${siteConfig.ceremony.location}. The reception will follow at ${siteConfig.reception.location}. You can find detailed directions, addresses, and maps in the Details section above.`,
  },
  {
    question: "What time should I arrive?",
    answer:
      `Kindly arrive by ${siteConfig.ceremony.guestsTime} so we can begin the ceremony promptly at exactly ${siteConfig.ceremony.time}. The entourage will arrive at ${siteConfig.ceremony.entourageTime}. Your punctuality means so much to us!`,
  },
  {
    question: "How do I RSVP?",
    answer:
      `Please RSVP through the RSVP section on this invitation. Simply search for your name in the guest list, confirm your attendance, and let us know if you'll be bringing companions. We kindly ask for your response on or before ${siteConfig.details.rsvp.deadline} to help us prepare for the big day. For any questions, please contact ${siteConfig.details.rsvp.contact} at ${siteConfig.details.rsvp.phone}.`,
  },
  {
    question: "Can I bring a plus one or additional guests?",
    answer:
      "Each invitation includes a specific number of reserved seats. Please check your invitation details in the RSVP section. If you need to request additional seats, you can use the 'Request to Join' feature, and we'll do our best to accommodate based on availability.",
  },
  {
    question: "Is there a dress code?",
    answer:
      `Strictly semi-formal or formal attire. Ninang: Champagne, Cream or Beige Gown. Ninong: Dark Gray Suit, White Longsleeves. Guests — Ladies: Long dress, Sabbath Dress, or Cocktail dress; Gentlemen: Longsleeves, Polo, Slacks. See the [GUEST_INFO_LINK]Guest Information section[\/GUEST_INFO_LINK] for the full attire guide with images and color palette.`,
  },
  {
    question: "Will there be assigned seating?",
    answer:
      "Yes, there will be assigned seating at the reception. Your table number will be displayed in the Book of Guests section once your RSVP is confirmed. Our reception team will gladly guide you to your table so you can relax and enjoy the celebration.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes, parking is available at both venues. Please follow the parking signs and instructions from our venue coordinators.",
  },
  {
    question: "What should I give as a gift?",
    answer:
      "With all that we have, we are truly blessed. Your presence and prayers are what we request most. However, if you desire to give nonetheless, a monetary gift to help us begin our new life together would be humbly appreciated. You can find our gift registry information in the Gift Guide section.",
  },
  {
    question: "Can I take photos and videos during the ceremony?",
    answer:
      "We have a professional photographer and videographer capturing our special moments. We kindly ask that you keep your phones on silent and refrain from taking photos during the ceremony. However, we'd love to see your photos and videos from the reception! Please check the Snap & Share section for details on how to upload them.",
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please let us know about any dietary restrictions or allergies when you RSVP. We want to ensure everyone can enjoy the celebration comfortably.",
  },
  {
    question: "How can I help the couple have a great time during their wedding?",
    answer:
      "• Pray with us for favorable weather and the continuous blessings of our Lord as we enter this new chapter of our lives as husband and wife.\n\n• RSVP as soon as your schedule is cleared.\n\n• Dress appropriately and follow our wedding motif.\n\n• Be on time.\n\n• Follow the seating arrangement in the reception.\n\n• Stay until the end of the program.\n\n• Join the activities and enjoy!",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section
      id="faq"
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Section Header */}
      <div className="relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white mb-2`}
        >
          Everything You Need to Know
        </p>

        <h2
          className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4`}
        >
          Frequently Asked Questions
        </h2>
        
        <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-white font-light max-w-xl mx-auto leading-relaxed px-2 mb-2 sm:mb-3`}>
          Common questions answered to help you prepare for our special day
        </p>

        {/* Simple divider */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
        </div>
      </div>

      {/* FAQ content */}
      <div className="relative z-30 max-w-4xl mx-auto px-3 sm:px-5">
        {/* Main card */}
        <div className="relative bg-[#E1D5C7]/95 backdrop-blur-md border border-[#606C60]/40 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_20px_60px_rgba(96,108,96,0.15)] overflow-hidden">
          
          {/* FAQ items */}
          <div className="relative p-2.5 sm:p-4 md:p-5 lg:p-6">
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border border-[#606C60]/40 bg-white/80 hover:border-[#606C60]/60 hover:bg-white transition-all duration-300 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#606C60]/50 focus-visible:ring-offset-2 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className={`${cinzel.className} font-semibold text-[#606C60] pr-2 sm:pr-3 md:pr-4 text-xs sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed transition-colors duration-200 group-hover:text-[#606C60]`}>
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-[#606C60]/60 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#606C60]" : ""} w-4 h-4 sm:w-5 sm:h-5`}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-white/50 border-t border-[#606C60]/40">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className={`${cormorant.className} text-[#606C60] font-medium leading-relaxed sm:leading-loose text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre-line tracking-wide`}>
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a 
                                href="#guest-list" 
                                className="text-[#606C60] underline font-bold hover:text-[#606C60]/80 transition-colors"
                                onClick={(e) => {
                                  e.preventDefault()
                                  document.getElementById('guest-list')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                              >
                                {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
                              </a>
                              {item.answer.split("[/RSVP_LINK]")[1]}
                            </p>
                          ) : item.question === "Is there a dress code?" ? (
                            <div className="space-y-3 sm:space-y-4">
                              <p className={`${cormorant.className} text-[#606C60] font-medium leading-relaxed sm:leading-loose text-xs sm:text-sm md:text-base lg:text-lg tracking-wide`}>
                                {item.answer.split("[GUEST_INFO_LINK]")[0]}
                                <a
                                  href="#guest-information"
                                  className="text-[#606C60] underline font-bold hover:text-[#606C60]/80 transition-colors"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    document.getElementById("guest-information")?.scrollIntoView({ behavior: "smooth" })
                                  }}
                                >
                                  {item.answer.match(/\[GUEST_INFO_LINK\](.*?)\[\/GUEST_INFO_LINK\]/s)?.[1] || "Guest Information section"}
                                </a>
                                {item.answer.split("[/GUEST_INFO_LINK]")[1]}
                              </p>
                              {/* Color Palette - aligned with Guest Information section */}
                              <div className="flex items-end justify-center gap-1.5 sm:gap-5 md:gap-6 lg:gap-8 flex-wrap">
                                {[
                                  { hex: "#E8CDB8", name: "Beige" },
                                  { hex: "#DDBDA6", name: "Nude" },
                                  { hex: "#B58E65", name: "Camel" },
                                  { hex: "#EDE0D7", name: "Light Beige" },
                                ].map(({ hex, name }) => {
                                  const r = parseInt(hex.slice(1, 3), 16)
                                  const g = parseInt(hex.slice(3, 5), 16)
                                  const b = parseInt(hex.slice(5, 7), 16)
                                  return (
                                    <div key={name} className="flex flex-col items-center group shrink-0">
                                      <div
                                        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                                        style={{
                                          backgroundColor: hex,
                                          boxShadow: `0 2px 8px rgba(${r}, ${g}, ${b}, 0.25)`,
                                        }}
                                      />
                                      <p className={`${cormorant.className} mt-1 sm:mt-2 text-[10px] sm:text-xs font-medium text-[#606C60]`}>
                                        {name}
                                      </p>
                                    </div>
                                  )
                                })}
                              </div>
                              <p className={`${cormorant.className} text-xs sm:text-sm text-[#606C60]/90 text-center italic`}>
                                We know many like to come dressed to compliment the big day. We look forward to seeing you all!
                              </p>
                            </div>
                          ) : (
                            <p className={`${cormorant.className} text-[#606C60] font-medium leading-relaxed sm:leading-loose text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre-line tracking-wide`}>
                              {item.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
