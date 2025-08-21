"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface Product {
  id: number
  name: string
  description: string
  price: string
  priceNumber: number
  image: string
  category: string
  stock: number
  minStock: number
  inStock: boolean
  rating: number
}

export interface StockMovement {
  id: string
  productId: number
  productName: string
  type: "in" | "out" | "adjustment"
  quantity: number
  previousStock: number
  newStock: number
  reason: string
  date: string
  user: string
}

export interface Order {
  id: string
  customer: string
  email: string
  phone: string
  total: string
  totalNumber: number
  status: "pending" | "processing" | "completed" | "cancelled"
  date: string
  items: Array<{
    productId: number
    name: string
    quantity: number
    price: string
    priceNumber: number
  }>
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
}

interface InventoryState {
  products: Product[]
  orders: Order[]
  stockMovements: StockMovement[]
  lowStockAlerts: Product[]
}

type InventoryAction =
  | { type: "UPDATE_STOCK"; payload: { productId: number; newStock: number; reason: string; user: string } }
  | { type: "ADD_STOCK_MOVEMENT"; payload: StockMovement }
  | { type: "UPDATE_ORDER_STATUS"; payload: { orderId: string; status: Order["status"] } }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: number }

const InventoryContext = createContext<{
  state: InventoryState
  dispatch: React.Dispatch<InventoryAction>
} | null>(null)

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Bobina Térmica 80x40mm",
    description: "Bobina térmica de alta qualidade para impressoras fiscais",
    price: "R$ 12,90",
    priceNumber: 12.9,
    image: "/placeholder-9bod7.png",
    category: "Bobinas",
    stock: 150,
    minStock: 20,
    inStock: true,
    rating: 4.8,
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
    minStock: 2,
    inStock: true,
    rating: 4.9,
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
    minStock: 30,
    inStock: true,
    rating: 4.7,
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
    minStock: 1,
    inStock: false,
    rating: 4.6,
  },
  {
    id: 5,
    name: "Kit 10 Bobinas Térmicas 80x40mm",
    description: "Kit econômico com 10 bobinas térmicas de alta qualidade",
    price: "R$ 115,00",
    priceNumber: 115.0,
    image: "/thermal-paper-rolls.png",
    category: "Bobinas",
    stock: 25,
    minStock: 10,
    inStock: true,
    rating: 4.8,
  },
  {
    id: 6,
    name: "Impressora Fiscal Daruma DR-800 L",
    description: "Impressora matricial fiscal com guilhotina automática",
    price: "R$ 2.100,00",
    priceNumber: 2100.0,
    image: "/dot-matrix-fiscal-printer.png",
    category: "Impressoras",
    stock: 3,
    minStock: 1,
    inStock: true,
    rating: 4.5,
  },
]

const initialOrders: Order[] = [
  {
    id: "PED-001",
    customer: "Empresa ABC Ltda",
    email: "contato@empresaabc.com.br",
    phone: "(11) 99999-9999",
    total: "R$ 890,00",
    totalNumber: 890.0,
    status: "pending",
    date: "2024-01-15",
    items: [
      { productId: 2, name: "Impressora Fiscal Epson TM-T20X", quantity: 1, price: "R$ 890,00", priceNumber: 890.0 },
    ],
    address: {
      street: "Rua das Empresas, 123",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
    },
  },
  {
    id: "PED-002",
    customer: "Comércio XYZ",
    email: "vendas@comercioxyz.com.br",
    phone: "(11) 88888-8888",
    total: "R$ 244,00",
    totalNumber: 244.0,
    status: "completed",
    date: "2024-01-15",
    items: [
      { productId: 1, name: "Bobina Térmica 80x40mm", quantity: 10, price: "R$ 129,00", priceNumber: 129.0 },
      { productId: 5, name: "Kit 10 Bobinas Térmicas 80x40mm", quantity: 1, price: "R$ 115,00", priceNumber: 115.0 },
    ],
    address: {
      street: "Av. Comercial, 456",
      city: "São Paulo",
      state: "SP",
      zipCode: "02345-678",
    },
  },
]

function inventoryReducer(state: InventoryState, action: InventoryAction): InventoryState {
  switch (action.type) {
    case "UPDATE_STOCK": {
      const { productId, newStock, reason, user } = action.payload
      const product = state.products.find((p) => p.id === productId)
      if (!product) return state

      const movement: StockMovement = {
        id: `MOV-${Date.now()}`,
        productId,
        productName: product.name,
        type: newStock > product.stock ? "in" : newStock < product.stock ? "out" : "adjustment",
        quantity: Math.abs(newStock - product.stock),
        previousStock: product.stock,
        newStock,
        reason,
        date: new Date().toISOString().split("T")[0],
        user,
      }

      const updatedProducts = state.products.map((p) =>
        p.id === productId ? { ...p, stock: newStock, inStock: newStock > 0 } : p,
      )

      const lowStockAlerts = updatedProducts.filter((p) => p.stock <= p.minStock && p.stock > 0)

      return {
        ...state,
        products: updatedProducts,
        stockMovements: [movement, ...state.stockMovements],
        lowStockAlerts,
      }
    }

    case "UPDATE_ORDER_STATUS": {
      const { orderId, status } = action.payload
      const updatedOrders = state.orders.map((order) => (order.id === orderId ? { ...order, status } : order))

      // Se o pedido foi concluído, reduzir o estoque
      if (status === "completed") {
        const order = state.orders.find((o) => o.id === orderId)
        if (order && order.status !== "completed") {
          const updatedProducts = [...state.products]
          const newMovements = [...state.stockMovements]

          order.items.forEach((item) => {
            const productIndex = updatedProducts.findIndex((p) => p.id === item.productId)
            if (productIndex !== -1) {
              const product = updatedProducts[productIndex]
              const newStock = Math.max(0, product.stock - item.quantity)

              updatedProducts[productIndex] = {
                ...product,
                stock: newStock,
                inStock: newStock > 0,
              }

              const movement: StockMovement = {
                id: `MOV-${Date.now()}-${item.productId}`,
                productId: item.productId,
                productName: item.name,
                type: "out",
                quantity: item.quantity,
                previousStock: product.stock,
                newStock,
                reason: `Venda - Pedido ${orderId}`,
                date: new Date().toISOString().split("T")[0],
                user: "Sistema",
              }

              newMovements.unshift(movement)
            }
          })

          const lowStockAlerts = updatedProducts.filter((p) => p.stock <= p.minStock && p.stock > 0)

          return {
            ...state,
            orders: updatedOrders,
            products: updatedProducts,
            stockMovements: newMovements,
            lowStockAlerts,
          }
        }
      }

      return {
        ...state,
        orders: updatedOrders,
      }
    }

    case "ADD_ORDER": {
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      }
    }

    case "UPDATE_PRODUCT": {
      const updatedProducts = state.products.map((p) => (p.id === action.payload.id ? action.payload : p))
      const lowStockAlerts = updatedProducts.filter((p) => p.stock <= p.minStock && p.stock > 0)

      return {
        ...state,
        products: updatedProducts,
        lowStockAlerts,
      }
    }

    case "DELETE_PRODUCT": {
      const updatedProducts = state.products.filter((p) => p.id !== action.payload)
      const lowStockAlerts = updatedProducts.filter((p) => p.stock <= p.minStock && p.stock > 0)

      return {
        ...state,
        products: updatedProducts,
        lowStockAlerts,
      }
    }

    default:
      return state
  }
}

export function InventoryProvider({ children }: { children: ReactNode }) {
  const lowStockAlerts = initialProducts.filter((p) => p.stock <= p.minStock && p.stock > 0)

  const [state, dispatch] = useReducer(inventoryReducer, {
    products: initialProducts,
    orders: initialOrders,
    stockMovements: [],
    lowStockAlerts,
  })

  return <InventoryContext.Provider value={{ state, dispatch }}>{children}</InventoryContext.Provider>
}

export function useInventory() {
  const context = useContext(InventoryContext)
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider")
  }
  return context
}
