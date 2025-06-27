'use client'

import { motion } from 'framer-motion'
import type { UserComment } from '../types/user-comment'

interface AppRouterUserCommentsGridProps {
  userComments: UserComment[]
}

/**
 * App Router 対応 ユーザーコメントグリッド
 * - Client Component として実装（Framer Motion使用のため）
 * - アニメーション対応
 * - レスポンシブデザイン
 */
export default function AppRouterUserCommentsGrid({ userComments }: AppRouterUserCommentsGridProps) {
  return (
    <div className="mt-8">
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userComments.map((userComment: UserComment, index: number) => (
          <motion.li
            key={userComment.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
              delay: index * 0.1,
            }}
            className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-lg bg-[#FBF7F4] p-6 shadow-md transition-all hover:shadow-lg dark:bg-gray-800/95 dark:shadow-gray-900/30"
            style={{
              backgroundImage: "url('/images/paper-texture.svg')",
              backgroundRepeat: 'repeat',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary-50/30 to-transparent dark:from-primary-900/10" />
            
            <div className="relative flex-1">
              <h3 className="mb-4 text-lg font-medium text-primary-600 dark:text-primary-400">
                {userComment.title}
              </h3>

              <div className="relative">
                <div 
                  className="absolute -left-2 -top-2 text-4xl text-primary-200 dark:text-primary-800"
                  aria-hidden="true"
                >
                  "
                </div>
                <p className="pl-4 text-gray-600 dark:text-gray-300">
                  {userComment.body}
                </p>
                <div 
                  className="absolute -bottom-4 -right-2 text-4xl text-primary-200 dark:text-primary-800"
                  aria-hidden="true"
                >
                  "
                </div>
              </div>
            </div>

            <div className="relative mt-6 flex items-center justify-end gap-2 border-t border-primary-100/50 pt-4 dark:border-primary-700/30">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {userComment.city[0]}
              </p>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {userComment.initial}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">様</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}