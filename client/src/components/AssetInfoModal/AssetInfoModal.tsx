import React, { useEffect, useState, useCallback, useMemo } from "react"
import usePortfolioData from "../../components/hooks/usePortfolioData"
import { useLocation } from "react-router-dom"
import { RootState } from "../../store/index"
import { useSelector, useDispatch } from "react-redux"
import * as S from "./AssetInfoModal.styles"
import Spinner from "../Spinner/Spinner"
import WarningBanner from "../WarningBanner/WarningBanner"
import axios from "axios"
import {
  convertToCurrency,
  convertToDecimals,
} from "../../Utils/Utils"
import styled from "styled-components"

const ListItem = styled.div`
  min-width: 700px;
  max-width: 1000px;
  width: 100%;
`

const AssetInfoModal = () => {
  const portfolioData = usePortfolioData()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [assetData, setAssetData] = useState<any>({})

  const location = useLocation()

  const getAsset = (str: string) => {
    const lastSlashIndex = str.lastIndexOf("/")
    return str.substring(lastSlashIndex + 1)
  }
  const assetSymbol = getAsset(location.pathname)

  const handleGoBack = () => {
    window.history.back()
  }

  useEffect(() => {
    if (!portfolioData) return
    let assetsInfo: any = []
    let assetCompleteInfo: any = {}
    let query: string = ""
    let totalBalance: number = 0
    let purchasePrice: any = 0
    let positiveReturn: boolean = false
    let openPnLPercentage: number = 0
    let decimal: number = 0
    let name: string = ""

    Object.values(portfolioData.wallet.chains).forEach((chain) => {
      chain.protocolPositions.WALLET.assets.forEach((asset) => {
        if (asset.symbol === assetSymbol) {
          assetsInfo.push(asset)
          query = asset.chainContract
          totalBalance += asset.balance
          purchasePrice = asset.price
          decimal = asset.decimal
          name = asset.name
        }
      })
    })

    if (query.length !== 0) {
      try {
        axios.get(`/get-prices/${query}`).then((res) => {
          const coin = res.data.coins
          console.log(res)

          let currPrice: number = 0
          Object.values(coin).forEach((obj: any) => {
            console.log(coin)
            currPrice = obj.price
          })

          const currentTotalValue = currPrice * totalBalance
          const totalValueAtPurchase = purchasePrice * totalBalance
          const openPnL =
            ((currentTotalValue - totalValueAtPurchase) /
              totalValueAtPurchase) *
            100

          if (openPnL > 0) {
            positiveReturn = true
            openPnLPercentage = openPnL
          }
          if (openPnL < 0) {
            openPnLPercentage = Math.abs(openPnL)
          }

          const currentTotalValueToDecimals = convertToDecimals(
            currentTotalValue,
            decimal
          )

          assetCompleteInfo = {
            name,
            assetsInfo,
            assetSymbol,
            totalBalance: convertToDecimals(totalBalance, decimal),
            purchasePrice: convertToCurrency(purchasePrice, decimal),
            currPrice: convertToCurrency(currPrice, decimal),
            currentTotalValue: convertToCurrency(
              currentTotalValueToDecimals,
              decimal
            ),
            totalValueAtPurchase,
            positiveReturn: openPnL === 0 ? null : positiveReturn,
            openPnLPercentage: convertToDecimals(openPnLPercentage, 2),
          }

          setAssetData(assetCompleteInfo)
          setIsLoading(false)
        })
      } catch (err: any) {
        console.log(`An error occurred: ${err.message}`)
      }
    }
  }, [portfolioData])

  if (isLoading) {
    return (
      <S.Container>
        <Spinner />
        {/* <SkeletonLoader /> */}
      </S.Container>
    )
  }

  console.log("assetData", assetData)

  return (
    // <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50">
    //   <div className="relative mx-auto my-0 max-w-lg w-full">
    <div className="w-full h-screen px-4 py-6 bg-zinc-900 flex flex-col items-center justify-start mx-auto">
      <ListItem>
        <div className="h-auto bg-gray-800 p-16 rounded-lg">
          <button
            onClick={handleGoBack}
            type="button"
            className="group border border-gray-400 group-hover:text-gray-200 hover:border-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 px-6 text-center inline-flex items-center mb-6 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-arrow-left text-gray-400 group-hover:text-gray-200"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <div className="text-gray-400 ml-2 group-hover:text-gray-200">
              Back
            </div>
            <span className="sr-only">Go Back button</span>
          </button>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center justify-start">
              <div className="text-4xl font-semibold w-max text-white mr-4">
                {assetData.assetSymbol}
              </div>
              <S.AssetImg>
                <S.Img
                  alt="asset icon"
                  src={assetData.assetsInfo[0].imgLarge}
                />
              </S.AssetImg>
            </div>
            <div className="text-4xl font-semibold w-max text-white">
              {assetData.name}
            </div>
          </div>

          <div className="flex items-center justify-between mt-10 mb-8 space-x-2">
            <p className="text-2xl font-bold text-white">Total Value</p>
            <div className="flex">
              <div className="text-lg font-bold text-white mr-2">
                {assetData.currentTotalValue}
              </div>
              <span className="flex items-center text-xl font-bold text-green-500">
                {assetData.positiveReturn == null ? null : (
                  <svg
                    width="20"
                    fill="currentColor"
                    height="20"
                    className={`h-4 ${
                      assetData.positiveReturn
                        ? "text-green-500"
                        : "text-red-500 transform rotate-180"
                    }`}
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z"></path>
                  </svg>
                )}

                <div
                  className={
                    assetData.positiveReturn == null
                      ? "text-white"
                      : assetData.positiveReturn
                      ? "text-green-500"
                      : "text-red-500"
                  }
                  // className={
                  //   assetData.positiveReturn ? "text-green-500" : "text-red-500"
                  // }
                >
                  {assetData.openPnLPercentage}%
                </div>
              </span>
            </div>
          </div>

          <div className="text-gray-200">
            <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-lg border-b border-gray-600 md:space-x-24">
              <p>Total Balance</p>
              <div className="flex items-end text-lg">
                {assetData.totalBalance} {assetData.assetSymbol}
              </div>
            </div>
            <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-lg border-b border-gray-600 md:space-x-24">
              <p>Current Price</p>
              <div className="flex items-end text-lg">
                {assetData.currPrice}
              </div>
            </div>
            <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-lg border-b border-gray-600 md:space-x-24">
              <p>Purchase Price</p>
              <div className="flex items-end text-lg">
                {assetData.purchasePrice}
              </div>
            </div>

            {/* <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
          <p>Embedded form</p>
          <div className="flex items-end text-xs">
            13
            <span className="flex items-center">
              <svg
                width="20"
                fill="currentColor"
                height="20"
                className="h-3 text-green-500"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z"></path>
              </svg>
              12%
            </span>
          </div>
        </div> */}
          </div>
        </div>
      </ListItem>
    </div>
  )
}

export default AssetInfoModal
