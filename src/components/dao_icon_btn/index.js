import React from 'react'

export default function DaoIconButton(props) {
  let styles
  const { onClick } = props
  if (props.width) {
    styles = { ...styles, width: props.width }
  }
  return (
    <div
      className={`dao-btn-wrapper cursor-pointer flex justify-center align-middle text-white font-bold rounded ${props.className}`}
      style={styles}
      onClick={() => (onClick ? onClick() : '')}
    >
      {props.children}
    </div>
  )
}
