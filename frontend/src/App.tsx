import { BrowserRouter, Route, Routes } from 'react-router-dom'

import {
  Dashboard,
  Home,
  Login,
  NotFound,
  Records,
  Register,
} from './pages/Placeholders'

/**
 * Route table. The `AppLayout` wrapper and navigation arrive in UI-02;
 * for now each route renders its page directly.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/records" element={<Records />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}