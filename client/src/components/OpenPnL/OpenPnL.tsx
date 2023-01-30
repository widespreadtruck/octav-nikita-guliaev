import React from "react"

const OpenPnL = ({ assetData }: { assetData: any }) => {
  return (
    <div className="flex flex-col ml-2">
      <div className="text-lg font-semibold text-gray-200 text-right mb-1">
        OPEN PnL
      </div>
      <span className="flex items-center text-2xl font-bold text-green-500">
        {assetData.positiveReturn == null ? null : (
          <svg
            width="20"
            fill="currentColor"
            height="20"
            className={`h-5 mr-1 ${
              assetData.positiveReturn
                ? "text-green-500"
                : "text-red-500 transform rotate-180"
            }`}
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z"></path>
          </svg>
        )}

        <div
          className={
            assetData.positiveReturn == null
              ? "text-white"
              : assetData.positiveReturn
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {assetData.openPnLPercentage == Infinity
            ? "MAX"
            : `${assetData.openPnLPercentage}%`}
        </div>
      </span>
    </div>
  )
}

export default OpenPnL
