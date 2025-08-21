"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAdmin } from "@/lib/admin-context"
import { useInventory } from "@/lib/inventory-context"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  LogOut,
  Settings,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminDashboard() {
  const { state, logout } = useAdmin()
  const { state: inventoryState } = useInventory()
  const router = useRouter()

  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push("/admin/login")
    }
  }, [state.isAuthenticated, router])

  if (!state.isAuthenticated) {
    return null
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const totalRevenue = inventoryState.orders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => sum + order.totalNumber, 0)

  const pendingOrders = inventoryState.orders.filter((order) => order.status === "pending").length
  const totalProducts = inventoryState.products.length
  const lowStockProducts = inventoryState.lowStockAlerts.length

  // Agregando clientes únicos
  const uniqueCustomers = new Set(inventoryState.orders.map((order) => order.email)).size

  const stats = [
    {
      title: "Receita Total",
      value: formatCurrency(totalRevenue),
      change: "+12%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Pedidos Pendentes",
      value: pendingOrders.toString(),
      change: "+2",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Produtos em Estoque",
      value: totalProducts.toString(),
      change: lowStockProducts > 0 ? `-${lowStockProducts}` : "0",
      trend: lowStockProducts > 0 ? "down" : "up",
      icon: Package,
    },
    {
      title: "Clientes Únicos",
      value: uniqueCustomers.toString(),
      change: "+3",
      trend: "up",
      icon: Users,
    },
  ]

  const recentOrders = inventoryState.orders.slice(0, 4)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pendente</Badge>
      case "processing":
        return <Badge variant="secondary">Processando</Badge>
      case "completed":
        return <Badge variant="default">Concluído</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/logo-alb.png" alt="ALB Sistemas" width={120} height={40} className="h-10 w-auto" />
              <div className="hidden md:block">
                <h1 className="text-xl font-semibold">Painel Administrativo</h1>
                <p className="text-sm text-muted-foreground">Bem-vindo, {state.user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/admin/produtos">
                <Button variant="outline" size="sm">
                  <Package className="h-4 w-4 mr-2" />
                  Produtos
                </Button>
              </Link>
              <Link href="/admin/pedidos">
                <Button variant="outline" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Pedidos
                </Button>
              </Link>
              <Link href="/admin/clientes">
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Clientes
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
              <Button variant="destructive" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex items-center mt-4">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">vs. ontem</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Recentes</CardTitle>
              <CardDescription>Últimos pedidos recebidos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{order.total}</p>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/admin/pedidos">
                  <Button variant="outline" className="w-full bg-transparent">
                    Ver Todos os Pedidos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/produtos/novo">
                <Button className="w-full justify-start">
                  <Package className="h-4 w-4 mr-2" />
                  Adicionar Novo Produto
                </Button>
              </Link>
              <Link href="/admin/estoque">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Package className="h-4 w-4 mr-2" />
                  Gerenciar Estoque
                </Button>
              </Link>
              <Link href="/admin/relatorios">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Relatórios de Vendas
                </Button>
              </Link>
              <Link href="/admin/clientes">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Gerenciar Clientes
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
