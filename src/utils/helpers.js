import MerkleTree from 'merkletreejs'
import keccak256 from 'keccak256'
import whiteListJson from '@src/utils/whitelist.json'
import { ethers } from 'ethers'

export const NFT_ADDRESS = '0x3c231489cCA248d5c192a2be3eAb8b315c51A7c6'
export const calculateTimeLeft = endDate => {
  // let year = new Date().getFullYear()
  let difference = +new Date(endDate) - +new Date()

  let timeLeft = {}

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  return timeLeft
}

export function getMerkleProof(address) {
  const hashedAddresses = whiteListJson.map(addr => keccak256(addr))
  const merkleTree = new MerkleTree(hashedAddresses, keccak256, {
    sortPairs: true,
  })
  const hashedAddress = keccak256(address)
  const proof = merkleTree.getHexProof(hashedAddress)
  return proof
}

export async function getContractInfo(contract) {
  let presaleStart = await contract.presaleStart()
  let presaleEnd = await contract.presaleEnd()
  let publicStart = await contract.publicStart()
  const maxCount = await contract.PRESALE_MAX_PER_TX()

  return {
    presaleStart,
    presaleEnd,
    publicStart,
    maxCount,
  }
}

export async function getPresalePrice(contract) {
  const presalePriceBigNum = await contract.PRESALE_PRICE()
  const presalePrice = ethers.utils.formatEther(presalePriceBigNum)
  return presalePrice
}

export async function getPublicPrice(publicStart, now, contract) {
  const DUTCH_AUCTION_START_PRICE = await contract.DUTCH_AUCTION_START_PRICE()
  const DUTCH_AUCTION_END_PRICE = await contract.DUTCH_AUCTION_END_PRICE()
  const DUTCH_AUCTION_LENGTH = await contract.DUTCH_AUCTION_LENGTH()
  const start_price = ethers.utils.formatEther(DUTCH_AUCTION_START_PRICE)
  const end_price = ethers.utils.formatEther(DUTCH_AUCTION_END_PRICE)
  const auction_length = DUTCH_AUCTION_LENGTH
  if (now <= publicStart) return start_price

  const elapsed = now - publicStart
  if (DUTCH_AUCTION_LENGTH < elapsed) {
    return end_price
  } else {
    const price = start_price - (elapsed * (start_price - end_price)) / auction_length
    return price
  }
}
