import React, { useState } from "react"
import * as S from "./AssetItem.styles"
import ArrowIcon from "../../assets/ArrowIcon"
import AssetInfoModal from "../AssetInfoModal/AssetInfoModal"
// import { useNavigate } from "react-router-dom"

const AssetItem = ({
  iconAddress,
  tokenName,
  fourDecimalsBalance,
  latestPrice,
  assetValue,
  handleModal,
}: {
  iconAddress: string
  tokenName: string
  fourDecimalsBalance: string
  latestPrice: string | number
  assetValue: string | number
  handleModal: any
}): JSX.Element => {

  return (
    <S.ListElement onClick={() => handleModal({tokenName, latestPrice})}>
      {/* <S.ListElement > */}
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
