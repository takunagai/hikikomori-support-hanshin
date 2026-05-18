'use client'

import DOMPurify from 'dompurify'
import { useEffect, useState } from 'react'

interface AppRouterNewsContentProps {
  content: string
  className?: string
}

/**
 * App Router 対応 ニュースコンテンツ表示
 * - Client Component として実装（DOMPurify使用のため）
 * - HTMLサニタイズ機能
 * - セキュリティ対応
 */
export default function AppRouterNewsContent({
  content,
  className = '',
}: AppRouterNewsContentProps) {
  const [sanitizedHtml, setSanitizedHtml] = useState(content)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSanitizedHtml(DOMPurify.sanitize(content))
    }
  }, [content])

  return (
    <div
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{
        __html: sanitizedHtml,
      }}
    />
  )
}
