import type { Metadata } from 'next'

import { NEWS_CONFIG } from '../../lib/constants'
import { newsApi } from '../../lib/microcms-app-router'
import type { NewsItem } from '../../types/news'
import AppRouterAfterContentArea from '../../components/AppRouterAfterContentArea'
import FormattedDate from '../../components/FormattedDate'
import AppRouterInquiryContent from '../../components/AppRouterInquiryContent'
import AppRouterLink from '../../components/AppRouterLink'

export const metadata: Metadata = {
  title: '活動報告',
  description: '兵庫ひきこもり相談支援センター 阪神ブランチの活動報告です。',
  openGraph: {
    title: '活動報告 | 兵庫ひきこもり相談支援センター 阪神ブランチ',
    description: '兵庫ひきこもり相談支援センター 阪神ブランチからの活動報告です。',
  },
}

/**
 * 活動報告一覧ページ（App Router版）
 * - Server Component として実装
 * - microCMS からデータ取得
 * - SEO最適化
 * - アクセシビリティ対応
 */
export default async function NewsPage() {
  // microCMS から活動報告一覧を取得（APIレベルでフィルタリング）
  const { contents: newsItems } = await newsApi.getAll({
    limit: NEWS_CONFIG.NEWS_PAGE_FETCH_LIMIT,
    filters: `status[contains]${NEWS_CONFIG.REPORT_STATUS}`,
  })

  return (
    <AppRouterInquiryContent>
      <div className="pb-8">
        {/* ページヘッダー */}
        <h1 className="alignfull bg-dots3">活動報告</h1>

        {/* イントロダクション */}
        <section className="mx-auto max-w-2xl px-4">
          <div className="mt-8">
            <p className="text-lg text-gray-700">
              過去に行った活動のレポートです。
            </p>
            <p className="mt-0 text-gray-700">
              お知らせや今後のイベントは
              <AppRouterLink href={'/'}>トップページ</AppRouterLink>でご覧ください。
            </p>
          </div>
        </section>

        {/* 活動報告一覧 */}
        <section className="mx-auto max-w-2xl px-4 py-8" aria-labelledby="news-list">
          <h2 id="news-list" className="sr-only">
            活動報告一覧
          </h2>

          {newsItems.length > 0 ? (
            <ul className="space-y-0">
              {newsItems.map((newsItem: NewsItem) => (
                <li
                  key={newsItem.id}
                  className="border-b border-dashed border-primary-100 py-6 first:pt-0 last:border-b-0"
                >
                  <article>
                    <h3 className="text-lg text-left">
                      <AppRouterLink
                        href={`/news/${newsItem.id}`}
                        className="!font-bold text-primary-600 hover:text-primary-700 focus:text-primary-700 !px-0"
                      >
                        {newsItem.title}
                      </AppRouterLink>
                    </h3>
                    <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                      <span>投稿日：</span>
                      <FormattedDate
                        dateString={newsItem.date}
                        className="font-medium"
                      />
                    </p>
                  </article>
                </li>
              ))}
            </ul>
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