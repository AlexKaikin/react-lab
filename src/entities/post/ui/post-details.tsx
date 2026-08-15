import ReactMarkdown from 'react-markdown'
import { Tag } from '@/shared/ui/tag'
import type { Post } from '../model/types'

const HEADING_CLASS_NAME = 'mt-6 text-primary first:mt-0'

const markdownComponents = {
  a: (props: React.ComponentProps<'a'>) => <a {...props} className="underline hover:opacity-70" />,
  ul: (props: React.ComponentProps<'ul'>) => <ul {...props} className="list-disc pl-6" />,
  ol: (props: React.ComponentProps<'ol'>) => <ol {...props} className="list-decimal pl-6" />,
  pre: (props: React.ComponentProps<'pre'>) => <pre {...props} className="paper overflow-x-auto p-4" />,
  h2: (props: React.ComponentProps<'h2'>) => <h2 {...props} className={HEADING_CLASS_NAME} />,
  h3: (props: React.ComponentProps<'h3'>) => <h3 {...props} className={HEADING_CLASS_NAME} />,
  h4: (props: React.ComponentProps<'h4'>) => <h4 {...props} className={HEADING_CLASS_NAME} />,
  h5: (props: React.ComponentProps<'h5'>) => <h5 {...props} className={HEADING_CLASS_NAME} />,
  h6: (props: React.ComponentProps<'h6'>) => <h6 {...props} className={HEADING_CLASS_NAME} />,
}

type PostDetailsProps = {
  post: Post
}

export const PostDetails = ({ post }: PostDetailsProps) => (
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

    <div className="flex flex-col gap-4 text-secondary">
      <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
    </div>

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
