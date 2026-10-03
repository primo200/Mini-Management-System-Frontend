import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AppLayout from './components/layout/AppLayout'
import {
  Dashboard,
  Home,
  Login,
  NotFound,
  Records,
  Register,
} from './pages/Placeholders'

/**
 * Route table.
 *
 * The public pages sit outside `AppLayout` because they render their own
 * centred card; everything else renders inside the shared shell.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/records" element={<Records />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}