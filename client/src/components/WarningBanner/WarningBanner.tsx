import React from "react"
import { useSpring, animated } from "react-spring"

const WarningBanner = ({ status }: { status: boolean }) => {
  const animationProps = useSpring({
    transform: status ? "translateX(0%)" : "translateX(100%)",
  })

  return (
    <animated.div
      style={animationProps}
      className="fixed top-0 right-0 p-4"
      role="alert"
    >
      <div className="bg-red-200 border-red-600 text-red-600 border-l-4 p-4">
        <p className="font-bold">Warning</p>
        <p>
          Sorry... The Price data is currently unavailable for this asset. Try
          later.
        </p>
      </div>
    </animated.div>
  )
}

export default WarningBanner


{/* <div
      className={`fixed top-0 right-0 transition-all ease-in-out duration-700 transform ${
        status ? "translate-x-0" : "translate-x-full"
      }`}
      role="alert"
    >
      <div className="bg-red-200 border-red-600 text-red-600 border-l-4 p-4">
        <p className="font-bold">Warning</p>
        <p>Sorry... The Price data is currently unavailable for this asset. Try later.</p>
      </div>
    </div> */}