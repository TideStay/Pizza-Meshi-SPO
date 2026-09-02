import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { ORDER_STATUS } from '../data/menu'
import { buildOrderItems, generateOrderId } from '../utils/orderHelpers'

const OrderContext = createContext(null)

/**
 * Central order store — structured for future Firebase onSnapshot wiring.
 * Replace setOrders calls with Firestore reads/writes while keeping the same shape.
 */
export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])

  const createOrder = useCallback(({ customerName, cartItems, paymentMethod = null }) => {
    const newOrder = {
      id: generateOrderId(),
      customerName: customerName.trim(),
      items: buildOrderItems(cartItems),
      createdAt: new Date().toISOString(),
      status: ORDER_STATUS.ACTIVE,
      paymentMethod,
    }

    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }, [])

  const markOrderReady = useCallback((orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: ORDER_STATUS.READY } : order,
      ),
    )
  }, [])

  const activeOrders = useMemo(
    () => orders.filter((order) => order.status === ORDER_STATUS.ACTIVE),
    [orders],
  )

  const backlogOrders = useMemo(
    () =>
      orders
        .filter((order) => order.status === ORDER_STATUS.READY)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [orders],
  )

  const value = useMemo(
    () => ({
      orders,
      activeOrders,
      backlogOrders,
      createOrder,
      markOrderReady,
      setOrders,
    }),
    [orders, activeOrders, backlogOrders, createOrder, markOrderReady],
  )

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
}
