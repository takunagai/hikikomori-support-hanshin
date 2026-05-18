import DOMPurify from 'isomorphic-dompurify'

interface NewsContentProps {
  content: string
  className?: string
}

/**
 * ニュースコンテンツ表示 (Server Component)
 * isomorphic-dompurify で SSR 時にサニタイズし、Client JS と FOUC を回避。
 */
export default function NewsContent({ content, className = '' }: NewsContentProps) {
  const sanitized = DOMPurify.sanitize(content)
  return (
    <div
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  )
}
