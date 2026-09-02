function DummyQRCode({ label }) {
  const cells = Array.from({ length: 49 }, (_, i) => {
    const row = Math.floor(i / 7)
    const col = i % 7
    const isCorner =
      (row < 2 && col < 2) ||
      (row < 2 && col > 4) ||
      (row > 4 && col < 2)
    const filled = isCorner || (row + col + i) % 3 === 0
    return filled
  })

  return (
    <div className="flex flex-col items-center">
      <div
        className="grid grid-cols-7 gap-0.5 rounded-xl border-2 border-slate-900 bg-white p-3"
        aria-label={`${label} QR code placeholder`}
      >
        {cells.map((filled, index) => (
          <div
            key={index}
            className={`h-4 w-4 sm:h-5 sm:w-5 ${filled ? 'bg-slate-900' : 'bg-white'}`}
          />
        ))}
      </div>
      <p className="mt-2 text-xs font-medium text-slate-500">Scan to pay via {label}</p>
    </div>
  )
}

function PaymentOption({ method, label, icon, selected, onSelect, showQR }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(method)}
      className={[
        'w-full rounded-xl border-2 p-4 text-left transition-all',
        selected
          ? 'border-pizza-500 bg-pizza-50 shadow-sm'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm',
      ].join(' ')}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">
          {icon}
        </span>
        <span className="font-bold text-slate-900">{label}</span>
        {selected && (
          <span className="ml-auto rounded-full bg-pizza-600 px-2.5 py-0.5 text-xs font-bold text-white">
            Selected
          </span>
        )}
      </div>
      {showQR && selected && (
        <div className="mt-4 flex justify-center">
          <DummyQRCode label={label} />
        </div>
      )}
    </button>
  )
}

export default function CheckoutModal({ isOpen, onClose, selectedPayment, onSelectPayment }) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
          <h2 id="checkout-title" className="text-lg font-bold text-slate-900">
            Payment
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
            aria-label="Close payment modal"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 p-6">
          <PaymentOption
            method="cash"
            label="Cash"
            icon="💵"
            selected={selectedPayment === 'cash'}
            onSelect={onSelectPayment}
          />
          <PaymentOption
            method="mbway"
            label="MBWay"
            icon="📱"
            selected={selectedPayment === 'mbway'}
            onSelect={onSelectPayment}
            showQR
          />
          <PaymentOption
            method="revolut"
            label="Revolut"
            icon="💳"
            selected={selectedPayment === 'revolut'}
            onSelect={onSelectPayment}
            showQR
          />
        </div>

        <div className="border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  )
}
