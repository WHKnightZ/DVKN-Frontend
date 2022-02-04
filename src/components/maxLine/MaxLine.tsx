import React, { useEffect, useRef, useState } from 'react'
import './index.scss'

interface Props {
  title?: string
  numberOfLines?: number
  text: string
}

const MaxLine: React.FC<Props> = (props) => {
  const { title, numberOfLines = 2, text } = props

  const ref = useRef<any>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    setShowTooltip(ref?.current?.scrollHeight > ref?.current?.clientHeight)
  }, [ref, text])

  return (
    <div title={showTooltip ? title || text : undefined}>
      <div style={{ WebkitLineClamp: numberOfLines }} ref={ref} className="MaxLine">
        {text}
      </div>
    </div>
  )
}

export default MaxLine
