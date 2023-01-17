import React, { useEffect, useState } from "react"
import "./App.css"
import axios from "axios"

interface Error {
  message: string
}

const App: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<{
    assetByProtocols: {
      wallet: { chains: Record<string, { imgSmall: string }> }
    }
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("/wallet")
      setPortfolioData(response.data)
    } catch (err: any) {
      setError({ message: err.message })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return (
      <div>
        <p>An error occurred: {error.message}</p>
      </div>
    )
  }

  if (!portfolioData) {
    return null
  }

  if (!isLoading && error == null) {
    // console.log(portfolioData)
    console.log(portfolioData.assetByProtocols.wallet.chains)

    // Object.entries(portfolioData.assetByProtocols.wallet.chains).map(
    //   ([key, value]) => console.log(value)
    // )
  }

  const AssetItem = ({
    iconAddress,
    tokenName,
  }: {
    iconAddress: string
    tokenName: string
  }) => {
    return (
      <li className="flex flex-row mb-2 border-gray-400">
        <div className="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
          <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
            <div>
              <img
                alt="profile"
                src={iconAddress}
                className="mx-auto object-cover rounded-full h-10 w-10 "
              />
            </div>
          </div>
          <div className="flex-1 pl-1 md:mr-16">
            <div className="font-medium dark:text-white">{tokenName}</div>
            <div className="text-sm text-gray-600 dark:text-gray-200">
              Price
            </div>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-200">
            Balance
          </div>
          <button className="flex justify-end w-24 text-right">
            <svg
              width="12"
              fill="currentColor"
              height="12"
              className="text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
            </svg>
          </button>
        </div>
      </li>
    )
  }

  return (
    <>
      {isLoading || error != null ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="container flex flex-col items-center justify-center w-full mx-auto">
            <ul className="flex flex-col">
              {Object.entries(portfolioData.assetByProtocols.wallet.chains).map(
                ([key, value]) => (
                  <AssetItem
                    key={key}
                    iconAddress={value.imgSmall}
                    tokenName={key}
                  />
                )
              )}
            </ul>
          </div>

          <pre>{JSON.stringify(portfolioData, null, 2)}</pre>
        </div>
      )}
    </>
  )
}

export default App
