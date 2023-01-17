import React, { useEffect, useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import axios from "axios"

function App() {
  const [walletData, setWalletData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const response = await axios.get("/wallet")
        setWalletData(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>
  }

  if (!walletData) {
    return null
  }

  return (
    <div>
      <pre>{JSON.stringify(walletData, null, 2)}</pre>
    </div>
  )
}

export default App
