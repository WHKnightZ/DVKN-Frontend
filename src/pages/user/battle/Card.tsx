/* eslint-disable */
import React, { CSSProperties } from 'react'

interface Props {
  atk: number
  hp: number
  image: string
  innerRef: any
  style?: CSSProperties
}

const Card: React.FC<Props> = ({ image, innerRef, style, hp }) => {
  return (
    <div className="BattleCard" ref={innerRef} style={style}>
      <img
        alt=""
        src={hp <= 0 ? 'https://tdhv.s3.ap-southeast-1.amazonaws.com/tdhv/death.png' : image}
      />
    </div>
  )
}

export default Card
