import React from "react"
import * as S from "./WalletHeader.styles"
import CloseIcon from '../../assets/CloseIcon'

const WalletHeader = () => {
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
        <S.Balance>Total Balance</S.Balance>
      </S.TitlesContainer>

      <S.CloseBtn>
        <CloseIcon />
      </S.CloseBtn>
    </S.Container>
  )
}

export default WalletHeader
