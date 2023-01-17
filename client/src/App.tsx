import React, { useEffect, useState } from "react"
import "./App.css"
import axios from "axios"

interface Error {
  message: any
}

const App: React.FC = () => {
  const [walletData, setWalletData] = useState<object | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get("/wallet")
        setWalletData(response.data)
      } catch (err) {
        setError({ message: err })
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
