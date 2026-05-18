import type { Metadata } from 'next'

import InquiryContent from '../../components/InquiryContent'
import Link from '../../components/Link'

export const metadata: Metadata = {
  title: 'サイトマップ',
  description:
    '兵庫ひきこもり相談支援センター阪神ブランチのサイトマップです。全てのページへのリンクを一覧でご覧いただけます。',
  openGraph: {
    title: 'サイトマップ | 兵庫ひきこもり相談支援センター 阪神ブランチ',
    description: '兵庫ひきこもり相談支援センター阪神ブランチのサイトマップです。',
  },
}

// サイトマップのページリスト
const sitePages = [
  { href: '/', title: 'Home', description: 'トップページ' },
  { href: '/flow', title: '相談する', description: '相談の流れとアクセス方法' },
  {
    href: '/places-and-groups',
    title: '阪神地域の居場所の一覧',
    description: '地域の支援グループ情報',
  },
  {
    href: '/reference',
    title: '相談窓口・教育支援センターの一覧',
    description: '各市町村の相談窓口情報',
  },
  {
    href: '/user-comments',
    title: 'ご利用者様の声',
    description: '実際のご利用者様からのメッセージ',
  },
  { href: '/faq', title: 'よくある質問', description: '相談に関するよくある質問と回答' },
  { href: '/news', title: 'お知らせ', description: 'センターからの最新情報' },
  { href: '/privacy-policy', title: '個人情報保護方針', description: 'プライバシーポリシー' },
  { href: '/inquiry', title: 'お問合せ', description: '電話・SNSでのお問い合わせ方法' },
] as const

/**
 * サイトマップページ（App Router版）
 * - Server Component として実装
 * - 構造化されたナビゲーション
 * - アクセシビリティ対応
 * - SEO最適化
 */
export default function SitemapPage() {
  return (
    <InquiryContent>
      <div className="pb-8">
        {/* ページヘッダー */}
        <h1 className="alignfull bg-dots3">サイトマップ</h1>

        {/* リード文 */}
        <section className="mx-auto max-w-2xl px-4">
          <p className="lead mx-auto mt-8 max-w-xl text-center text-lg text-gray-700">
            兵庫ひきこもり相談支援センター阪神ブランチのサイトマップです。
          </p>
        </section>

        {/* サイトマップ一覧 */}
        <section className="mx-auto max-w-2xl px-4 py-12" aria-labelledby="sitemap-list">
          <h2 id="sitemap-list" className="sr-only">
            サイト内のページ一覧
          </h2>

          <nav aria-label="サイトマップ">
            <ul className="mt-8 space-y-0">
              {sitePages.map((page, index) => (
                <li
                  key={page.href}
                  className="border-b border-dashed border-primary-100 py-4 first:pt-0 last:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary-400 text-xs font-bold text-white flex-shrink-0 mt-1">
                      {index + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={page.href}
                        className="block font-medium text-gray-900 hover:text-primary-600 focus:text-primary-600"
                      >
                        <span className="text-lg">{page.title}</span>
                        {page.description && (
                          <span className="block mt-1 text-sm text-gray-600">
                            {page.description}
                          </span>
                        )}
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        {/* 追加情報 */}
        <section className="mx-auto max-w-2xl px-4" aria-labelledby="additional-info">
          <div className="rounded-lg bg-blue-50 p-6 border-l-4 border-blue-400">
            <h2 id="additional-info" className="text-lg font-semibold text-blue-900 mb-3">
              ご利用について
            </h2>
            <div className="space-y-2 text-sm text-blue-800">
              <p>• 相談は無料です。お気軽にお問い合わせください。</p>
              <p>
                • 対象地域：尼崎市、西宮市、芦屋市、伊丹市、宝塚市、川西市、三田市、川辺郡猪名川町
              </p>
              <p>• 受付時間：火・水・木・金 10:00〜16:00</p>
            </div>
          </div>
        </section>
      </div>
    </InquiryContent>
  )
}
