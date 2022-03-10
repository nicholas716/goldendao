import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function NFTCard(props) {
  const router = useRouter()
  function onClickCard() {
    router.push('/nft')
  }
  const stopPropagation = e => {
    e.stopPropagation()
  }
  return (
    <div
      className={`relative bg-gradient-to-t from-darkest_gold to-medium_gold inline-block sm:p-[20px] p-[8px] sm:rounded-[16px] rounded-[8px] ${props.className}`}
      onClick={e => onClickCard(e)}
    >
      <video
        width="690"
        className="video-tag 2xl:h-[400px] xl:h-[330px] md:h-[280px]"
        autoPlay
        muted
        loop
        playsInline
        onClick={e => stopPropagation(e)}
      >
        <source src="gd-token.mp4" type="video/mp4" />
        <source src="gd-token.mp4" type="video/ogg" />
        Your browser does not support HTML video.
      </video>

      <div className="text-center font-bold text-white 2xl:my-[28px] xl:my-[22px] md:my-[18px] sm:my-[14px] space-y-[10px]">
        <p>MINT PRICE</p>
        {/* <p className="text-[15pt]">1 ETH (2,624.28$)</p> */}
        <p className="md:text-[30pt] sm:text-[24pt] text-[18pt]">1 ETH</p>
      </div>
      <div className="absolute left-0 top-0 bottom-0 right-0 z-10"></div>
    </div>
  )
}
