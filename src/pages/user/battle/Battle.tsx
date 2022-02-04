/* eslint-disable */
import { CircularProgress } from '@mui/material'
import { Button } from 'components'
import { useEffect, useRef, useState } from 'react'
import { useApis } from 'services/api'
import Attacker from './Attacker'
import Card from './Card'
import './index.scss'

type Card = {
  atk: number
  hp: number
  max_hp: number
  image: string
}

type Player = {
  cards: Card[]
}

const Battle: React.FC = () => {
  const [battle, setBattle] = useState({
    begin: false,
    loading: false,
  })
  const [players, setPlayers] = useState<[Player, Player]>([{ cards: [] }, { cards: [] }])
  const [battleResult, setBattleResult] = useState<any[]>([])

  const { apiPost } = useApis()

  const playerCards = useRef<[HTMLDivElement[], HTMLDivElement[]]>([
    Array.from({ length: 5 }),
    Array.from({ length: 5 }),
  ])

  const stepRef = useRef(0)

  const [attackerFighting, setAttackerFighting] = useState({
    step: 0,
    attacker: 0,
    defender: 0,
    attackerLeft: 0,
    attackerTop: 0,
    defenderLeft: 0,
    defenderTop: 0,
    attackerCard: null,
  })

  useEffect(() => {
    apiPost('/api/v1/battle', {}, ({ status, data }) => {
      if (status) {
        setBattleResult(data.battle_result)
        setPlayers(data.players)
        setBattle({ begin: false, loading: false })
      }
    })
  }, [])

  const attack = () => {
    stepRef.current += 1
    const step = stepRef.current

    if (step > battleResult.length + 1) {
      return
    }

    const attacker = battleResult[step - 1].atk_card
    const defender = battleResult[step - 1].def_card

    const attackPlayer = 1 - (step % 2)
    const defendPlayer = 1 - attackPlayer

    const attackerCard: any = players[attackPlayer].cards[attacker]
    const attackerPosition = playerCards.current[attackPlayer][attacker]?.getBoundingClientRect?.()
    const defenderPosition = playerCards.current[defendPlayer][defender]?.getBoundingClientRect?.()

    setAttackerFighting({
      step: 0,
      attacker,
      defender,
      attackerLeft: attackerPosition.left,
      attackerTop: attackerPosition.top,
      defenderLeft: defenderPosition.left,
      defenderTop: defenderPosition.top + (attackPlayer ? 100 : -100),
      attackerCard,
    })

    setTimeout(
      () => setAttackerFighting((attackerFighting) => ({ ...attackerFighting, step })),
      100
    )
  }

  if (battle.loading) return <CircularProgress />

  const defendPlayer = 1 - (stepRef.current % 2)

  return (
    <>
      <div className="Battle fw fh d-f ai-c fd-c jc-sb">
        {players.map((player, playerIndex) => (
          <div className="d-f" key={playerIndex}>
            {player.cards.map((item, i) => (
              <div>
                <div className="d-f jc-c">
                  {item.hp}/{item.max_hp}
                </div>
                <Card
                  innerRef={(ref: any) => (playerCards.current[playerIndex][i] = ref)}
                  {...item}
                  style={{
                    visibility:
                      attackerFighting.step &&
                      playerIndex === defendPlayer &&
                      attackerFighting.attacker === i
                        ? 'hidden'
                        : 'visible',
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <Attacker
        {...attackerFighting}
        setPlayers={setPlayers}
        done={() => {
          setAttackerFighting({ ...attackerFighting, step: 0 })
          setTimeout(attack, 100)
        }}
      />
      {!battle.begin && (
        <div className="d-f ai-c jc-c fw fh" style={{ position: 'fixed', top: 0, left: 0 }}>
          <Button
            variant="contained"
            loading={battle.loading}
            onClick={() => {
              setBattle((battle) => ({ ...battle, begin: true }))
              attack()
            }}
          >
            Bắt đầu
          </Button>
        </div>
      )}
    </>
  )
}

export default Battle
