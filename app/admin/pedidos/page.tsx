"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAdmin } from "@/lib/admin-context"
import { useInventory } from "@/lib/inventory-context"
import { Search, ArrowLeft, Eye, Download, Package } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminOrdersPage() {
  const { state: adminState } = useAdmin()
  const { state, dispatch } = useInventory()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  useEffect(() => {
    if (!adminState.isAuthenticated) {
      router.push("/admin/login")
    }
  }, [adminState.isAuthenticated, router])

  if (!adminState.isAuthenticated) {
    return null
  }

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

  const filteredOrders = state.orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (orderId: string, newStatus: any) => {
    dispatch({
      type: "UPDATE_ORDER_STATUS",
      payload: { orderId, status: newStatus },
    })
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
                <h1 className="text-xl font-semibold">Gerenciar Pedidos</h1>
                <p className="text-sm text-muted-foreground">Visualize e gerencie todos os pedidos recebidos</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/admin/estoque">
                <Button variant="outline" size="sm">
                  <Package className="h-4 w-4 mr-2" />
                  Estoque
                </Button>
              </Link>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{state.orders.length}</div>
              <p className="text-sm text-muted-foreground">Total de Pedidos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">
                {state.orders.filter((o) => o.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">Pendentes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {state.orders.filter((o) => o.status === "processing").length}
              </div>
              <p className="text-sm text-muted-foreground">Processando</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {state.orders.filter((o) => o.status === "completed").length}
              </div>
              <p className="text-sm text-muted-foreground">Concluídos</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente ou número do pedido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="processing">Processando</SelectItem>
              <SelectItem value="completed">Concluído</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(order.status)}
                    <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="processing">Processando</SelectItem>
                        <SelectItem value="completed">Concluído</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Pedido - {selectedOrder?.id}</DialogTitle>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Cliente</h4>
                                <p className="text-sm">{selectedOrder.customer}</p>
                                <p className="text-sm text-muted-foreground">{selectedOrder.email}</p>
                                <p className="text-sm text-muted-foreground">{selectedOrder.phone}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Endereço de Entrega</h4>
                                <p className="text-sm">{selectedOrder.address.street}</p>
                                <p className="text-sm">
                                  {selectedOrder.address.city}, {selectedOrder.address.state}
                                </p>
                                <p className="text-sm">{selectedOrder.address.zipCode}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Itens do Pedido</h4>
                              <div className="space-y-2">
                                {selectedOrder.items.map((item: any, index: number) => (
                                  <div key={index} className="flex justify-between p-2 bg-muted rounded">
                                    <span>
                                      {item.quantity}x {item.name}
                                    </span>
                                    <span className="font-medium">{item.price}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t">
                              <span className="font-medium">Total do Pedido:</span>
                              <span className="text-2xl font-bold text-primary">{selectedOrder.total}</span>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Cliente</h4>
                    <p className="text-sm">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.email}</p>
                    <p className="text-sm text-muted-foreground">{order.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Itens do Pedido</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm">
                          {item.quantity}x {item.name}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Total</h4>
                    <p className="text-2xl font-bold text-primary">{order.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum pedido encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}
