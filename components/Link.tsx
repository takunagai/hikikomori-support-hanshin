'use client'

import { motion } from 'motion/react'
import NextLink from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface LinkProps extends ComponentPropsWithoutRef<typeof NextLink> {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary'
  showArrow?: boolean
  external?: boolean
}

/**
 * App Router 対応 Link コンポーネント
 * - Client Component として実装
 * - Framer Motion アニメーション
 * - 外部リンク対応
 * - バリアント対応
 */
export default function Link({
  children,
  variant = 'default',
  showArrow = false,
  external = false,
  className = '',
  ...props
}: LinkProps) {
  const baseStyles =
    'relative inline-flex items-center gap-1 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded'

  const variantStyles = {
    default: 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200',
    primary:
      'text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300',
    secondary:
      'text-secondary-600 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300',
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`

  const content = (
    <>
      <span className="relative">
        {children}
        <motion.span
          className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-current"
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
      </span>

      {showArrow && (
        <motion.svg
          className="h-4 w-4"
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </motion.svg>
      )}

      {external && (
        <svg
          className="h-3 w-3 opacity-70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      )}
    </>
  )

  // 外部リンクの場合 (NextLink の prefetch 等は不要、素の <a> で完結)
  if (external) {
    const { href, ...anchorProps } = props
    return (
      <a
        href={typeof href === 'string' ? href : href.toString()}
        {...anchorProps}
        className={combinedClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    )
  }

  // 内部リンクの場合
  return (
    <NextLink {...props} className={combinedClassName}>
      {content}
    </NextLink>
  )
}
