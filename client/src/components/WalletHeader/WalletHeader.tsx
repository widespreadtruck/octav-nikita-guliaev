import React, { useEffect } from "react"
import * as S from "./WalletHeader.styles"
import CloseIcon from "../../assets/CloseIcon"
import { useSelector } from "react-redux"
import { RootState } from "../../store/index"

const WalletHeader = ({
  totalWalletValue,
}: {
  totalWalletValue: string
}): JSX.Element => {
// console.log('>>>>>>>',totalWalletValue)

  return (
    <S.Container>
      <S.ImgWrapper>
        <img
          src="https://img.icons8.com/windows/344/ffffff/wallet.png"
          className="absolute object-cover h-7 w-7"
        />
        <S.ImgBackground />
      </S.ImgWrapper>

      <S.TitlesContainer>
        <S.Title>Wallet</S.Title>
        <S.Balance>{totalWalletValue}</S.Balance>
      </S.TitlesContainer>

      <S.CloseBtn>
        <CloseIcon />
      </S.CloseBtn>
    </S.Container>
  )
}

export default WalletHeader
