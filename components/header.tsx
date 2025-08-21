"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Menu, X, Phone, Mail, Settings } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state, dispatch } = useCart()

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(11) 94712-1877</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>vendas@albsistemas.com.br</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>Soluções em sistemas para todo o Brasil</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <a href="/admin">
                <Settings className="h-4 w-4 mr-1" />
                Admin
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image src="/logo-alb.png" alt="ALB Sistemas" width={180} height={60} className="h-12 w-auto" />
            <Badge variant="secondary" className="ml-3 text-xs">
              Sistemas
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Início
            </a>
            <a href="#sistemas" className="text-foreground hover:text-primary transition-colors font-medium">
              Sistemas
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Soluções
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Suporte
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Contato
            </a>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="relative bg-transparent"
              onClick={() => dispatch({ type: "OPEN_CART" })}
            >
              <ShoppingCart className="h-4 w-4" />
              {state.itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {state.itemCount}
                </Badge>
              )}
            </Button>

            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
                Início
              </a>
              <a href="#sistemas" className="text-foreground hover:text-primary transition-colors font-medium">
                Sistemas
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
                Soluções
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
                Suporte
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
                Contato
              </a>
              <a href="/admin" className="text-foreground hover:text-primary transition-colors font-medium">
                <Settings className="h-4 w-4 mr-2 inline" />
                Admin
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
