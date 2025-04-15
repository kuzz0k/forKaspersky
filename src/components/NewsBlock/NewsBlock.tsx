import React, { useState } from "react"
import { Card, Tag, Typography, Button } from "antd"
import {
  BorderOutlined,
  UserOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  InfoCircleOutlined,
  GlobalOutlined,
} from "@ant-design/icons"
import "./NewsBlock.scss"
import TrafficStats from "../TrafficStats/TrafficStats"
import DateText from "../DateText/DateText"
import ReachText from "../ReachText/ReachText"
import ParagraphText from "../ParagraphText/ParagraphText"
import { Duplicate } from "../Duplicate/Duplicate"

const { Paragraph } = Typography

export interface IData_TagItem {
  value: string
  count: number
}

export interface IData_TrafficItem {
  value: string
  count: number
}

export interface IData_SnippetNews {
  ID: number
  TI: string
  AB: string
  URL: string
  DOM: string
  DP: string
  LANG: string
  REACH: number
  KW: IData_TagItem[]
  AU: string[]
  CNTR: string
  CNTR_CODE: string
  SENT: string
  TRAFFIC: IData_TrafficItem[]
  FAV: string
  HIGHLIGHTS: string[]
}

interface NewsBlockProps extends IData_SnippetNews {
  duplicateCount: number
}

export const mapJsonToNewsBlockProps = (
  data: IData_SnippetNews
): NewsBlockProps => ({
  ...data,
  duplicateCount: 192,
})

const NewsBlock: React.FC<NewsBlockProps> = ({
  TI,
  DP,
  REACH,
  CNTR,
  CNTR_CODE,
  AU,
  DOM,
  URL,
  SENT,
  AB,
  KW,
  TRAFFIC,
  HIGHLIGHTS,
  duplicateCount,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [showAllTags, setShowAllTags] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)
  const toggleTags = () => setShowAllTags(!showAllTags)

  const date = new Date(DP).toLocaleDateString()
  const sentiment = (SENT.charAt(0).toUpperCase() + SENT.slice(1)) as
    | "Positive"
    | "Negative"
    | "Neutral"
  const authors = AU.join(", ") || null
  const content = HIGHLIGHTS.length > 0 ? HIGHLIGHTS.join("...") : AB
  const tags = KW.map((k) => `${k.value} ${k.count}`)
  const contentPreview = content.slice(0, 300)

  return (
    <Card className="news-block">
      <div className="news-block__header">
        <div className="header-left">
          <DateText date={date} />
          <ReachText reach={REACH} />
          <TrafficStats traffic={TRAFFIC} />
        </div>
        <div className="header-right">
          <Tag
            className={`news-block__sentiment news-block__sentiment--${sentiment.toLowerCase()}`}
          >
            {sentiment}
          </Tag>
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
        <div>{CNTR}</div>
        <div>{CNTR_CODE}</div>
        {authors ? (
          <>
            <UserOutlined />
            <div className="news-block__authors">{authors}</div>
          </>
        ) : (
          ""
        )}
      </div>

      <Paragraph className="news-block__content">
        {expanded ? (
          <ParagraphText paragraph={content} />
        ) : (
          <ParagraphText paragraph={contentPreview} />
        )}
        <a className="news-block__show-more" onClick={toggleExpanded}>
          {expanded ? (
            <>
              Show less
              <CaretUpOutlined />
            </>
          ) : (
            <>
              Show more
              <CaretDownOutlined />
            </>
          )}
        </a>
      </Paragraph>

      <div className="news-block__tags">
        {(showAllTags ? tags : tags.slice(0, 6)).map((tag) => (
          <Tag key={tag}>
            {tag.split(" ")[0]}{" "}
            <span className="white">{tag.split(" ")[1]}</span>
          </Tag>
        ))}
        {tags.length > 6 && (
          <Button
            type="link"
            className="news-block__show-all"
            onClick={toggleTags}
          >
            {showAllTags ? "Show less" : `+${tags.length - 6}`}
          </Button>
        )}
      </div>

      <div>
        <a
          className="news-block__source-link"
          href={URL}
          target="_blank"
          rel="noreferrer"
        >
          Original Source
        </a>
      </div>

      <div className="news-block__duplicates-summary">
        Duplicates: <span className="white">{duplicateCount}</span>
      </div>

      <Duplicate
        date={date}
        REACH={REACH}
        URL={URL}
        TI={TI}
        DOM={DOM}
        CNTR={CNTR}
        CNTR_CODE={CNTR_CODE}
        authors={authors}
      />
    </Card>
  )
}

export default NewsBlock
