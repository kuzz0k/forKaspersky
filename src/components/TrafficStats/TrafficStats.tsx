import React from "react"
import { IData_TrafficItem } from "../NewsBlock/NewsBlock"
import cls from "./TrafficStats.module.scss"

interface TrafficStatsProps {
  traffic: IData_TrafficItem[]
}

const TrafficStats: React.FC<TrafficStatsProps> = ({ traffic }) => {
  const shortenCountryName = (name: string): string => {
    const exceptions: Record<string, string> = {
      "United States of America": "USA",
      "United Arab Emirates": "UAE",
      "United Kingdom": "UK",
    }

    if (exceptions[name]) return exceptions[name]

    const words = name.split(" ")
    if (words.length === 1) return name

    return words.map((word) => word[0].toUpperCase()).join("")
  }

  const topTraffic = [...traffic].sort((a, b) => b.count - a.count).slice(0, 3)

  const formatPercentage = (decimal: number): number =>
    Math.round(decimal * 100)

  return (
    <div className={cls.box}>
      Top Traffic:{" "}
      {topTraffic.map((item, index) => (
        <span key={item.value}>
          {shortenCountryName(item.value)}{" "}
          <span className={cls.white}>{formatPercentage(item.count)}</span>%
          {index < topTraffic.length - 1 ? " " : ""}
        </span>
      ))}
    </div>
  )
}

export default TrafficStats
