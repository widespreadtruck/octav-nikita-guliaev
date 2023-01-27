import React, { useEffect, useState } from "react"
import usePortfolioData from "../../components/hooks/usePortfolioData"
import { useLocation } from "react-router-dom"
import { RootState } from "../../store/index"
import { useSelector, useDispatch } from "react-redux"

const AssetInfoModal = () => {
  const portfolioData = usePortfolioData()

  const state = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  // console.log("state", state)

  const [assetData, setAssetData] = useState<any>({})

  // console.log(portfolioData)

  const location = useLocation()
  // console.log('location=====', location)

  useEffect(() => {
    if (!portfolioData) return
    let assetsInfo: any = []

    Object.values(portfolioData.wallet.chains).forEach((chain) => {
      chain.protocolPositions.WALLET.assets.forEach((asset) => {
        const assetSymbol = location.hash.slice(1)
        // console.log(assetSymbol)
        if (asset.symbol === assetSymbol.toLowerCase()) {
          //   console.log("asset>>>", asset)
          assetsInfo.push(asset)
        }
        // console.log(asset)
      })
    })
    console.log(assetsInfo)
  }, [portfolioData])

  return (
    // <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50">
    //   <div className="relative mx-auto my-0 max-w-lg w-full">
      <div className="w-full h-screen px-4 py-6 bg-gray-800">
        <div className="text-lg font-semibold w-max text-white">
          Project Reffered
        </div>
        <div className="flex items-end my-6 space-x-2">
          <p className="text-5xl font-bold text-white">12</p>
          <span className="flex items-center text-xl font-bold text-green-500">
            <svg
              width="20"
              fill="currentColor"
              height="20"
              className="h-3"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z"></path>
            </svg>
            22%
          </span>
        </div>
        <div className="text-white">
          <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
            <p>Unique refferal URL</p>
            <div className="flex items-end text-xs">
              34
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
                22%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
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
          </div>
          <div className="flex items-center justify-between space-x-12 text-sm md:space-x-24">
            <p>New visitor</p>
            <div className="flex items-end text-xs">
              45
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
                41%
              </span>
            </div>
          </div>
        </div>
      </div>
    // </div>
    // </div>
  )
}

export default AssetInfoModal
