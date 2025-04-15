import NewsBlock from "./NewsBlock/NewsBlock"
import { mapJsonToNewsBlockProps } from "./NewsBlock/NewsBlock"
import jsonData from "../../data.json"

const MappedNewsBlock = () => {
  const props = mapJsonToNewsBlockProps(jsonData)

  return <NewsBlock {...props} />
}

export default MappedNewsBlock
