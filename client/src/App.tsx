import React, { useEffect, useState, useCallback, useMemo } from "react"
import "./App.css"
import axios from "axios"
import { convertToDecimals, convertToCurrency } from "./Utils/Utils"
import Spinner from "./components/Spinner"
import WalletAssetsList from "./components/WalletAssetsList/WalletAssetsList"
import WalletHeader from "./components/WalletHeader/WalletHeader"
import usePortfolioData from "./components/hooks/usePortfolioData"
import * as S from "./App.styles"

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

const App: React.FC = React.memo(() => {
  const portfolioData = usePortfolioData()

  const [portfolioSummary, setPortfolioSummary] =
    useState<PortfolioSummaryTypes>({})
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [error, setError] = useState<Error | null>(null)

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

  useEffect(() => {
    if (portfolioData) {
      const copyWalletInfo = getWalletInformation
      if (copyWalletInfo) {
        const updatedWalletInfo = convertBalances(copyWalletInfo)

        let priceQuery = ""
        for (let asset in updatedWalletInfo) {
          priceQuery += `${updatedWalletInfo[asset].chainContract},`
        }

        axios
          .get(`http://localhost:3001/get-prices/${priceQuery}`)
          .then((response) => {
            const assetPriceData = response.data.coins

            for (const key in assetPriceData) {
              // console.log(assetPriceData[key].symbol.toUpperCase())
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
        <Spinner />
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
