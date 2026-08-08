import { Link } from '@/shared/lib/i18n/navigation'
import type { Post } from '../model/types'

type PostCardProps = {
  post: Post
}

export const PostCard = ({ post }: PostCardProps) => (
  <Link href={`/blog/${post.slug}`}>
    <article className="flex flex-col gap-2 rounded-md bg-secondary p-4 transition-transform hover:scale-102">
      <h2 className="text-lg font-bold">{post.title}</h2>
      <p className="text-secondary line-clamp-3">{post.content}</p>
      <div className="flex items-center gap-2">
        <time dateTime={post.createdAt.toISOString()} className="text-xs text-secondary opacity-50">
          {post.createdAt.toLocaleDateString()}
        </time>

        <span className="text-xs text-secondary opacity-50">{post.category.name}</span>
      </div>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-primary px-2 py-0.5 text-xs text-secondary">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  </Link>
)
