import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { OrderProvider } from './context/OrderContext'
import CashierView from './views/CashierView'
import KitchenView from './views/KitchenView'

export default function App() {
  return (
    <OrderProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<CashierView />} />
            <Route path="kitchen" element={<KitchenView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </OrderProvider>
  )
}
