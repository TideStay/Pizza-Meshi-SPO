import { useCallback, useState } from 'react'
import Cart from '../components/cashier/Cart'
import CheckoutModal from '../components/cashier/CheckoutModal'
import MenuGrid from '../components/cashier/MenuGrid'
import { useOrders } from '../context/OrderContext'
import { PIZZA_MENU } from '../data/menu'
import { calculateCartTotal } from '../utils/orderHelpers'

export default function CashierView() {
  const { createOrder } = useOrders()
  const [cartItems, setCartItems] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const total = calculateCartTotal(cartItems)
  const canSend = cartItems.length > 0 && customerName.trim().length > 0

  const showFeedback = useCallback((message, type = 'success') => {
    setFeedback({ message, type })
    setTimeout(() => setFeedback(null), 3000)
  }, [])

  const handleAddItem = useCallback((pizza) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === pizza.id)
      if (existing) {
        return prev.map((item) =>
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { ...pizza, quantity: 1 }]
    })
  }, [])

  const handleUpdateQuantity = useCallback((id, quantity) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    )
  }, [])

  const handleRemoveItem = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const handleSendToKitchen = useCallback(() => {
    if (!customerName.trim()) {
      showFeedback('Please enter the customer name.', 'error')
      return
    }
    if (cartItems.length === 0) {
      showFeedback('Add at least one pizza to the cart.', 'error')
      return
    }

    createOrder({
      customerName,
      cartItems,
      paymentMethod: selectedPayment,
    })

    setCartItems([])
    setCustomerName('')
    setSelectedPayment(null)
    showFeedback('Order sent to kitchen!')
  }, [cartItems, customerName, createOrder, selectedPayment, showFeedback])

  return (
    <div className="relative flex min-h-[calc(100vh-65px)] flex-col lg:flex-row">
      {feedback && (
        <div
          className={[
            'absolute right-4 top-4 z-30 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-lg',
            feedback.type === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-emerald-500 text-white',
          ].join(' ')}
          role="status"
        >
          {feedback.message}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-5 sm:p-6 lg:w-[70%] lg:flex-none">
        <MenuGrid menu={PIZZA_MENU} onAddItem={handleAddItem} />
      </div>

      <div className="border-t border-slate-200 lg:w-[30%] lg:flex-none lg:border-l lg:border-t-0">
        <div className="lg:sticky lg:top-[65px] lg:h-[calc(100vh-65px)]">
          <Cart
            items={cartItems}
            total={total}
            customerName={customerName}
            onCustomerNameChange={setCustomerName}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={() => setIsCheckoutOpen(true)}
            onSendToKitchen={handleSendToKitchen}
            selectedPayment={selectedPayment}
            canSend={canSend}
          />
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPayment={selectedPayment}
        onSelectPayment={setSelectedPayment}
      />
    </div>
  )
}
