import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function NFTCard(props) {
  const router = useRouter()
  function onClickCard() {
    router.push('/nft')
  }
  return (
    <div
      className={`bg-gradient-to-t from-darkest_gold to-medium_gold inline-block p-[20px] rounded-[16px] ${props.className}`}
      onClick={e => onClickCard()}
    >
      <video width="690" controls autoPlay muted loop>
        <source src="gd-token.mp4" type="video/mp4" />
        <source src="gd-token.mp4" type="video/ogg" />
        Your browser does not support HTML video.
      </video>

      <div className="text-center font-bold text-white my-[28px] space-y-[10px]">
        <p>MINT PRICE</p>
        <p className="text-[15pt]">0.80 ETH (2,708.90$)</p>
      </div>
    </div>
  )
}
