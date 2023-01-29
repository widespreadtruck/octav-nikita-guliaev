import React, { useState, useEffect } from "react"
import AssetItem from "../AssetItem/AssetItem"
import { convertToCurrency } from "../../Utils/Utils"
import { useLocation, useNavigate } from "react-router-dom"
import AssetInfoModal from "../AssetInfoModal/AssetInfoModal"
import WalletHeader from "../WalletHeader/WalletHeader"
import "../../App.css"
import WarningBanner from "../WarningBanner/WarningBanner"

// interface PortfolioSummaryTypes {
//   [key: string]: {
//     // convertedToCurrencyTotalValue: string,
//     [key: string]: {
//       symbol: string
//       chainKey: string
//       balance: number
//       imgSmall: string
//       decimal: number
//       chainContract: string
//       fullStringBalance: string
//       fourDecimalsStringBalance: string
//       latestPrice: string | number
//       assetValue: string | number
//     }
//   }
// }

const WalletAssetsList = (portfolioSummaryData: any): JSX.Element => {
      const [showMessage, setShowMessage] = useState<boolean>(false)

  const assets = Object.values(
    portfolioSummaryData["portfolioSummaryData"]["updatedWalletInfo"]
  )

  const totalWalletValue =
    portfolioSummaryData["portfolioSummaryData"][
      "convertedToCurrencyTotalValue"
    ]

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false)
      }, 3000)

    }
  }, [showMessage])

  return (
    <>
      <WalletHeader totalWalletValue={totalWalletValue} />
      <WarningBanner status={showMessage} />

      <ul className=" flex flex-col divide-y-0 divide-gray-600 w-full">
        {assets.map((value: any, idx: number) => (
          <AssetItem
            triggerWarning={setShowMessage}
            key={`${idx}_${value.symbol}`}
            iconAddress={value.imgSmall}
            tokenName={value.symbol.toUpperCase()}
            symbol={value.symbol}
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
    </>
  )
}

export default WalletAssetsList
