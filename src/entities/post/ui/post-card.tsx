import { Link } from '@/shared/lib/i18n/navigation'
import type { Post } from '../model/types'
import { PostTags } from './post-tags'

type PostCardProps = {
  post: Post
  accessLevelLabel: string
}

export const PostCard = ({ post, accessLevelLabel }: PostCardProps) => (
  <Link href={`/blog/${post.slug}`}>
    <article className="paper relative flex flex-col gap-4 p-6 transition-transform hover:scale-102 overflow-hidden">
      {post.accessLevel !== 'FREE' && (
        <span className="absolute top-0 right-0 rounded-bl-md bg-semantic-info/15 px-2 py-1 text-xs font-medium text-semantic-info">
          {accessLevelLabel}
        </span>
      )}
      <div className="flex flex-col gap-2">
        <h2 className="line-clamp-2 text-lg font-bold">{post.title}</h2>
        <p className="text-secondary line-clamp-3">{post.meta.description}</p>
      </div>

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
