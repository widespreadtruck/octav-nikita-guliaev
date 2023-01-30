import React from "react"
import "../../App.css"
import * as S from "./SkeletonLoader.styles"


const SkeletonLoader = (): JSX.Element => {
  return (
    <div className="flex h-screen w-screen">
      <div className="container flex flex-col items-center justify-start mx-auto w-3/5 listItem pt-10">
        <div className="container flex items-center justify-start mb-10">
          {/* <S.SymbolImg>
            <div className="mx-auto object-cover rounded-full ml-0 mr-0 h-full w-full bg-gray-100"></div>
          </S.SymbolImg> */}
          <div className="flex flex-row items-center justify-center h-full space-x-5 animate-pulse mr-4">
            <div className="w-10 h-10 bg-gray-600 rounded-full "></div>
          </div>

          <div className="w-1/3 bg-gray-600 animate-pulse h-12 rounded-xl self-start"></div>
        </div>

        <div className="w-full bg-gray-600 animate-pulse h-20 rounded-xl m-0.5"></div>
        <div className="w-full bg-gray-600 animate-pulse h-20 rounded-xl m-0.5"></div>
        <div className="w-full bg-gray-600 animate-pulse h-20 rounded-xl m-0.5"></div>
        <div className="w-full bg-gray-600 animate-pulse h-20 rounded-xl m-0.5"></div>
        <div className="w-full bg-gray-600 animate-pulse h-20 rounded-xl m-0.5"></div>
      </div>
    </div>
  )
}

export default SkeletonLoader


    
