import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Shield, Zap } from "lucide-react"

export function Hero() {
  return (
    <section id="inicio" className="py-20 lg:py-32 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Automação Comercial
            <span className="text-primary block">Inteligente</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sistemas de gestão e fiscais completos para impulsionar seu negócio. Soluções personalizadas que crescem com
            sua empresa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Conhecer Sistemas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Falar com Especialista
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Gestão Completa</h3>
              <p className="text-sm text-muted-foreground">Controle total do seu negócio em uma única plataforma</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Segurança Fiscal</h3>
              <p className="text-sm text-muted-foreground">Conformidade total com a legislação brasileira</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Alta Performance</h3>
              <p className="text-sm text-muted-foreground">Sistemas otimizados para máxima eficiência</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
