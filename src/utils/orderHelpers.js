export function generateOrderId() {
  return `order-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function formatElapsedTime(createdAt) {
  const totalSeconds = getElapsedSeconds(createdAt)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function getElapsedSeconds(createdAt) {
  const diffMs = Date.now() - new Date(createdAt).getTime()
  return Math.max(0, Math.floor(diffMs / 1000))
}

export function calculateCartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function buildOrderItems(cartItems) {
  return cartItems.map(({ id, name, price, quantity }) => ({
    pizzaId: id,
    name,
    price,
    quantity,
  }))
}
