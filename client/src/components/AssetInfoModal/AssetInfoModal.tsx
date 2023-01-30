import React, { useEffect, useState } from "react"
import usePortfolioData from "../../components/hooks/usePortfolioData"
import { useLocation } from "react-router-dom"
import * as S from "./AssetInfoModal.styles"
import Spinner from "../Spinner/Spinner"
import AssetSymbolImg from "../AssetSymbol/AssetSymbol"
import axios from "axios"
import { convertToCurrency, convertToDecimals } from "../../Utils/Utils"
import useChainImages from "../hooks/useChainImages"
import OpenPnL from "../OpenPnL/OpenPnL"
import ArrowLeft from '../../assets/ArrowLeft'

interface AssetData {
  name: string
  imgLarge: string
  assetsInfo: Array<{
    chainKey: string
    chainImg: string
    chainName: string
    symbol: string
    balance: number
    decimal: number
    price: number
  }>
  assetSymbol: string
  totalBalance: number
  purchasePrice: string
  currPrice: string
  notConvertedCurrPrice: number
  currentTotalValue: string
  totalValueAtPurchase: number
  positiveReturn: boolean | null
  openPnLPercentage: number
}

const initialAssetData: AssetData = {
  name: '',
  imgLarge: '',
  assetsInfo: [],
  assetSymbol: '',
  totalBalance: 0,
  purchasePrice: '',
  currPrice: '',
  notConvertedCurrPrice: 0,
  currentTotalValue: '',
  totalValueAtPurchase: 0,
  positiveReturn: true,
  openPnLPercentage: 0
}
const AssetInfoModal = () => {
  const portfolioData = usePortfolioData()
  const chainImages = useChainImages()


  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [assetData, setAssetData] = useState<AssetData>(initialAssetData)

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
    if (portfolioData !== null) {
      let assetsInfo: any = []
      let assetCompleteInfo: any = {}
      let query: string = ""
      let totalBalance: number = 0
      let purchasePrice: number = 0
      let positiveReturn: boolean = false
      let openPnLPercentage: number = 0
      let decimal: number = 0
      let name: string = ""
      let imgLarge: string = ""

      Object.values(portfolioData.wallet.chains).forEach((chain) => {
        chain.protocolPositions.WALLET.assets.forEach((asset) => {
          if (asset.symbol === assetSymbol) {
            console.log(asset)
            assetsInfo.push(asset)
            query = asset.chainContract
            totalBalance += asset.balance
            purchasePrice = asset.price
            decimal = asset.decimal
            name = asset.name
            imgLarge = asset.imgLarge
          }
        })
      })

      //add chain images to each asset
      if (chainImages) {
        assetsInfo.map((asset: any) => {
          Object.values(chainImages).forEach((chain: any) => {
            if (asset.chainKey === chain.key) {
              asset.chainImg = chain.imgLarge
              asset.chainName = chain.name
            }
          })
        })
      }

      if (query.length !== 0) {
        try {
          axios.get(`/get-prices/${query}`).then((res) => {
            const coin = res.data.coins

            let currPrice: number = 0
            Object.values(coin).forEach((obj: any) => {
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
              imgLarge,
              assetsInfo,
              assetSymbol,
              totalBalance: convertToDecimals(totalBalance, decimal),
              purchasePrice: convertToCurrency(purchasePrice, decimal),
              currPrice: convertToCurrency(currPrice, decimal),
              notConvertedCurrPrice: currPrice,
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
    }

  }, [portfolioData, chainImages])

  if (isLoading) {
    return (
      <S.Container>
        <Spinner />
      </S.Container>
    )
  }

  console.log("assetData", assetData)

  return (
    <div className=" overflow-auto w-full h-screen px-4 py-6 bg-zinc-900 flex flex-col items-center justify-start mx-auto">
      <S.ListItem>
        <div className="h-auto bg-gray-800 p-16 rounded-lg ">
          <button
            onClick={handleGoBack}
            type="button"
            className="group border border-gray-400 group-hover:text-gray-200 hover:border-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 px-6 text-center inline-flex items-center mb-1"
          >
            <ArrowLeft />
            <div className="text-gray-400 ml-2 group-hover:text-gray-200">
              Back
            </div>
            <span className="sr-only">Go Back button</span>
          </button>

          <div className="flex items-center justify-between my-10">
            <div className="flex items-center justify-start">
              {/* lazy load the asset symbol image */}
              <AssetSymbolImg assetData={assetData} />

              <div className="text-5xl font-semibold w-max text-white mr-4">
                {assetData.assetSymbol}
              </div>
            </div>

            <div className="flex items-end justify-center">
              <div className="flex flex-col items-end justify-center mr-1">
                <div className="text-lg font-semibold text-gray-200 text-right mb-1">
                  TOTAL COST BASIS
                </div>
                <div className="text-2xl font-bold text-white text-right">
                  {assetData.currentTotalValue}
                </div>
              </div>

              <OpenPnL assetData={assetData} />
            </div>
          </div>
          <div className="text-gray-200">
            <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-lg border-b border-gray-600 md:space-x-24">
              <p>Total Balance</p>
              <div className="flex items-end text-lg">
                {assetData.totalBalance} {assetData.assetSymbol.toUpperCase()}
              </div>
            </div>
            <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-lg border-b border-gray-600 md:space-x-24">
              <p>Current Price</p>
              <div className="flex items-end text-lg">
                {assetData.currPrice}
              </div>
            </div>
            <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-lg border-gray-600 md:space-x-24">
              <p>Purchase Price</p>
              <div className="flex items-end text-lg">
                {assetData.purchasePrice}
              </div>
            </div>
          </div>

          <div>
            <ul className="mt-10 flex flex-col divide-y-0 divide-gray-600 w-full">
              {assetData.assetsInfo.map((value: any, idx: number) => (
                <S.ListElement key={`${value.symbol}_${idx}`}>
                  <S.ContentWrapper className="listItem">
                    <S.AssetImg>
                      <S.Img alt="chain icon" src={value.chainImg} />
                    </S.AssetImg>
                    <S.NameAndPriceWrapper>
                      <S.Name>Chain: {value.chainName}</S.Name>
                      <S.LatestPrice>
                        Balance: {convertToDecimals(value.balance, value.decimal)}{" "}
                        {value.symbol.toUpperCase()}
                      </S.LatestPrice>
                    </S.NameAndPriceWrapper>

                    <S.ValueAndBalance>
                      <S.AssetValue>{value.name}</S.AssetValue>
                      <S.Balance>
                        {convertToCurrency(
                          value.balance * assetData.notConvertedCurrPrice,
                          value.decimal
                        )}
                      </S.Balance>
                    </S.ValueAndBalance>
                  </S.ContentWrapper>
                </S.ListElement>
              ))}
            </ul>
          </div>
        </div>
      </S.ListItem>
    </div>
  )
}

export default AssetInfoModal
