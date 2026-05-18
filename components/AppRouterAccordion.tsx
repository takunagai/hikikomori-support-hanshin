'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

interface AppRouterAccordionProps {
  title: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

/**
 * App Router 対応 Accordion コンポーネント
 * - Client Component として実装
 * - Framer Motion アニメーション
 * - アクセシビリティ完全対応
 */
export default function AppRouterAccordion({
  title,
  children,
  defaultOpen = false,
}: AppRouterAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="-mt-px border bg-white first:rounded-t-lg last:rounded-b-lg dark:border-gray-700 dark:bg-gray-800">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex w-full items-center gap-x-3 py-4 px-5 text-left font-bold text-primary transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset dark:text-gray-200 dark:hover:bg-gray-700/50"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title?.toString().replace(/\s+/g, '-').toLowerCase()}`}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
      >
        <motion.svg
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="h-3 w-3 text-gray-600 dark:text-gray-400"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M1.5 8.85999L14.5 8.85998"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <path
            d="M8 15.36L8 2.35999"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </motion.svg>

        <span className="flex-1">{title}</span>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden"
            id={`accordion-content-${title?.toString().replace(/\s+/g, '-').toLowerCase()}`}
            role="region"
            aria-labelledby={`accordion-button-${title?.toString().replace(/\s+/g, '-').toLowerCase()}`}
          >
            <div className="px-5 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
