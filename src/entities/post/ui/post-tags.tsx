import { Tag } from '@/shared/ui/tag'

const MAX_VISIBLE_TAGS = 4

type PostTagsProps = {
  tags: string[]
}

export const PostTags = ({ tags }: PostTagsProps) => {
  if (tags.length === 0) return null

  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS)
  const hiddenCount = tags.length - visibleTags.length

  return (
    <div className="flex flex-nowrap items-center gap-2">
      {visibleTags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
      {hiddenCount > 0 && <span className="shrink-0 text-xs text-secondary opacity-50">+{hiddenCount}</span>}
    </div>
  )
}
