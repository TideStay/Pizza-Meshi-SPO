import { useElapsedTime } from '../../hooks/useElapsedTime'
import { formatPrice } from '../../utils/orderHelpers'

export default function OrderCard({ order, onMarkReady, showTimer = true, isBacklog = false }) {
  const { elapsed, isOverdue } = useElapsedTime(order.createdAt)

  return (
    <article
      className={[
        'flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md',
        isBacklog ? 'border-slate-200 opacity-75' : 'border-slate-200',
        isOverdue && showTimer ? 'ring-2 ring-red-200' : '',
      ].join(' ')}
    >
      <header
        className={[
          'flex items-center justify-between gap-3 px-4 py-3',
          isBacklog ? 'bg-slate-100' : 'bg-slate-900',
        ].join(' ')}
      >
        <div className="min-w-0">
          <h3
            className={[
              'truncate text-base font-bold',
              isBacklog ? 'text-slate-700' : 'text-white',
            ].join(' ')}
          >
            {order.customerName}
          </h3>
          <p className={['text-xs', isBacklog ? 'text-slate-500' : 'text-slate-400'].join(' ')}>
            {new Date(order.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            {isBacklog && ' · Completed'}
          </p>
        </div>
        {showTimer && (
          <div className="shrink-0 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Elapsed
            </p>
            <p
              className={[
                'font-mono text-xl font-extrabold tabular-nums',
                isOverdue ? 'text-red-500' : 'text-white',
              ].join(' ')}
            >
              {elapsed}
            </p>
          </div>
        )}
      </header>

      <div className="flex flex-1 flex-col p-4">
        <ul className="mb-4 flex-1 space-y-2">
          {order.items.map((item) => (
            <li
              key={`${order.id}-${item.pizzaId}`}
              className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
            >
              <span className="font-medium text-slate-800">
                <span className="mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded bg-slate-200 text-xs font-bold text-slate-700">
                  {item.quantity}
                </span>
                {item.name}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        {order.paymentMethod && (
          <p className="mb-3 text-xs font-medium capitalize text-slate-400">
            Paid via {order.paymentMethod}
          </p>
        )}

        {onMarkReady && (
          <button
            type="button"
            onClick={() => onMarkReady(order.id)}
            className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
          >
            Mark as Ready
          </button>
        )}
      </div>
    </article>
  )
}
