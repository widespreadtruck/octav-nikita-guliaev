import React, { useEffect, useState, useCallback, useMemo } from "react"
import "./App.css"
import axios from "axios"
import { Decimal } from "decimal.js"

interface Error {
  message: string
}

interface Asset {
  balance: number
  chainKey: string
  symbol: string
  imgSmall: string
  decimal: number
  chainContract: string
  latestPrice: string | number
  assetValue: string | number
}

interface Chain {
  key: string
  protocolPositions: {
    WALLET: {
      assets: Asset[]
    }
  }
}

interface Portfolio {
  [key: string]: Chain
}

const App: React.FC = React.memo(() => {
  const [portfolioData, setPortfolioData] = useState<Portfolio | null>(null)
  const [pricesData, setPricesData] = useState<any>(null)
  const [priceQuery, setPriceQuery] = useState<any>("")

  const [portfolioSummary, setPortfolioSummary] = useState<{
    [key: string]: {
      symbol: string
      chainKey: string
      balance: number
      imgSmall: string
      decimal: number
      chainContract: string
      fullStringBalance: string
      fourDecimalsStringBalance: string
      latestPrice: string | number
      assetValue: string | number
    }
  }>({})

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("/wallet")
      setPortfolioData(response.data.assetByProtocols.wallet.chains)
    } catch (err: any) {
      setError({ message: err.message })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const getWalletInformation = useMemo(() => {
    if (!portfolioData) return

    const walletAssetInfo: {
      [key: string]: {
        symbol: string
        chainKey: string
        balance: any
        imgSmall: string
        decimal: number
        chainContract: string
        latestPrice: string | number
        assetValue: string | number
        fullStringBalance: null | string
        fourDecimalsStringBalance: null | string
      }
    } = {}

    Object.values(portfolioData).forEach((chain) => {
      chain.protocolPositions.WALLET.assets.forEach((asset) => {
        if (!walletAssetInfo[asset.symbol]) {
          walletAssetInfo[asset.symbol] = {
            symbol: asset.symbol,
            chainKey: chain.key,
            balance: asset.balance,
            imgSmall: asset.imgSmall,
            decimal: asset.decimal,
            chainContract: asset.chainContract,
            fullStringBalance: null,
            fourDecimalsStringBalance: null,
            latestPrice: "N/A",
            assetValue: "N/A",
          }
        } else {
          walletAssetInfo[asset.symbol].balance += asset.balance
        }
      })
    })

    return walletAssetInfo
  }, [portfolioData])

  function convertToDecimals(num: number, decimal: number) {
    // mathematically correctly convert and round numbers
    const decimalNum = new Decimal(num)
    return decimalNum
      .mul(new Decimal(10).pow(decimal))
      .floor()
      .div(new Decimal(10).pow(decimal))
      .toFixed(decimal)
  }

  const convertBalances = (obj: any) => {
    for (let token in obj) {
      //get a full balance as a regular number as a string
      obj[token].fullStringBalance = convertToDecimals(
        obj[token].balance,
        obj[token].decimal
      )
      // get the balance rounded up to 4 decimals
      if (obj[token].decimal >= 4) {
        obj[token].fourDecimalsStringBalance = convertToDecimals(
          obj[token].balance,
          4
        )
      } else {
        obj[token].fourDecimalsStringBalance = convertToDecimals(
          obj[token].balance,
          obj[token].decimal
        )
      }
    }
    return obj
  }

  // const fetchPrices = useCallback(async (query: any) => {
  //   axios
  //     .get(`http://localhost:3001/get-prices/${query}`)
  //     .then((response) => {
  //       // console.log("DATA+++++++++", response.data)
  //       setPricesData(response.data)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }, [])

  useEffect(() => {
    if (portfolioData) {
      const copyWalletInfo = getWalletInformation
      if (copyWalletInfo) {
        const updatedWalletInfo = convertBalances(copyWalletInfo)

        let priceQuery = ""
        for (let asset in updatedWalletInfo) {
          priceQuery += `${updatedWalletInfo[asset].chainContract},`
        }
        // console.log("===============", priceQuery)

        axios
          .get(`http://localhost:3001/get-prices/${priceQuery}`)
          .then((response) => {
            const assetPriceData = response.data.coins
            // console.log("response.data+++++++++", assetPriceData)
            // console.log("updatedWalletInfo+++++++++", updatedWalletInfo)
            // setPricesData(response.data)

            for (const key in assetPriceData) {
              // console.log(assetPriceData[key].symbol.toUpperCase())
              const symbol = assetPriceData[key].symbol.toUpperCase()
              const price = assetPriceData[key].price
              for (const walletKey in updatedWalletInfo) {
                if (walletKey.toUpperCase() === symbol) {
                  const balance = updatedWalletInfo[walletKey].balance
                  // console.log('symbol', updatedWalletInfo[walletKey].symbol)
                  // console.log('price',price)
                  updatedWalletInfo[walletKey].latestPrice = price
                  updatedWalletInfo[walletKey].assetValue = price * balance
                  // console.log(symbol, price, balance)
                }
              }
            }
            setPortfolioSummary(updatedWalletInfo)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }, [portfolioData, getWalletInformation])

  console.log({ portfolioSummary })

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

  const AssetItem = ({
    iconAddress,
    tokenName,
    fourDecimalsBalance,
    latestPrice,
    assetValue,
  }: {
    iconAddress: string
    tokenName: string
    fourDecimalsBalance: string
    latestPrice: string | number
    assetValue: string | number
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
              {latestPrice}
              {/* {latestPrice !== "N/A" ? `$${latestPrice}` : "N/A"} */}
            </div>
          </div>

          <div className="grid justify-items-stretch">
            <div className="text-gray-600 dark:text-gray-200 font-medium justify-self-end">
              {assetValue}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-200 justify-self-end">
              {fourDecimalsBalance}
            </div>
          </div>

          <button className="flex justify-end w-8 text-right">
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

  const convertToCurr = (num: number, decimals: number | null) => {
    const balance = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: decimals || 2,
    })
    return balance.format(num)
  }

  // console.log(`Pounds: ${pounds.format(price)}`

  return (
    <>
      {!portfolioSummary ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="container flex flex-col items-center justify-center w-full mx-auto">
            <ul className="flex flex-col">
              {Object.values(portfolioSummary).map((value) => (
                <AssetItem
                  key={value.symbol}
                  iconAddress={value.imgSmall}
                  tokenName={value.symbol.toUpperCase()}
                  fourDecimalsBalance={value.fourDecimalsStringBalance}
                  // latestPrice={value.latestPrice}
                  latestPrice={
                    typeof value.latestPrice === "number"
                      ? convertToCurr(value.latestPrice, value.decimal)
                      : value.latestPrice
                  }
                  assetValue={
                    typeof value.assetValue === "number"
                      ? convertToCurr(value.assetValue, null)
                      : value.assetValue
                  }
                />
              ))}
            </ul>
          </div>

          <pre>{JSON.stringify(portfolioData, null, 2)}</pre>
        </div>
      )}
    </>
  )
})

export default App
