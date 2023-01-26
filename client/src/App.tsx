import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import WalletPage from "./pages/WalletPage/WalletPage"

const App = () => {
  return (
    <Routes>
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/" element={<Navigate to="/wallet" />} />
    </Routes>
  )
}

export default App
