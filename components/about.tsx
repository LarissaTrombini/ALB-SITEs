import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Headphones, Rocket } from "lucide-react"

export function About() {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Clientes Atendidos",
    },
    {
      icon: Award,
      number: "10+",
      label: "Anos de Experiência",
    },
    {
      icon: Headphones,
      number: "24/7",
      label: "Suporte Técnico",
    },
    {
      icon: Rocket,
      number: "99%",
      label: "Satisfação dos Clientes",
    },
  ]

  return (
    <section id="sobre" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Sobre a ALB Sistemas</h2>
            <p className="text-xl text-muted-foreground">
              Especialistas em automação comercial, oferecemos soluções tecnológicas que transformam a gestão do seu
              negócio.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="bg-muted/50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
            <p className="text-muted-foreground mb-6">
              Democratizar o acesso à tecnologia de gestão empresarial, oferecendo sistemas robustos, seguros e fáceis
              de usar. Acreditamos que toda empresa, independente do tamanho, merece ter acesso às melhores ferramentas
              de automação comercial.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Por que escolher a ALB?</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Sistemas desenvolvidos especificamente para o mercado brasileiro</li>
                  <li>• Conformidade total com a legislação fiscal</li>
                  <li>• Suporte técnico especializado e personalizado</li>
                  <li>• Atualizações constantes e melhorias contínuas</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Nossos Valores</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Transparência em todos os processos</li>
                  <li>• Inovação constante em nossas soluções</li>
                  <li>• Compromisso com o sucesso dos nossos clientes</li>
                  <li>• Qualidade e confiabilidade em primeiro lugar</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
