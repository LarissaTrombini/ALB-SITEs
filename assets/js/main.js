// Carrinho de compras
let cart = []

function addToCart(id, name, price) {
  const existingItem = cart.find((item) => item.id === id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      quantity: 1,
    })
  }

  updateCartCount()
  showNotification(`${name} adicionado ao carrinho!`)
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  document.getElementById("cartCount").textContent = totalItems
}

function toggleCart() {
  const sidebar = document.getElementById("cartSidebar")
  const overlay = document.getElementById("cartOverlay")

  if (sidebar.classList.contains("open")) {
    sidebar.classList.remove("open")
    overlay.classList.remove("show")
  } else {
    sidebar.classList.add("open")
    overlay.classList.add("show")
    updateCartDisplay()
  }
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cartItems")
  const cartTotal = document.getElementById("cartTotal")

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Seu carrinho está vazio</p>"
    cartTotal.textContent = "R$ 0,00"
    return
  }

  let html = ""
  let total = 0

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity
    total += itemTotal

    html += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                <p><strong>R$ ${itemTotal.toFixed(2)}</strong></p>
                <button onclick="removeFromCart('${item.id}')">Remover</button>
            </div>
        `
  })

  cartItems.innerHTML = html
  cartTotal.textContent = `R$ ${total.toFixed(2)}`
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id)
  updateCartCount()
  updateCartDisplay()
}

function showNotification(message) {
  // Criar notificação simples
  const notification = document.createElement("div")
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        z-index: 1001;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    document.body.removeChild(notification)
  }, 3000)
}

function sendWhatsApp() {
  if (cart.length === 0) {
    alert("Adicione itens ao carrinho primeiro!")
    return
  }

  let message = "Olá! Gostaria de solicitar um orçamento para os seguintes sistemas:\n\n"
  let total = 0

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity
    total += itemTotal
    message += `• ${item.name} - Qtd: ${item.quantity} - R$ ${itemTotal.toFixed(2)}\n`
  })

  message += `\nTotal: R$ ${total.toFixed(2)}\n\nAguardo retorno!`

  const whatsappUrl = `https://wa.me/5511947121877?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

// Fechar carrinho ao clicar no overlay
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("cartOverlay")
  if (overlay) {
    overlay.addEventListener("click", toggleCart)
  }
})
