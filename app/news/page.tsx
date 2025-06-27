import type { Metadata } from 'next'

import { newsApi } from '../../lib/microcms-app-router'
import type { NewsItem } from '../../types/news'
import AppRouterAfterContentArea from '../../components/AppRouterAfterContentArea'
import AppRouterFormattedDate from '../../components/AppRouterFormattedDate'
import AppRouterInquiryContent from '../../components/AppRouterInquiryContent'
import AppRouterLink from '../../components/AppRouterLink'

export const metadata: Metadata = {
  title: 'お知らせ',
  description: '兵庫ひきこもり相談支援センター 阪神ブランチからのお知らせです。最新のイベント情報や重要なご案内をお届けします。',
  openGraph: {
    title: 'お知らせ | 兵庫ひきこもり相談支援センター 阪神ブランチ',
    description: '兵庫ひきこもり相談支援センター 阪神ブランチからの最新のお知らせとイベント情報です。',
  },
}

/**
 * ニュース一覧ページ（App Router版）
 * - Server Component として実装
 * - microCMS からデータ取得
 * - SEO最適化
 * - アクセシビリティ対応
 */
export default async function NewsPage() {
  // microCMS からニュース一覧を取得
  const { contents: newsItems } = await newsApi.getAll({ limit: 50 })

  return (
    <AppRouterInquiryContent>
      <div className="py-8">
        {/* ページヘッダー */}
        <header className="alignfull bg-dots3 py-12 text-center">
          <div className="container">
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
              お知らせ
            </h1>
          </div>
        </header>

        {/* イントロダクション */}
        <section className="mx-auto max-w-2xl px-4">
          <div className="mt-8">
            <p className="text-lg text-gray-700">
              お知らせやイベント情報をお届けします。
            </p>
          </div>
        </section>

        {/* ニュース一覧 */}
        <section className="mx-auto max-w-2xl px-4 py-8" aria-labelledby="news-list">
          <h2 id="news-list" className="sr-only">
            お知らせ一覧
          </h2>
          
          {newsItems.length > 0 ? (
            <div role="list" className="space-y-0">
              {newsItems.map((newsItem: NewsItem) => (
                <article 
                  key={newsItem.id} 
                  className="border-b border-dashed border-primary-100 py-6 first:pt-0 last:border-b-0"
                  role="listitem"
                >
                  <h3 className="text-xl font-bold">
                    <AppRouterLink
                      href={`/news/${newsItem.id}`}
                      className="text-primary-600 hover:text-primary-700 focus:text-primary-700 !px-0"
                    >
                      {newsItem.title}
                    </AppRouterLink>
                  </h3>
                  
                  <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <span>投稿日：</span>
                    <AppRouterFormattedDate 
                      dateString={newsItem.date}
                      className="font-medium"
                    />
                  </p>
                  
                  {/* 抜粋表示（bodyの最初の100文字） */}
                  {newsItem.body && (
                    <p className="mt-3 text-gray-700 line-clamp-3">
                      {newsItem.body.replace(/(<([^>]+)>)/gi, '').slice(0, 150)}
                      {newsItem.body.replace(/(<([^>]+)>)/gi, '').length > 150 && '...'}
                    </p>
                  )}
                  
                  <div className="mt-4">
                    <AppRouterLink
                      href={`/news/${newsItem.id}`}
                      variant="primary"
                      showArrow
                      className="text-sm"
                    >
                      詳細を見る
                    </AppRouterLink>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                現在、表示できるお知らせはありません。
              </p>
            </div>
          )}
        </section>

        {/* CTA セクション */}
        <section className="px-4" aria-labelledby="cta-section">
          <h2 id="cta-section" className="sr-only">
            相談のご案内
          </h2>
          <AppRouterAfterContentArea />
        </section>
      </div>
    </AppRouterInquiryContent>
  )
}