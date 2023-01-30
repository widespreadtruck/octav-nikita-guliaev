import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import WalletPage from "./pages/WalletPage/WalletPage"
import AssetInfoModal from "./components/AssetInfoModal/AssetInfoModal"

const App = () => {
  return (
    <Routes>
      <Route path="/wallet/:itemSymbol" element={<AssetInfoModal />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/" element={<Navigate to="/wallet" />} />
    </Routes>
  )
}

export default App
