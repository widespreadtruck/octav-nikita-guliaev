import React, { useState, useEffect } from "react"
import * as S from "./AssetItem.styles"
import ArrowIcon from "../../assets/ArrowIcon"
import { useLocation, useNavigate } from "react-router-dom"
import WarningBanner from "../WarningBanner/WarningBanner"

const AssetItem = ({
  iconAddress,
  symbol,
  tokenName,
  fourDecimalsBalance,
  latestPrice,
  assetValue,
}: {
  iconAddress: string
  symbol: string
  tokenName: string
  fourDecimalsBalance: string
  latestPrice: string | number
  assetValue: string | number
}): JSX.Element => {
    const [showMessage, setShowMessage] = useState<boolean>(false)

    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = (symbol: string, latestPrice: string | number) => {
      console.log("latestPrice", latestPrice)

      if (latestPrice === 'N/A') {
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
        }, 3000)
        return
      }
      
      navigate(`${location.pathname}/${symbol}`)
    }


      return (
        <>
          <WarningBanner status={showMessage} />
          <S.ListElement onClick={() => handleClick(symbol, latestPrice)}>
            <S.ContentWrapper className="listItem">
              <S.AssetImg>
                <S.Img alt="asset icon" src={iconAddress} />
              </S.AssetImg>
              <S.NameAndPriceWrapper>
                <S.Name>{tokenName}</S.Name>
                <S.LatestPrice>{latestPrice}</S.LatestPrice>
              </S.NameAndPriceWrapper>

              <S.ValueAndBalance>
                <S.AssetValue>{assetValue}</S.AssetValue>
                <S.Balance>{fourDecimalsBalance}</S.Balance>
              </S.ValueAndBalance>

              <S.ArrowBtn>
                <ArrowIcon />
              </S.ArrowBtn>
            </S.ContentWrapper>
          </S.ListElement>
        </>
      )
}

export default AssetItem
