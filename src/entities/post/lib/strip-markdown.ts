import { toString as mdastToString } from 'mdast-util-to-string'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

const processor = unified().use(remarkParse)

export const stripMarkdown = (content: string) => mdastToString(processor.parse(content))
