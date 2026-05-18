'use client'

import { motion } from 'motion/react'

interface AppRouterNavbarCollapseButtonProps {
  isOpen: boolean
  onClick: () => void
  'aria-label'?: string
}

/**
 * App Router 対応 NavbarCollapseButton コンポーネント
 * - Client Component として実装
 * - Framer Motion アニメーション
 * - アクセシビリティ完全対応
 */
export default function AppRouterNavbarCollapseButton({ 
  isOpen, 
  onClick, 
  'aria-label': ariaLabel = isOpen ? 'メニューを閉じる' : 'メニューを開く'
}: AppRouterNavbarCollapseButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded p-2 align-middle text-primary transition-colors hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
      aria-controls="navbar-collapse"
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      <div className="relative h-5 w-5" aria-hidden="true">
        {/* 上の線 */}
        <motion.span
          className="absolute top-2 block h-0.5 w-5 bg-current"
          variants={{
            open: {
              rotate: 45,
              y: 0,
            },
            closed: {
              rotate: 0,
              y: 0,
            },
          }}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
        
        {/* 真ん中の線 */}
        <motion.span
          className="absolute top-2 block h-0.5 w-5 bg-current"
          variants={{
            open: {
              rotate: -45,
              y: 0,
            },
            closed: {
              rotate: 0,
              y: -8,
            },
          }}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
        
        {/* 下の線 */}
        <motion.span
          className="absolute top-2 block h-0.5 w-5 bg-current"
          variants={{
            open: {
              rotate: -45,
              y: 0,
              opacity: 0,
            },
            closed: {
              rotate: 0,
              y: 8,
              opacity: 1,
            },
          }}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
      </div>
      
      {/* スクリーンリーダー向けの状態テキスト */}
      <span className="sr-only">
        {isOpen ? 'ナビゲーションメニューが開いています' : 'ナビゲーションメニューが閉じています'}
      </span>
    </motion.button>
  )
}