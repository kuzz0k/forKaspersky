import React from "react"
import cls from "./ReachText.module.scss"

function formatReach(reach: number): string {
  if (reach < 0) {
    throw new Error("Reach cannot be negative")
  }

  if (reach < 10000) {
    return reach.toString()
  }

  const thousands = reach / 1000
  const rounded = Math.round(thousands * 10) / 10

  return rounded % 1 === 0 ? `${rounded}K` : `${rounded.toFixed(1)}K`
}

interface ReachProps {
  reach: number
}

const ReachText: React.FC<ReachProps> = ({ reach }) => {
  return (
    <div className={cls.box}>
      <span className={cls.white}>{formatReach(reach)}</span>
      <span>Reach</span>
    </div>
  )
}

export default ReachText
