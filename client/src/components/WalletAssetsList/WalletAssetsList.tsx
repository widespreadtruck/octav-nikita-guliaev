import React from "react"
import AssetItem from "../AssetItem/AssetItem"
import { convertToCurrency } from "../../Utils/Utils"

interface PortfolioSummaryTypes {
  [key: string]: {
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
}

const WalletAssetsList = (
  portfolioSummaryData: PortfolioSummaryTypes
): JSX.Element => {
  const assets = Object.values(portfolioSummaryData["portfolioSummaryData"])

  return (
    <ul className="flex flex-col divide-y-0 divide-gray-600 w-full">
      {assets.map((value: any, idx: number) => (
        <AssetItem
          key={`${idx}_${value.symbol}`}
          iconAddress={value.imgSmall}
          tokenName={value.symbol.toUpperCase()}
          fourDecimalsBalance={value.fourDecimalsStringBalance}
          latestPrice={
            typeof value.latestPrice === "number"
              ? convertToCurrency(value.latestPrice, value.decimal)
              : value.latestPrice
          }
          assetValue={
            typeof value.assetValue === "number"
              ? convertToCurrency(value.assetValue, null)
              : value.assetValue
          }
        />
      ))}
    </ul>
  )
}

export default WalletAssetsList
