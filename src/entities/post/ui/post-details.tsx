import type { ReactNode } from 'react'
import { Tag } from '@/shared/ui/tag'
import type { Post } from '../model/types'
import { PostContent } from './post-content'

type PostDetailsProps = {
  post: Omit<Post, 'content'>
  content?: string
  contentFallback?: ReactNode
}

export const PostDetails = ({ post, content, contentFallback }: PostDetailsProps) => (
  <article className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h1>{post.title}</h1>
      <div className="flex items-center gap-2">
        <time dateTime={post.createdAt.toISOString()} className="text-sm text-secondary opacity-50">
          {post.createdAt.toLocaleDateString()}
        </time>

        <span className="text-sm text-secondary opacity-50">{post.category.name}</span>
      </div>
    </div>

    {content && <PostContent content={content} />}
    {!content && contentFallback}

    {post.tags.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Tag key={tag} href={`/blog/tag/${tag}`} color="primary">
            {tag}
          </Tag>
        ))}
      </div>
    )}
  </article>
)
