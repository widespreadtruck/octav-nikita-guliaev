import React, { useState } from "react"
import AssetItem from "../AssetItem/AssetItem"
import { convertToCurrency } from "../../Utils/Utils"
import { useLocation, useNavigate } from "react-router-dom"
import AssetInfoModal from "../AssetInfoModal/AssetInfoModal"
import WalletHeader from "../WalletHeader/WalletHeader"

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
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  // console.log(location)

  const handleModal = (data: any) => {
    // setAssetData(data)
    setIsModalOpen(true)
    navigate(`${location.pathname}/#${data.tokenName}`)
  }

  const assets = Object.values(portfolioSummaryData["portfolioSummaryData"])

  return (
    <>
      {isModalOpen ? (
        <AssetInfoModal />
      ) : (
        <>
          <WalletHeader />

          <ul className="flex flex-col divide-y-0 divide-gray-600 w-full">
            {assets.map((value: any, idx: number) => (
              <AssetItem
                handleModal={handleModal}
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
        </>
      )}
    </>
  )
}

export default WalletAssetsList
