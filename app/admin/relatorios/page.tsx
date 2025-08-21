"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAdmin } from "@/lib/admin-context"
import { useInventory } from "@/lib/inventory-context"
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, PieChart, Download } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminReportsPage() {
  const { state: adminState } = useAdmin()
  const { state } = useInventory()
  const router = useRouter()
  const [period, setPeriod] = useState("30")

  useEffect(() => {
    if (!adminState.isAuthenticated) {
      router.push("/admin/login")
    }
  }, [adminState.isAuthenticated, router])

  if (!adminState.isAuthenticated) {
    return null
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  // Calcular métricas
  const totalRevenue = state.orders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => sum + order.totalNumber, 0)

  const totalOrders = state.orders.length
  const completedOrders = state.orders.filter((order) => order.status === "completed").length
  const pendingOrders = state.orders.filter((order) => order.status === "pending").length

  const averageOrderValue = completedOrders > 0 ? totalRevenue / completedOrders : 0

  // Produtos mais vendidos
  const productSales = state.orders
    .filter((order) => order.status === "completed")
    .flatMap((order) => order.items)
    .reduce((acc: any, item) => {
      const existing = acc.find((p: any) => p.productId === item.productId)
      if (existing) {
        existing.quantity += item.quantity
        existing.revenue += item.priceNumber * item.quantity
      } else {
        acc.push({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          revenue: item.priceNumber * item.quantity,
        })
      }
      return acc
    }, [])
    .sort((a: any, b: any) => b.quantity - a.quantity)
    .slice(0, 5)

  // Vendas por categoria
  const categorySales = state.products.reduce((acc: any, product) => {
    const soldQuantity = productSales.find((p: any) => p.productId === product.id)?.quantity || 0
    const existing = acc.find((c: any) => c.category === product.category)

    if (existing) {
      existing.quantity += soldQuantity
      existing.revenue += soldQuantity * product.priceNumber
    } else {
      acc.push({
        category: product.category,
        quantity: soldQuantity,
        revenue: soldQuantity * product.priceNumber,
      })
    }
    return acc
  }, [])

  // Status dos pedidos
  const orderStatusData = [
    { status: "Pendente", count: state.orders.filter((o) => o.status === "pending").length, color: "bg-orange-500" },
    {
      status: "Processando",
      count: state.orders.filter((o) => o.status === "processing").length,
      color: "bg-blue-500",
    },
    { status: "Concluído", count: state.orders.filter((o) => o.status === "completed").length, color: "bg-green-500" },
    { status: "Cancelado", count: state.orders.filter((o) => o.status === "cancelled").length, color: "bg-red-500" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Relatórios e Análises</h1>
                <p className="text-sm text-muted-foreground">Visualize métricas e desempenho do negócio</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 dias</SelectItem>
                  <SelectItem value="30">30 dias</SelectItem>
                  <SelectItem value="90">90 dias</SelectItem>
                  <SelectItem value="365">1 ano</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm font-medium text-green-600">+12%</span>
                <span className="text-sm text-muted-foreground ml-1">vs. período anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Pedidos</p>
                  <p className="text-2xl font-bold">{totalOrders}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm font-medium text-green-600">+8%</span>
                <span className="text-sm text-muted-foreground ml-1">vs. período anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ticket Médio</p>
                  <p className="text-2xl font-bold">{formatCurrency(averageOrderValue)}</p>
                </div>
                <PieChart className="h-8 w-8 text-purple-600" />
              </div>
              <div className="flex items-center mt-4">
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                <span className="text-sm font-medium text-red-600">-3%</span>
                <span className="text-sm text-muted-foreground ml-1">vs. período anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taxa de Conversão</p>
                  <p className="text-2xl font-bold">
                    {totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm font-medium text-green-600">+5%</span>
                <span className="text-sm text-muted-foreground ml-1">vs. período anterior</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Produtos Mais Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productSales.map((product, index) => (
                  <div key={product.productId} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.quantity} unidades vendidas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(product.revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Status dos Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderStatusData.map((item) => (
                  <div key={item.status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${item.color}`} />
                      <span className="font-medium">{item.status}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{item.count}</span>
                      <Badge variant="outline">
                        {totalOrders > 0 ? Math.round((item.count / totalOrders) * 100) : 0}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categorySales.map((category: any) => (
                <div key={category.category} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{category.category}</h3>
                    <Badge variant="outline">{category.quantity} vendidos</Badge>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">{formatCurrency(category.revenue)}</div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${Math.min((category.revenue / Math.max(...categorySales.map((c: any) => c.revenue))) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
