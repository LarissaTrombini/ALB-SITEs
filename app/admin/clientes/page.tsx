"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAdmin } from "@/lib/admin-context"
import { useInventory } from "@/lib/inventory-context"
import { Search, ArrowLeft, Users, Eye, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
  status: "active" | "inactive"
}

export default function AdminCustomersPage() {
  const { state: adminState } = useAdmin()
  const { state } = useInventory()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  useEffect(() => {
    if (!adminState.isAuthenticated) {
      router.push("/admin/login")
    }
  }, [adminState.isAuthenticated, router])

  if (!adminState.isAuthenticated) {
    return null
  }

  // Agregar dados dos clientes a partir dos pedidos
  const customers: Customer[] = state.orders.reduce((acc: Customer[], order) => {
    const existingCustomer = acc.find((c) => c.email === order.email)

    if (existingCustomer) {
      existingCustomer.totalOrders += 1
      existingCustomer.totalSpent += order.totalNumber
      if (new Date(order.date) > new Date(existingCustomer.lastOrderDate)) {
        existingCustomer.lastOrderDate = order.date
      }
    } else {
      acc.push({
        id: `CUST-${acc.length + 1}`,
        name: order.customer,
        email: order.email,
        phone: order.phone,
        totalOrders: 1,
        totalSpent: order.totalNumber,
        lastOrderDate: order.date,
        status: "active",
      })
    }

    return acc
  }, [])

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCustomerOrders = (customerEmail: string) => {
    return state.orders.filter((order) => order.email === customerEmail)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

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
                <h1 className="text-xl font-semibold">Gerenciar Clientes</h1>
                <p className="text-sm text-muted-foreground">Visualize e gerencie informações dos clientes</p>
              </div>
            </div>
            <Link href="/admin/relatorios">
              <Button variant="outline">Relatórios</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{customers.length}</div>
              <p className="text-sm text-muted-foreground">Total de Clientes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {customers.filter((c) => c.status === "active").length}
              </div>
              <p className="text-sm text-muted-foreground">Clientes Ativos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(customers.reduce((sum, c) => sum + c.totalSpent, 0))}
              </div>
              <p className="text-sm text-muted-foreground">Receita Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">
                {customers.length > 0
                  ? Math.round(customers.reduce((sum, c) => sum + c.totalOrders, 0) / customers.length)
                  : 0}
              </div>
              <p className="text-sm text-muted-foreground">Pedidos por Cliente</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Customers List */}
        <div className="space-y-4">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{customer.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                      {customer.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(customer)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Cliente - {selectedCustomer?.name}</DialogTitle>
                        </DialogHeader>
                        {selectedCustomer && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Informações de Contato</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{selectedCustomer.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{selectedCustomer.phone}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Estatísticas</h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Total de Pedidos:</span>
                                    <span className="text-sm font-medium">{selectedCustomer.totalOrders}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Total Gasto:</span>
                                    <span className="text-sm font-medium">
                                      {formatCurrency(selectedCustomer.totalSpent)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Último Pedido:</span>
                                    <span className="text-sm font-medium">{selectedCustomer.lastOrderDate}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-4">Histórico de Pedidos</h4>
                              <div className="space-y-2 max-h-60 overflow-y-auto">
                                {getCustomerOrders(selectedCustomer.email).map((order) => (
                                  <div
                                    key={order.id}
                                    className="flex justify-between items-center p-3 bg-muted rounded"
                                  >
                                    <div>
                                      <span className="font-medium">{order.id}</span>
                                      <p className="text-sm text-muted-foreground">{order.date}</p>
                                    </div>
                                    <div className="text-right">
                                      <span className="font-medium">{order.total}</span>
                                      <Badge variant="outline" className="ml-2">
                                        {order.status === "pending"
                                          ? "Pendente"
                                          : order.status === "processing"
                                            ? "Processando"
                                            : order.status === "completed"
                                              ? "Concluído"
                                              : "Cancelado"}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Telefone</h4>
                    <p className="text-sm text-muted-foreground">{customer.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Total de Pedidos</h4>
                    <p className="text-sm font-bold text-primary">{customer.totalOrders}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Total Gasto</h4>
                    <p className="text-sm font-bold text-primary">{formatCurrency(customer.totalSpent)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum cliente encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}
