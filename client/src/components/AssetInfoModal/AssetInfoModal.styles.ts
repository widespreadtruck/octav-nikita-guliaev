import tw from "twin.macro"

export const Container = tw.div`
    bg-zinc-900
    p-6
    h-screen
    w-screen
    flex
    items-center
    justify-center
`
export const AssetImg = tw.div`
    flex flex-col items-center justify-center w-16 h-16 mr-4
`
export const Img = tw.img`
    mx-auto object-cover rounded-full ml-0 mr-0
`