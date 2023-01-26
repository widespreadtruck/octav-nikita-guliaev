import React from "react"
import "../../App.css"

const SkeletonLoader = (): JSX.Element => {
  return (
    <div className="flex h-screen w-screen">
      <div className="container flex flex-col items-center justify-start mx-auto w-3/5 listItem p-6">
        <div className="w-1/3 bg-gray-600 animate-pulse h-16 rounded-xl mb-10 self-start"></div>

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
