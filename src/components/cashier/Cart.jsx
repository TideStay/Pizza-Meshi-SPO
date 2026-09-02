import { formatPrice } from '../../utils/orderHelpers'

export default function Cart({
  items,
  total,
  customerName,
  onCustomerNameChange,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onSendToKitchen,
  selectedPayment,
  canSend,
}) {
  return (
    <aside className="flex h-full flex-col bg-slate-50">
      <div className="border-b border-slate-200 px-5 py-5">
        <h2 className="text-lg font-bold text-slate-900">Current Order</h2>
        <p className="text-sm text-slate-500">{items.length} item(s) in cart</p>
      </div>

      <div className="border-b border-slate-200 px-5 py-4">
        <label htmlFor="customer-name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Customer Name
        </label>
        <input
          id="customer-name"
          type="text"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          placeholder="Enter customer name..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-pizza-500 focus:outline-none focus:ring-2 focus:ring-pizza-500/20"
        />
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-5 py-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="mb-2 text-3xl opacity-40" aria-hidden="true">
              🛒
            </span>
            <p className="text-sm font-medium text-slate-400">Cart is empty</p>
            <p className="mt-1 text-xs text-slate-400">Add pizzas from the menu</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500">{formatPrice(item.price)} each</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                  aria-label={`Decrease ${item.name} quantity`}
                >
                  −
                </button>
                <span className="w-5 text-center text-sm font-bold text-slate-900">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                  aria-label={`Increase ${item.name} quantity`}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  className="ml-1 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                  aria-label={`Remove ${item.name}`}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-auto border-t border-slate-200 bg-white px-5 py-5 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
        <div className="mb-5 flex items-end justify-between">
          <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Total
          </span>
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            {formatPrice(total)}
          </span>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full rounded-xl border-2 border-slate-900 bg-white py-3.5 text-sm font-bold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Checkout
            {selectedPayment && (
              <span className="ml-1 text-xs font-semibold capitalize text-pizza-600">
                · {selectedPayment}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={onSendToKitchen}
            disabled={!canSend}
            className="w-full rounded-xl bg-pizza-600 py-4 text-base font-bold text-white shadow-md transition hover:bg-pizza-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send to Kitchen
          </button>
        </div>
      </div>
    </aside>
  )
}
