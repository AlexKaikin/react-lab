import { Link } from '@/shared/lib/i18n/navigation'
import { stripMarkdown } from '../lib/strip-markdown'
import type { Post } from '../model/types'
import { PostTags } from './post-tags'

type PostCardProps = {
  post: Post
}

export const PostCard = ({ post }: PostCardProps) => (
  <Link href={`/blog/${post.slug}`}>
    <article className="paper flex flex-col gap-2 p-4 transition-transform hover:scale-102">
      <h2 className="line-clamp-2 text-lg font-bold">{post.title}</h2>
      <p className="text-secondary line-clamp-3">{stripMarkdown(post.content)}</p>
      <div className="flex items-center gap-2">
        <time dateTime={post.createdAt.toISOString()} className="text-xs text-secondary opacity-50">
          {post.createdAt.toLocaleDateString()}
        </time>

        <span className="text-xs text-secondary opacity-50">{post.category.name}</span>
      </div>

      <PostTags tags={post.tags} />
    </article>
  </Link>
)
