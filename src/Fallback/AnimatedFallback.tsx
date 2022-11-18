import { SoulboundLogoAnimated } from '../SVG/SVG'

export const AnimatedFallback = () => {
  return (
    <div className="grid place-items-center w-full h-full">
      <div className="text-white font-semibold text-lg text-center">
        <SoulboundLogoAnimated className={`relative z-20 mx-auto w-32 overflow-visible`} />
        {/* <div className="-mt-32">By Soulbound Labs, Graphrica, & The Graph</div> */}
      </div>
    </div>
  )
}
