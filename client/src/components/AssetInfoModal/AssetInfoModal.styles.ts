import tw from "twin.macro"
import styled from "styled-components"

export const Container = tw.div`
    bg-zinc-900
    p-6
    h-screen
    w-screen
    flex
    items-center
    justify-center
`
export const SymbolImg = tw.div`
    flex flex-col items-center justify-center w-24 h-24 mr-4
`
export const AssetImg = tw.div`
    flex flex-col items-center justify-center w-16 h-16 mr-4
`
export const Img = tw.img`
    mx-auto object-cover rounded-full ml-0 mr-0 h-full w-full
`

export const ListItem = styled.div`
  min-width: 800px;
  max-width: 1000px;
  width: 85%;
`

export const ListElement = tw.li`
    flex flex-row
`
export const ContentWrapper = tw.div`
    border-solid border-x border-t border-b-0 border-gray-500 select-none cursor-pointer flex flex-1 items-center p-4 bg-item-custom-color hover:bg-hover-item-custom-color
`


export const NameAndPriceWrapper = tw.div`
    flex-1 pl-1 md:mr-16
`
export const Name = tw.div`
   font-medium dark:text-white
`
export const LatestPrice = tw.div`
   text-sm text-gray-200
`

export const ValueAndBalance = tw.div`
   grid justify-items-stretch
`
export const AssetValue = tw.div`
   text-gray-600 dark:text-gray-200 font-medium justify-self-end
`
export const Balance = tw.div`
   text-xs text-gray-600 dark:text-gray-200 justify-self-end
`