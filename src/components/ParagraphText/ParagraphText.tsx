import React from "react"
import cls from "./ParagraphText.module.scss"

interface ParagraphProps {
  paragraph: string
}

const ParagraphText: React.FC<ParagraphProps> = ({ paragraph }) => {
  const parts = paragraph.split(/(<kw>.*?<\/kw>)/g)

  return (
    <div>
      {parts.map((part, index) => {
        if (part.startsWith("<kw>") && part.endsWith("</kw>")) {
          const content = part.replace(/<\/?kw>/g, "")
          return (
            <span key={index} className={cls.highlight}>
              {content}
            </span>
          )
        }
        return part
      })}
    </div>
  )
}

export default ParagraphText
