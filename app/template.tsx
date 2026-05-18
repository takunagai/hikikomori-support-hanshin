'use client'

import { motion } from 'motion/react'
import type { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

/**
 * App Router用のページ遷移アニメーション
 * Pages RouterのAnimatePresenceの代替実装
 */
const Template: FC<Props> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3,
      }}
      onAnimationComplete={() => {
        // ページ遷移完了時にトップにスクロール
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0)
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export default Template
