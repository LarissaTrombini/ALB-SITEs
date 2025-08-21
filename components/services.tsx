import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Monitor, Cloud, Sparkles, Check } from "lucide-react"

export function Services() {
  const systems = [
    {
      title: "Sistema Básico Local",
      description: "Solução completa para pequenos negócios",
      icon: Monitor,
      features: [
        "Ponto de Venda (PDV)",
        "Controle de Caixa",
        "Controle de Estoque",
        "Relatórios Básicos",
        "Cadastro de Clientes",
        "Emissão de Cupons",
      ],
      badge: "Local",
    },
    {
      title: "Sistema Intermediário",
      description: "Gestão em nuvem para empresas em crescimento",
      icon: Cloud,
      features: [
        "PDV Avançado",
        "Controle de Estoque",
        "Módulo Financeiro",
        "Relatórios Gerenciais",
        "Backup Automático",
        "Acesso Remoto",
      ],
      badge: "Nuvem",
      popular: true,
    },
    {
      title: "Sistema Plus",
      description: "Solução completa em nuvem com todas as funcionalidades",
      icon: Sparkles,
      features: [
        "Gestão Completa",
        "Módulo de Vendas",
        "CRM Integrado",
        "Business Intelligence",
        "API Personalizada",
        "Suporte Premium",
      ],
      badge: "Completo",
    },
  ]

  return (
    <section id="servicos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Nossos Sistemas</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha a solução ideal para o seu negócio. Todos os sistemas incluem suporte técnico especializado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {systems.map((system, index) => {
            const Icon = system.icon
            return (
              <Card key={index} className={`relative ${system.popular ? "border-primary shadow-lg scale-105" : ""}`}>
                {system.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Mais Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <Badge variant="secondary" className="w-fit mx-auto mb-2">
                    {system.badge}
                  </Badge>
                  <CardTitle className="text-xl">{system.title}</CardTitle>
                  <CardDescription className="text-base">{system.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {system.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-center mb-4">
                      <span className="text-2xl font-bold text-primary">A Combinar</span>
                      <p className="text-sm text-muted-foreground">Preço personalizado</p>
                    </div>

                    <Button
                      className={`w-full ${system.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                      variant={system.popular ? "default" : "outline"}
                    >
                      Solicitar Orçamento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
