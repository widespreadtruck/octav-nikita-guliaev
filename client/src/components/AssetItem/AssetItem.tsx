import React from "react"
import * as S from "./AssetItem.styles"
import ArrowIcon from "../../assets/ArrowIcon"

const AssetItem = ({
  iconAddress,
  tokenName,
  fourDecimalsBalance,
  latestPrice,
  assetValue,
}: {
  iconAddress: string
  tokenName: string
  fourDecimalsBalance: string
  latestPrice: string | number
  assetValue: string | number
}) => {
  // console.log(iconAddress)
  // console.log(tokenName)
  // console.log(fourDecimalsBalance)
  // console.log(latestPrice)
  // console.log(assetValue)
  return (
    <S.ListElement>
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
  )
}

export default AssetItem
