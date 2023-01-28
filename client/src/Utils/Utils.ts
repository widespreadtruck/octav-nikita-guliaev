import { Decimal } from "decimal.js"

export const convertToDecimals = (num: number, decimal: number) => {
  // mathematically correctly convert and round numbers
  const decimalNum = new Decimal(num)
  return decimalNum
    .mul(new Decimal(10).pow(decimal))
    .floor()
    .div(new Decimal(10).pow(decimal))
    .toFixed(decimal)
}

  export const convertToCurrency = (num: any, decimals: number | null) => {
    const balance = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: decimals || 2,
    })
    return balance.format(num)
  }
