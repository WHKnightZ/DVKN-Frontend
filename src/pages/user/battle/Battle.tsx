/* eslint-disable */
import { CircularProgress } from '@mui/material'
import { CARD_HEIGHT, CARD_WIDTH } from 'configs/constants'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './index.scss'

const SCREEN_WIDTH = 1200
const SCREEN_HEIGHT = 640
const SPACE = 10
const OFFSET_Y = 48

const DECK_WIDTH = (CARD_WIDTH + SPACE) * 5 - SPACE

type Card = {
  atk: number
  hp: number
  max_hp: number
  image: string
  imageObject?: any
  x: number
  y: number
  offsetX: number
  offsetY: number
}

type Player = {
  cards: Card[]
}

const backgroundImage = new Image()
backgroundImage.src = 'https://tdhv.s3.ap-southeast-1.amazonaws.com/tdhv/background-battle.jpg'

const deathImage = new Image()
deathImage.src = 'https://tdhv.s3.ap-southeast-1.amazonaws.com/cards/rip/4.png'

let attackPlayer = -1
let defendPlayer = -1
let attacker = 0
let defender = 0
let step = 0

let players: [Player, Player] = [{ cards: [] }, { cards: [] }]
let battleResult: any[] = []

const inFunc = (x: number) => x * x * x
const outFunc = (x: number) => {
  if (x < 0.1) return 0
  const x2 = (x - 0.1) / 0.9
  return x2 * x2
}

const Battle: React.FC = () => {
  const { state } = useLocation()

  const [battle, setBattle] = useState({
    begin: false,
    loading: true,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const attackInterval = useRef<any>()

  const draw = () => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D

    ctx.drawImage(backgroundImage, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

    players.forEach((player, playerIndex) => {
      player.cards.forEach((card, cardIndex) => {
        if (!(playerIndex === attackPlayer && cardIndex === attacker))
          ctx.drawImage(
            card.hp > 0 ? card.imageObject : deathImage,
            Math.floor(card.x + card.offsetX),
            Math.floor(card.y + card.offsetY),
            CARD_WIDTH,
            CARD_HEIGHT
          )
      })
    })

    if (attackPlayer === -1) return

    const card = players[attackPlayer].cards[attacker]

    ctx.drawImage(
      card.imageObject,
      Math.floor(card.x + card.offsetX),
      Math.floor(card.y + card.offsetY),
      CARD_WIDTH,
      CARD_HEIGHT
    )

    players.forEach((player, playerIndex) => {
      player.cards.forEach((card) => {
        if (card.hp > 0) {
          ctx.lineWidth = 3
          ctx.strokeStyle = '#333'
          ctx.fillStyle = '#0f0'

          const y = card.y + (playerIndex === 1 ? -28 : 10 + CARD_HEIGHT)

          ctx.fillRect(card.x, y, CARD_WIDTH * (Math.max(card.hp, 0) / card.max_hp), 16)
          ctx.strokeRect(card.x, y, CARD_WIDTH, 16)
        }
      })
    })
  }

  const attackAtStep = (
    attackerLeft: number,
    attackerTop: number,
    defenderLeft: number,
    defenderTop: number,
    attacker: number,
    defender: number,
    card: Card,
    done: any
  ) => {
    const k = defenderTop - attackerTop
    const l = defenderLeft - attackerLeft

    const offset = Math.abs(defender - attacker)
    const max = 50 + offset * 6
    const max2 = Math.floor(max / 2)

    let x = 0
    attackInterval.current = setInterval(() => {
      x += 1
      // const y = (x > max2 ? max - x : x) / max2
      // card.offsetX = y * y * l
      // card.offsetY = y * y * k
      if (x > max2) {
        const y = (x - max2) / max2
        const offset = outFunc(y)
        card.offsetX = l - offset * l
        card.offsetY = k - offset * k
      } else {
        const y = x / max2
        const offset = inFunc(y)
        card.offsetX = offset * l
        card.offsetY = offset * k
      }

      if (x === max2) {
        const { cards: cardsAttacker } = players[attackPlayer]
        const { cards: cardsDefender } = players[defendPlayer]
        cardsDefender[defender].hp -= cardsAttacker[attacker].atk
      }

      draw()

      if (x === max) {
        setTimeout(() => {
          done()
        }, 200)
        clearInterval(attackInterval.current)
      }
    }, 15)
  }

  const attack = () => {
    step += 1

    if (step > battleResult.length + 1) {
      return
    }

    attacker = battleResult[step - 1].atk_card
    defender = battleResult[step - 1].def_card

    attackPlayer = 1 - (step % 2)
    defendPlayer = 1 - attackPlayer

    const attackerPosition = players[attackPlayer].cards[attacker]
    const defenderPosition = players[defendPlayer].cards[defender]

    setTimeout(() => {
      attackAtStep(
        attackerPosition.x,
        attackerPosition.y,
        defenderPosition.x,
        defenderPosition.y + ((attackPlayer ? -1 : 1) * Math.floor(CARD_HEIGHT)) / 2,
        attacker,
        defender,
        players[attackPlayer].cards[attacker],
        attack
      )
    }, 100)
  }

  useEffect(() => {
    const data: any = state

    battleResult = data.battle_result
    players = data.players
    let done = 0
    players.forEach((player: Player, playerIndex: number) => {
      player.cards.forEach((card, cardIndex) => {
        card.imageObject = new Image()
        card.imageObject.src = card.image

        card.imageObject.onload = () => {
          card.x = (SCREEN_WIDTH - DECK_WIDTH) / 2 + cardIndex * (CARD_WIDTH + SPACE)
          card.y = playerIndex === 1 ? OFFSET_Y : SCREEN_HEIGHT - OFFSET_Y - CARD_HEIGHT
          card.offsetX = 0
          card.offsetY = 0

          done += 1
          if (done === 10) {
            setBattle({ begin: true, loading: false })
            step = 0
            attack()
          }
        }
      })
    })

    return () => {
      clearInterval(attackInterval.current)
    }
  }, [])

  return (
    <>
      <div className="Battle d-f ai-c jc-c fh">
        {battle.loading ? (
          <CircularProgress />
        ) : (
          <canvas ref={canvasRef} width={SCREEN_WIDTH} height={SCREEN_HEIGHT} />
        )}
      </div>
    </>
  )
}

export default Battle
