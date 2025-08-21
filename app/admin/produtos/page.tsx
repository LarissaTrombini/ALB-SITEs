"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAdmin } from "@/lib/admin-context"
import { Search, Plus, Edit, Trash2, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const products = [
  {
    id: 1,
    name: "Bobina Térmica 80x40mm",
    description: "Bobina térmica de alta qualidade para impressoras fiscais",
    price: "R$ 12,90",
    priceNumber: 12.9,
    image: "/placeholder-9bod7.png",
    category: "Bobinas",
    stock: 150,
    inStock: true,
  },
  {
    id: 2,
    name: "Impressora Fiscal Epson TM-T20X",
    description: "Impressora térmica não fiscal com conectividade USB e Ethernet",
    price: "R$ 890,00",
    priceNumber: 890.0,
    image: "/placeholder-3xnfw.png",
    category: "Impressoras",
    stock: 5,
    inStock: true,
  },
  {
    id: 3,
    name: "Bobina Térmica 57x30mm",
    description: "Bobina compacta para PDVs e terminais de pagamento",
    price: "R$ 8,50",
    priceNumber: 8.5,
    image: "/small-thermal-paper-roll.png",
    category: "Bobinas",
    stock: 200,
    inStock: true,
  },
  {
    id: 4,
    name: "Impressora Fiscal Bematech MP-4200 TH",
    description: "Impressora térmica fiscal homologada pela Receita Federal",
    price: "R$ 1.250,00",
    priceNumber: 1250.0,
    image: "/placeholder-06asr.png",
    category: "Impressoras",
    stock: 0,
    inStock: false,
  },
]

export default function AdminProductsPage() {
  const { state } = useAdmin()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push("/admin/login")
    }
  }, [state.isAuthenticated, router])

  if (!state.isAuthenticated) {
    return null
  }

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
                <h1 className="text-xl font-semibold">Gerenciar Produtos</h1>
                <p className="text-sm text-muted-foreground">Adicione, edite ou remova produtos do catálogo</p>
              </div>
            </div>
            <Link href="/admin/produtos/novo">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Produto
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader className="p-0">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge variant={product.inStock ? "default" : "secondary"} className="absolute top-2 right-2">
                    {product.inStock ? "Em Estoque" : "Sem Estoque"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{product.category}</Badge>
                  <span className="text-sm text-muted-foreground">Estoque: {product.stock}</span>
                </div>
                <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                <div className="text-2xl font-bold text-primary mb-4">{product.price}</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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
