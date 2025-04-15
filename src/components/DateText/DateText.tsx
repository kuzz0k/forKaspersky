import React from "react"
import cls from "./DateText.module.scss"

interface DateProps {
  date: string
}

function formatDateToCustomString(isoDateString: string): string[] {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const date = new Date(isoDateString)
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string")
  }

  const day = date.getDate().toString()
  const month = months[date.getMonth()]
  const year = date.getFullYear().toString()

  return [day, month, year]
}

const DateText: React.FC<DateProps> = ({ date }) => {
  return (
    <div className={cls.box}>
      <span className={cls.white}>{formatDateToCustomString(date)[0]}</span>
      <span>{formatDateToCustomString(date)[1]}</span>
      <span>{formatDateToCustomString(date)[2]}</span>
    </div>
  )
}

export default DateText
