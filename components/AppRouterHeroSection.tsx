'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

import AppRouterLink from './AppRouterLink'

/**
 * App Router 対応 ヒーローセクション
 * - Client Component として実装（Framer Motion使用のため）
 * - メインビジュアルとメッセージ表示
 * - レスポンシブデザイン
 */
export default function AppRouterHeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="alignfull bg-tertiary-100 py-8 px-4 text-center sm:px-6 lg:py-24 lg:px-8"
    >
      <div className="container flex flex-col items-center justify-center lg:flex-row">
        {/* テキスト部分 */}
        <motion.div 
          className="order-2 mx-auto max-w-lg lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="mx-auto max-w-fit rounded-xl border-2 border-dashed border-primary-300 bg-white/75 p-4 shadow ring ring-white/75">
            <p className="text-sm font-bold text-secondary-600">
              相談 / セミナー / 居場所 / 訪問支援
            </p>
            <h1 className="mt-2 pt-0 pb-2 text-[17px] font-bold text-primary-600 lg:text-xl">
              兵庫ひきこもり相談支援センター
              <br />
              阪神ブランチ
            </h1>
            <p className="mt-2 text-xs text-gray-600">
              尼崎市、西宮市、芦屋市、伊丹市、宝塚市、
              <br />
              川西市、三田市、川辺郡猪名川町
            </p>
          </div>
          
          <p className="mt-6 font-bold leading-7 tracking-wide text-primary-700">
            ひきこもりの当事者やご家族を支援する相談窓口。
            <br className="hidden md:inline" />
            専門の相談員による相談(電話・来所・訪問)、居場所の提供、ひきこもりに関するセミナーや研修会なども開催しています。
          </p>
          
          <div className="mt-6">
            <AppRouterLink 
              href="/flow"
              className="btn btn-primary px-7 md:px-16"
            >
              相談する
            </AppRouterLink>
            <AppRouterLink 
              href="/places-and-groups"
              className="btn btn-secondary lg:px-7"
            >
              居場所情報を見る
            </AppRouterLink>
          </div>
        </motion.div>
        
        {/* イラスト部分 */}
        <motion.div 
          className="order-1 mx-auto max-w-fit md:mt-6 lg:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Image
            src="/images/hanshin-branch/illust_main.png"
            width={900}
            height={637}
            alt="ひきこもり支援のイラスト"
            className="max-w-full h-auto"
            priority
          />
        </motion.div>
      </div>
    </motion.div>
  )
}