import type { Metadata } from 'next'

import { newsApi } from '../lib/microcms-app-router'
import { NEWS_CONFIG, SITE_CONFIG } from '../lib/constants'
import AppRouterAccessMap from '../components/AppRouterAccessMap'
import AppRouterHeroSection from '../components/AppRouterHeroSection'
import AppRouterNewsSection from '../components/AppRouterNewsSection'
import AppRouterPlacesSection from '../components/AppRouterPlacesSection'
import AppRouterSupportSection from '../components/AppRouterSupportSection'

export const metadata: Metadata = {
  title: SITE_CONFIG.TITLE,
  description: 'ひきこもりでお悩みの方やそのご家族の相談窓口です。兵庫県阪神地域で無料の相談支援を行っています。専門の相談員による相談(電話・来所・訪問)、居場所の提供、ひきこもりに関するセミナーや研修会なども開催しています。',
  openGraph: {
    title: SITE_CONFIG.TITLE,
    description: 'ひきこもりでお悩みの方やそのご家族の相談窓口です。兵庫県阪神地域で無料の相談支援を行っています。',
    type: 'website',
  },
}

/**
 * App Router トップページ（完全実装版）
 * - Server Component として実装
 * - microCMS連携によるニュース表示
 * - フル機能実装完了
 */
export default async function HomePage() {
  // microCMS からニュースデータを取得
  const { contents: newsItems } = await newsApi.getAll({ 
    limit: NEWS_CONFIG.FETCH_LIMIT 
  })

  return (
    <div>
      {/* ヒーローセクション */}
      <AppRouterHeroSection />

      {/* お知らせセクション */}
      <AppRouterNewsSection newsItems={newsItems} />

      <hr />

      {/* ひきこもり支援セクション */}
      <AppRouterSupportSection />

      <hr />

      {/* アクセスマップ */}
      <div className="py-12">
        <AppRouterAccessMap />
      </div>

      <hr />

      {/* 居場所情報セクション */}
      <AppRouterPlacesSection />
    </div>
  )
}