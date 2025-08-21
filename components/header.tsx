import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20ALBB-vfqWu4ZJudQqo5HWZa4CLo9BUR7zZW.png"
            alt="ALB Sistemas"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#inicio" className="text-sm font-medium hover:text-primary transition-colors">
            Início
          </a>
          <a href="#servicos" className="text-sm font-medium hover:text-primary transition-colors">
            Serviços
          </a>
          <a href="#sobre" className="text-sm font-medium hover:text-primary transition-colors">
            Sobre
          </a>
          <a href="#contato" className="text-sm font-medium hover:text-primary transition-colors">
            Contato
          </a>
        </nav>

        <Button className="bg-primary hover:bg-primary/90">Solicitar Orçamento</Button>
      </div>
    </header>
  )
}
