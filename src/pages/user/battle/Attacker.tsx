/* eslint-disable */
import React, { useEffect, useState } from 'react'
import Card from './Card'

interface Props {
  step: number
  attackerCard: any
  attacker: number
  defender: number
  attackerLeft: number
  attackerTop: number
  defenderLeft: number
  defenderTop: number
  setPlayers: any
  done: () => void
}

const Attacker: React.FC<Props> = ({
  step,
  attackerCard,
  attacker,
  defender,
  attackerLeft,
  attackerTop,
  defenderLeft,
  defenderTop,
  setPlayers,
  done,
}) => {
  const [pos, setPos] = useState({ left: attackerLeft, top: attackerTop })

  useEffect(() => {
    if (!step) return

    setPos({ left: attackerLeft, top: attackerTop })

    const k = defenderTop - attackerTop
    const l = defenderLeft - attackerLeft

    const offset = Math.abs(defender - attacker)
    const max = 50 + offset * 6
    const max2 = Math.floor(max / 2)

    let x = 0
    const interval = setInterval(() => {
      x += 1
      const y = (x > max2 ? max - x : x) / max2
      setPos({
        left: y * y * l + attackerLeft,
        top: y * y * k + attackerTop,
      })

      if (x === max2) {
        setPlayers((players: any) => {
          const newPlayers = [...players]
          const { cards } = newPlayers[step % 2]
          cards[defender].hp -= attackerCard.atk
          return newPlayers
        })
      }

      if (x === max) {
        setTimeout(() => {
          done()
        }, 200)
        clearInterval(interval)
      }
    }, 15)
  }, [step])

  return (
    <Card
      {...attackerCard}
      style={{
        display: step ? 'block' : 'none',
        position: 'absolute',
        margin: 0,
        ...pos,
      }}
    />
  )
}

export default Attacker
