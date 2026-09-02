import OrderCard from '../components/kitchen/OrderCard'
import { useOrders } from '../context/OrderContext'

export default function KitchenView() {
  const { activeOrders, backlogOrders, markOrderReady } = useOrders()

  return (
    <div className="p-5 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Kitchen Dashboard</h2>
          <p className="mt-1 text-sm text-slate-500">Manage active orders in real time</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-pizza-100 px-3 py-1 text-sm font-semibold text-pizza-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-pizza-500" />
            {activeOrders.length} active
          </span>
        </div>
      </div>

      <section aria-label="Active orders" className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Active Orders
          </h3>
        </div>
        {activeOrders.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white py-20 text-center">
            <span className="text-5xl" aria-hidden="true">
              👨‍🍳
            </span>
            <p className="mt-3 text-base font-medium text-slate-500">No active orders</p>
            <p className="mt-1 text-sm text-slate-400">New orders from the cashier will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {activeOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onMarkReady={markOrderReady}
                showTimer
              />
            ))}
          </div>
        )}
      </section>

      <section aria-label="Order history">
        <div className="mb-4 flex items-center gap-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Backlog / History
          </h3>
          <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-600">
            {backlogOrders.length}
          </span>
        </div>
        {backlogOrders.length === 0 ? (
          <p className="rounded-xl border border-slate-200 bg-white px-4 py-6 text-sm text-slate-400">
            Completed orders will appear here
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {backlogOrders.map((order) => (
              <OrderCard key={order.id} order={order} showTimer={false} isBacklog />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
