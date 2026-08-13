import ReactMarkdown from 'react-markdown'
import { Link } from '@/shared/lib/i18n/navigation'
import { Tag } from '@/shared/ui/tag'
import type { Post } from '../model/types'

const markdownComponents = {
  a: (props: React.ComponentProps<'a'>) => <a {...props} className="underline hover:opacity-70" />,
  ul: (props: React.ComponentProps<'ul'>) => <ul {...props} className="list-disc pl-6" />,
  ol: (props: React.ComponentProps<'ol'>) => <ol {...props} className="list-decimal pl-6" />,
}

type PostDetailsProps = {
  post: Post
}

export const PostDetails = ({ post }: PostDetailsProps) => (
  <article className="flex flex-col gap-2">
    <h1>{post.title}</h1>
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
    <div className="flex flex-col gap-2 text-secondary">
      <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
    </div>
    {post.tags.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Tag key={tag} href={`/blog/tag/${tag}`}>
            {tag}
          </Tag>
        ))}
      </div>
    )}
  </article>
)
