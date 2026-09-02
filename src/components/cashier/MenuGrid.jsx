import { formatPrice } from '../../utils/orderHelpers'

export default function MenuGrid({ menu, onAddItem }) {
  return (
    <section aria-label="Pizza menu">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Menu</h2>
        <p className="mt-1 text-sm text-slate-500">Select items to add to the order</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {menu.map((pizza) => (
          <article
            key={pizza.id}
            className="flex flex-col rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-2xl"
                aria-hidden="true"
              >
                {pizza.emoji}
              </span>
              <span className="rounded-lg bg-pizza-50 px-3 py-1 text-sm font-bold text-pizza-700">
                {formatPrice(pizza.price)}
              </span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">{pizza.name}</h3>
            <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-500">
              {pizza.description}
            </p>
            <button
              type="button"
              onClick={() => onAddItem(pizza)}
              className="mt-4 w-full rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
            >
              + Add to Cart
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
