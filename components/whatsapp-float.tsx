"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5511947121877", "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full p-0 shadow-lg animate-bounce hover:scale-110 transition-transform"
      size="icon"
    >
      <Image src="/whatsapp-icon.png" alt="WhatsApp" width={56} height={56} className="rounded-full" />
      <span className="sr-only">Falar no WhatsApp</span>
    </Button>
  )
}
