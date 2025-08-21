"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAdmin } from "@/lib/admin-context"
import { useInventory } from "@/lib/inventory-context"
import { Search, ArrowLeft, TrendingUp, TrendingDown, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function StockMovementsPage() {
  const { state: adminState } = useAdmin()
  const { state } = useInventory()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  useEffect(() => {
    if (!adminState.isAuthenticated) {
      router.push("/admin/login")
    }
  }, [adminState.isAuthenticated, router])

  if (!adminState.isAuthenticated) {
    return null
  }

  const filteredMovements = state.stockMovements.filter((movement) => {
    const matchesSearch = movement.productName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || movement.type === typeFilter
    return matchesSearch && matchesType
  })

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "in":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "out":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "adjustment":
        return <RotateCcw className="h-4 w-4 text-blue-600" />
      default:
        return null
    }
  }

  const getMovementBadge = (type: string) => {
    switch (type) {
      case "in":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Entrada
          </Badge>
        )
      case "out":
        return <Badge variant="destructive">Saída</Badge>
      case "adjustment":
        return <Badge variant="secondary">Ajuste</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/estoque">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Estoque
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Movimentações de Estoque</h1>
                <p className="text-sm text-muted-foreground">Histórico de todas as movimentações</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="in">Entrada</SelectItem>
              <SelectItem value="out">Saída</SelectItem>
              <SelectItem value="adjustment">Ajuste</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Movements List */}
        <div className="space-y-4">
          {filteredMovements.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Nenhuma movimentação encontrada</p>
              </CardContent>
            </Card>
          ) : (
            filteredMovements.map((movement) => (
              <Card key={movement.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getMovementIcon(movement.type)}
                      <div>
                        <h3 className="font-medium">{movement.productName}</h3>
                        <p className="text-sm text-muted-foreground">{movement.reason}</p>
                        <p className="text-xs text-muted-foreground">
                          {movement.date} • {movement.user}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        {getMovementBadge(movement.type)}
                        <span className="font-medium">
                          {movement.type === "out" ? "-" : "+"}
                          {movement.quantity}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {movement.previousStock} → {movement.newStock}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
