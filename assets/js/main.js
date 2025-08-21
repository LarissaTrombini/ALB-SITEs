// Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || []

// Update cart count
function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length
}

// Add to cart
function addToCart(systemId) {
  const system = findSystemById(systemId)
  if (system) {
    cart.push(system)
    localStorage.setItem("cart", JSON.stringify(cart))
    updateCartCount()
    showNotification("Sistema adicionado ao carrinho!")
  }
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1)
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  renderCart()
}

// Find system by ID
function findSystemById(id) {
  const systems = {
    erp: { id: "erp", nome: "ERP Empresarial", preco: "R$ 299/mês" },
    pdv: { id: "pdv", nome: "PDV Completo", preco: "R$ 149/mês" },
    estoque: { id: "estoque", nome: "Gestão de Estoque", preco: "R$ 99/mês" },
    rh: { id: "rh", nome: "Sistema de RH", preco: "R$ 199/mês" },
    crm: { id: "crm", nome: "CRM Avançado", preco: "R$ 179/mês" },
    contabilidade: { id: "contabilidade", nome: "Sistema Contábil", preco: "R$ 249/mês" },
  }
  return systems[id]
}

// Toggle cart
function toggleCart() {
  const overlay = document.getElementById("cart-overlay")
  const drawer = document.getElementById("cart-drawer")

  if (!overlay) {
    createCartElements()
  }

  document.getElementById("cart-overlay").classList.toggle("active")
  document.getElementById("cart-drawer").classList.toggle("active")
  renderCart()
}

// Create cart elements
function createCartElements() {
  // Create overlay
  const overlay = document.createElement("div")
  overlay.id = "cart-overlay"
  overlay.className = "cart-overlay"
  overlay.onclick = toggleCart
  document.body.appendChild(overlay)

  // Create drawer
  const drawer = document.createElement("div")
  drawer.id = "cart-drawer"
  drawer.className = "cart-drawer"
  drawer.innerHTML = `
        <div class="cart-header">
            <h3>Carrinho</h3>
            <button class="close-cart" onclick="toggleCart()">×</button>
        </div>
        <div class="cart-content" id="cart-items"></div>
        <div class="cart-total" id="cart-total"></div>
        <div class="cart-actions">
            <button class="btn btn-primary" onclick="checkout()">Finalizar Pedido</button>
            <button class="btn btn-secondary" onclick="clearCart()">Limpar Carrinho</button>
        </div>
    `
  document.body.appendChild(drawer)
}

// Render cart
function renderCart() {
  const cartItems = document.getElementById("cart-items")
  const cartTotal = document.getElementById("cart-total")

  if (!cartItems) return

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Carrinho vazio</p>"
    cartTotal.innerHTML = ""
    return
  }

  cartItems.innerHTML = cart
    .map(
      (item, index) => `
        <div class="cart-item">
            <div>
                <h4>${item.nome}</h4>
                <p>${item.preco}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">Remover</button>
        </div>
    `,
    )
    .join("")

  cartTotal.innerHTML = `Total: ${cart.length} sistema(s)`
}

// Clear cart
function clearCart() {
  cart = []
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  renderCart()
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Carrinho vazio!")
    return
  }

  alert("Redirecionando para WhatsApp...")
  const message = `Olá! Gostaria de contratar os seguintes sistemas:\n\n${cart.map((item) => `- ${item.nome} (${item.preco})`).join("\n")}`
  const whatsappUrl = `https://wa.me/5511947121877?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

// Mobile menu toggle
function toggleMobileMenu() {
  document.getElementById("mobile-menu").classList.toggle("active")
}

// Show notification
function showNotification(message) {
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
})

// Add CSS animation
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
`
document.head.appendChild(style)
