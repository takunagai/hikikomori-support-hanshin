'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface InquiryContentProps {
  children: ReactNode
}

/**
 * App Router 対応 お問い合わせページ アニメーション
 * - Client Component として実装
 * - Framer Motion アニメーション対応
 */
export default function InquiryContent({ children }: InquiryContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
