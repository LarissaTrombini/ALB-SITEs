import Image from "next/image"
import { Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20ALBB-vfqWu4ZJudQqo5HWZa4CLo9BUR7zZW.png"
              alt="ALB Sistemas"
              width={120}
              height={40}
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Especialistas em automação comercial, oferecemos soluções completas para gestão empresarial com foco na
              excelência e inovação.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">sac@albsistemas.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">(11) 94712-1877</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Sistemas</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Sistema Básico Local</li>
              <li>Sistema Intermediário</li>
              <li>Sistema Plus</li>
              <li>Suporte Técnico</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Sobre Nós</li>
              <li>Nossos Clientes</li>
              <li>Política de Privacidade</li>
              <li>Termos de Uso</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">© 2024 ALB Sistemas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
