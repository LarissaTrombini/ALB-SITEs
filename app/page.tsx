import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, CheckCircle, Users, Zap, Shield, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/logo-alb.png" alt="ALB Sistemas" width={120} height={40} className="h-10 w-auto" />
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#sistemas" className="text-foreground hover:text-accent transition-colors">
                Sistemas
              </a>
              <a href="#sobre" className="text-foreground hover:text-accent transition-colors">
                Sobre
              </a>
              <a href="#contato" className="text-foreground hover:text-accent transition-colors">
                Contato
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                (11) 94712-1877
              </div>
              <Button className="bg-secondary hover:bg-secondary/90">Solicitar Orçamento</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              Especialistas em Software Empresarial
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Soluções em <span className="text-accent">Sistemas</span> para sua Empresa
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Revenda e implementação de sistemas empresariais de alta qualidade. Transforme sua gestão com tecnologia
              de ponta e suporte especializado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                Ver Sistemas Disponíveis
              </Button>
              <Button size="lg" variant="outline">
                Falar com Especialista
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Suporte Especializado</h3>
              <p className="text-sm text-muted-foreground">Equipe técnica qualificada para implementação e suporte</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Implementação Rápida</h3>
              <p className="text-sm text-muted-foreground">Sistemas prontos para uso com configuração personalizada</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Segurança Garantida</h3>
              <p className="text-sm text-muted-foreground">Sistemas seguros e confiáveis para proteger seus dados</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Crescimento Escalável</h3>
              <p className="text-sm text-muted-foreground">Soluções que crescem junto com sua empresa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Systems Catalog */}
      <section id="sistemas" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nossos Sistemas</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Oferecemos uma ampla gama de sistemas empresariais para atender às necessidades específicas do seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ERP System */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Sistema ERP Completo</CardTitle>
                  <Badge className="bg-accent/10 text-accent">Popular</Badge>
                </div>
                <CardDescription>Gestão integrada de todos os processos empresariais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Gestão Financeira
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Controle de Estoque
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Vendas e CRM
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Relatórios Gerenciais
                  </div>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90">Solicitar Demonstração</Button>
              </CardContent>
            </Card>

            {/* POS System */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Sistema PDV/POS</CardTitle>
                <CardDescription>Ponto de venda moderno e eficiente para seu comércio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Interface Intuitiva
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Integração Fiscal
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Controle de Caixa
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Relatórios de Vendas
                  </div>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90">Solicitar Demonstração</Button>
              </CardContent>
            </Card>

            {/* Inventory System */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Gestão de Estoque</CardTitle>
                <CardDescription>Controle total do seu inventário e movimentações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Controle de Entrada/Saída
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Alertas de Estoque Baixo
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Código de Barras
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Inventário Automático
                  </div>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90">Solicitar Demonstração</Button>
              </CardContent>
            </Card>

            {/* HR System */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Sistema de RH</CardTitle>
                <CardDescription>Gestão completa de recursos humanos e folha de pagamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Cadastro de Funcionários
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Folha de Pagamento
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Controle de Ponto
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Relatórios Trabalhistas
                  </div>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90">Solicitar Demonstração</Button>
              </CardContent>
            </Card>

            {/* CRM System */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Sistema CRM</CardTitle>
                <CardDescription>Gestão de relacionamento com clientes e vendas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Cadastro de Clientes
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Pipeline de Vendas
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Histórico de Interações
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Automação de Marketing
                  </div>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90">Solicitar Demonstração</Button>
              </CardContent>
            </Card>

            {/* Accounting System */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Sistema Contábil</CardTitle>
                <CardDescription>Controle contábil e fiscal completo para sua empresa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Plano de Contas
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Lançamentos Contábeis
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Balancetes e DRE
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    Obrigações Fiscais
                  </div>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90">Solicitar Demonstração</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Entre em Contato</h2>
              <p className="text-lg text-muted-foreground">
                Fale conosco e descubra como nossos sistemas podem transformar sua empresa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Phone className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Telefone</h3>
                  <p className="text-muted-foreground">(11) 94712-1877</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Mail className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">E-mail</h3>
                  <p className="text-muted-foreground">contato@albsistemas.com.br</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Atendimento</h3>
                  <p className="text-muted-foreground">
                    Segunda a Sexta
                    <br />
                    8h às 18h
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                Solicitar Orçamento Personalizado
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Image
                src="/logo-alb.png"
                alt="ALB Sistemas"
                width={120}
                height={40}
                className="h-10 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-sm text-primary-foreground/80">
                Especialistas em soluções de software empresarial com foco em qualidade e inovação.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sistemas</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>ERP Completo</li>
                <li>Sistema PDV/POS</li>
                <li>Gestão de Estoque</li>
                <li>Sistema de RH</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Sobre Nós</li>
                <li>Nossos Clientes</li>
                <li>Suporte Técnico</li>
                <li>Treinamentos</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>(11) 94712-1877</li>
                <li>contato@albsistemas.com.br</li>
                <li>Segunda a Sexta: 8h às 18h</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-sm text-primary-foreground/60">© 2024 ALB Sistemas. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
