import React, { useEffect, useState, useCallback, useMemo } from "react"
import "./App.css"
import axios from "axios"
import { convertToDecimals, convertToCurrency } from "./Utils/Utils"
import Spinner from "./components/Spinner/Spinner"
import SkeletonLoader from "./components/SkeletonLoader/SkeletonLoader"
import WalletAssetsList from "./components/WalletAssetsList/WalletAssetsList"
import WalletHeader from "./components/WalletHeader/WalletHeader"
import usePortfolioData from "./components/hooks/usePortfolioData"
import * as S from "./App.styles"

interface Error {
  message: string
}

interface PortfolioSummaryTypes {
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
}

interface WalletAssetInfoTypes {
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
}

const App: React.FC = React.memo(() => {
  const portfolioData = usePortfolioData()

  const [portfolioSummary, setPortfolioSummary] =
    useState<PortfolioSummaryTypes>({})
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const getWalletInformation = useMemo(() => {
    // this sums up all balances of the same token
    // across different chains
    // ie. ETH is on 3 diff chains, so we need to show ETH balance as a sum

    // Also,
    // this func adds more keys that would be used later
    // ie. fullStringBalance (non-scientific num),
    // or latestPrice, assetValue etc
    if (!portfolioData) return

    const walletAssetInfo: WalletAssetInfoTypes = {}

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

  const convertBalances = (obj: any) => {
    // this func deals converts scientific nums to regular nums
    // by using "convertToDecimals" which is using "decimal.js"
    // to mathematically correctly convert and round the large nums
    for (let token in obj) {
      //get a full balance as a regular number as a string
      obj[token].fullStringBalance = convertToDecimals(
        obj[token].balance,
        obj[token].decimal
      )
      // get the balance rounded up to 4 decimals
      // or if there is 0 decimals, to round nums
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

  useEffect(() => {
    if (portfolioData) {
      const copyWalletInfo = getWalletInformation
      if (copyWalletInfo) {
        const updatedWalletInfo = convertBalances(copyWalletInfo)

        let priceQuery = ""
        // this gets the info required to create the query for the DefiLLama price API call
        for (let asset in updatedWalletInfo) {
          priceQuery += `${updatedWalletInfo[asset].chainContract},`
        }

        axios
          .get(`/get-prices/${priceQuery}`)
          .then((response) => {
            const assetPriceData = response.data.coins
            // add the Price data from DefiLlama to our object
            for (const key in assetPriceData) {
              const symbol = assetPriceData[key].symbol.toUpperCase()
              const price = assetPriceData[key].price
              for (const walletKey in updatedWalletInfo) {
                if (walletKey.toUpperCase() === symbol) {
                  const balance = updatedWalletInfo[walletKey].balance
                  updatedWalletInfo[walletKey].latestPrice = price
                  updatedWalletInfo[walletKey].assetValue = price * balance
                }
              }
            }
            setPortfolioSummary(updatedWalletInfo)
            setIsLoading(false)
          })
          .catch((error) => {
            setError(error)
          })
      }
    }
  }, [portfolioData, getWalletInformation])

  // console.log({ portfolioSummary })

  if (isLoading) {
    return (
      <S.Container>
        {/* <Spinner /> */}
        <SkeletonLoader />
      </S.Container>
    )
  }

  if (error) {
    return (
      <S.Container>
        <p>An error occurred: {error.message}. Please call our Support.</p>
      </S.Container>
    )
  }

  return (
    <S.Content>
      <S.InnerWrapper className="listItem">
        <WalletHeader />
        <WalletAssetsList portfolioSummaryData={portfolioSummary} />
      </S.InnerWrapper>
    </S.Content>
  )
})

export default App
