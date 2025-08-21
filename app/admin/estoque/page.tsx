"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAdmin } from "@/lib/admin-context"
import { useInventory } from "@/lib/inventory-context"
import { Search, ArrowLeft, Package, AlertTriangle, Edit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminStockPage() {
  const { state: adminState } = useAdmin()
  const { state, dispatch } = useInventory()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [stockAdjustment, setStockAdjustment] = useState("")
  const [adjustmentReason, setAdjustmentReason] = useState("")

  useEffect(() => {
    if (!adminState.isAuthenticated) {
      router.push("/admin/login")
    }
  }, [adminState.isAuthenticated, router])

  if (!adminState.isAuthenticated) {
    return null
  }

  const filteredProducts = state.products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStockUpdate = () => {
    if (selectedProduct && stockAdjustment && adjustmentReason) {
      const newStock = Number.parseInt(stockAdjustment)
      if (!Number.isNaN(newStock) && newStock >= 0) {
        dispatch({
          type: "UPDATE_STOCK",
          payload: {
            productId: selectedProduct.id,
            newStock,
            reason: adjustmentReason,
            user: adminState.user?.name || "Admin",
          },
        })
        setSelectedProduct(null)
        setStockAdjustment("")
        setAdjustmentReason("")
      }
    }
  }

  const getStockStatus = (product: any) => {
    if (product.stock === 0) {
      return <Badge variant="destructive">Sem Estoque</Badge>
    }
    if (product.stock <= product.minStock) {
      return <Badge variant="secondary">Estoque Baixo</Badge>
    }
    return <Badge variant="default">Em Estoque</Badge>
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
                <h1 className="text-xl font-semibold">Gestão de Estoque</h1>
                <p className="text-sm text-muted-foreground">Controle e monitore o estoque de produtos</p>
              </div>
            </div>
            <Link href="/admin/estoque/movimentacoes">
              <Button variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Movimentações
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Low Stock Alerts */}
        {state.lowStockAlerts.length > 0 && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Atenção:</strong> {state.lowStockAlerts.length} produto(s) com estoque baixo:{" "}
              {state.lowStockAlerts.map((p) => p.name).join(", ")}
            </AlertDescription>
          </Alert>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stock Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{state.products.length}</div>
              <p className="text-sm text-muted-foreground">Total de Produtos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{state.products.filter((p) => p.inStock).length}</div>
              <p className="text-sm text-muted-foreground">Em Estoque</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">{state.lowStockAlerts.length}</div>
              <p className="text-sm text-muted-foreground">Estoque Baixo</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">
                {state.products.filter((p) => p.stock === 0).length}
              </div>
              <p className="text-sm text-muted-foreground">Sem Estoque</p>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className={product.stock <= product.minStock ? "border-orange-200" : ""}>
              <CardHeader className="p-0">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {getStockStatus(product)}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Estoque Atual:</span>
                    <span className="font-medium">{product.stock} unidades</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Estoque Mínimo:</span>
                    <span className="font-medium">{product.minStock} unidades</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Preço:</span>
                    <span className="font-medium text-primary">{product.price}</span>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        setSelectedProduct(product)
                        setStockAdjustment(product.stock.toString())
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Ajustar Estoque
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajustar Estoque - {selectedProduct?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentStock">Estoque Atual</Label>
                        <Input id="currentStock" value={selectedProduct?.stock || 0} disabled />
                      </div>
                      <div>
                        <Label htmlFor="newStock">Novo Estoque</Label>
                        <Input
                          id="newStock"
                          type="number"
                          min="0"
                          value={stockAdjustment}
                          onChange={(e) => setStockAdjustment(e.target.value)}
                          placeholder="Digite a nova quantidade"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reason">Motivo do Ajuste</Label>
                        <Input
                          id="reason"
                          value={adjustmentReason}
                          onChange={(e) => setAdjustmentReason(e.target.value)}
                          placeholder="Ex: Reposição, Correção, Perda"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleStockUpdate} className="flex-1">
                          Confirmar Ajuste
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedProduct(null)
                            setStockAdjustment("")
                            setAdjustmentReason("")
                          }}
                          className="bg-transparent"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}
