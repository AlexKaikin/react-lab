import ReactMarkdown from 'react-markdown'

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

export const PostContent = ({ content }: { content: string }) => (
  <div className="flex flex-col gap-4 text-secondary">
    <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
  </div>
)
