import { Link } from '@/shared/lib/i18n/navigation'
import type { Post } from '../model/types'

type PostDetailsProps = {
  post: Post
}

export const PostDetails = ({ post }: PostDetailsProps) => (
  <article className="flex flex-col gap-2">
    <h1 className="text-2xl font-bold">{post.title}</h1>
    <div className="flex items-center gap-2">
      <time dateTime={post.createdAt.toISOString()} className="text-sm text-secondary opacity-50">
        {post.createdAt.toLocaleDateString()}
      </time>

      <Link
        href={`/blog/category/${post.category.slug}`}
        className="text-sm text-secondary opacity-50 hover:opacity-100"
      >
        {post.category.name}
      </Link>
    </div>
    <p className="text-secondary whitespace-pre-line">{post.content}</p>
    {post.tags.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog/tag/${tag}`}
            className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary hover:bg-primary"
          >
            {tag}
          </Link>
        ))}
      </div>
    )}
  </article>
)
