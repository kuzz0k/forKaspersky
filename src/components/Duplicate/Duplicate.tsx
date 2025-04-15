import React from "react"
import {
  BorderOutlined,
  UserOutlined,
  InfoCircleOutlined,
  GlobalOutlined,
  DownOutlined,
} from "@ant-design/icons"
import DateText from "../DateText/DateText"
import ReachText from "../ReachText/ReachText"
import { Typography } from "antd"
import cls from "./Duplicate.module.scss"

const { Text } = Typography

interface DuplicateProps {
  date: string
  REACH: number
  URL: string
  TI: string
  DOM: string
  CNTR: string
  CNTR_CODE: string
  authors: string | null
}

export const Duplicate: React.FC<DuplicateProps> = ({
  date,
  REACH,
  URL,
  TI,
  DOM,
  CNTR,
  CNTR_CODE,
  authors,
}) => {
  return (
    <>
      <div className={cls.duplicate}>
        <div className={"news-block__header"}>
          <div className="header-left">
            <DateText date={date} />
            <ReachText reach={REACH} />
          </div>
          <div className="header-right">
            <InfoCircleOutlined />
            <BorderOutlined />
          </div>
        </div>
        <a
          href={URL}
          target="_blank"
          rel="noreferrer"
          className="news-block__title"
        >
          {TI}
        </a>
        <div className="news-block__meta">
          <GlobalOutlined />
          <a href={DOM}>{DOM}</a>
          <img
            src={`https://flagcdn.com/h20/${CNTR_CODE.toLowerCase()}.png`}
            alt={CNTR}
          />
          <Text>{CNTR}</Text>
          <div className="lang">
            <Text>{CNTR_CODE}</Text>
          </div>
          {authors ? (
            <>
              <UserOutlined />
              <Text className="news-block__authors">{authors}</Text>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={`news-block__duplicates ${cls.but}`}>
        <DownOutlined />
        View Duplicates
      </div>
    </>
  )
}
