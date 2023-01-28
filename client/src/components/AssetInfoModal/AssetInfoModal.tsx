import React, { useEffect, useState, useCallback, useMemo } from "react"
import usePortfolioData from "../../components/hooks/usePortfolioData"
import { useLocation } from "react-router-dom"
import { RootState } from "../../store/index"
import { useSelector, useDispatch } from "react-redux"
import * as S from "./AssetInfoModal.styles"
import Spinner from "../Spinner/Spinner"
import axios from "axios"
import { convertToCurrency } from "../../Utils/Utils"

const AssetInfoModal = () => {
  const portfolioData = usePortfolioData()

  const state = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [assetData, setAssetData] = useState<any>({})

  const location = useLocation()
  const assetSymbol = location.hash.slice(1)

  // const fetchData = useCallback(async () => {
  //   try {
  //     const response = await axios.get("/wallet")
  //     setPortfolioData(response.data.assetByProtocols)
  //   } catch (err: any) {
  //     console.log(`An error occurred: ${err.message}`)
  //   }
  // }, [])

  useEffect(() => {
    if (!portfolioData) return
    let assetsInfo: any = []
    let assetCompleteInfo: any = {}
    let query: string = ""

    Object.values(portfolioData.wallet.chains).forEach((chain) => {
      chain.protocolPositions.WALLET.assets.forEach((asset) => {
        // console.log(assetSymbol)
        if (asset.symbol === assetSymbol.toLowerCase()) {
          //   console.log("asset>>>", asset)
          assetsInfo.push(asset)
          query = asset.chainContract
        }
        // console.log(asset)
      })
    })

    try {
      axios
      .get(`/get-prices/${query}`)
      .then((res) => {
        const coin = res.data.coins
        console.log("coin===========>>>: ", coin)
        let currPrice: number = 0
        let decimals = null
        Object.values(coin).forEach((obj: any)=>{
          // console.log(obj.price)
          currPrice = obj.price
          decimals = obj.decimal
        })
        const currencyConvertedPrice = convertToCurrency(currPrice, decimals)
    console.log(currencyConvertedPrice)
        assetCompleteInfo = {
          assetsInfo,
          assetSymbol,
          currentPrice: currencyConvertedPrice,
        }
        setAssetData(assetCompleteInfo)
        setIsLoading(false)
      })
    } catch (err: any) {
      console.log(`An error occurred: ${err.message}`)
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

  if (!isLoading) {
    console.log(assetData)
  }

  return (
    // <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50">
    //   <div className="relative mx-auto my-0 max-w-lg w-full">
    <div className="w-full h-screen px-4 py-6 bg-gray-800">
      <div className="flex items-center justify-start">
        <S.AssetImg>
          <S.Img alt="asset icon" src={assetData.assetsInfo[0].imgLarge} />
        </S.AssetImg>
        <div className="text-4xl font-semibold w-max text-white">
          {assetData.assetSymbol}
        </div>
      </div>

      <div className="flex items-end my-6 space-x-2">
        <p className="text-3xl font-bold text-white">
          Total Value: {assetData.currentPrice}
        </p>
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
