import React from "react"

const AssetInfoModal = () => {

return (
<div className="relative">
  <div className="inset-0 z-10 w-full h-screen overflow-y-auto">
    <div className="absolute inset-0 w-full h-full bg-gray-500 opacity-75"></div>
    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <span
        className="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      ></span>
      <div
        className="relative inline-block overflow-hidden transition-all transform sm:align-middle sm:max-w-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div>
          <div className="rounded-lg p-8 bg-white shadow">
            <div className="bg-white dark:bg-gray-800 ">
              <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
                <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
                  <span className="block">Become millionaire ?</span>
                  <span className="block text-indigo-500">
                    It&#x27;s today or never.
                  </span>
                </h2>
                <div className="lg:mt-0 lg:flex-shrink-0">
                  <div className="mt-12 inline-flex rounded-md shadow">
                    <button
                      type="button"
                      className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                      Get started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)}

export default AssetInfoModal