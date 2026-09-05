import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { OrderProvider } from './context/OrderContext'
import CashierView from './views/CashierView'
import KitchenView from './views/KitchenView'

export default function App() {
  return (
    <OrderProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<CashierView />} />
            <Route path="kitchen" element={<KitchenView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </OrderProvider>
  )
}
