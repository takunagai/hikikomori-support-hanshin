import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { newsApi } from '../../../lib/microcms-app-router'
import type { NewsItem } from '../../../types/news'
import AppRouterFormattedDate from '../../../components/AppRouterFormattedDate'
import AppRouterInquiryContent from '../../../components/AppRouterInquiryContent'
import AppRouterLink from '../../../components/AppRouterLink'
import AppRouterNewsContent from '../../../components/AppRouterNewsContent'

interface NewsDetailPageProps {
  params: {
    id: string
  }
}

/**
 * 動的メタデータ生成
 */
export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  try {
    const newsArticle = await newsApi.getById(params.id)
    const description = newsArticle.body
      ?.replace(/(<([^>]+)>)/gi, '')
      .slice(0, 160) || ''

    return {
      title: newsArticle.title,
      description,
      openGraph: {
        title: `${newsArticle.title} | 兵庫ひきこもり相談支援センター 阪神ブランチ`,
        description,
        type: 'article',
        publishedTime: newsArticle.date,
      },
    }
  } catch {
    return {
      title: 'お知らせが見つかりません',
      description: '指定されたお知らせが見つかりませんでした。',
    }
  }
}

/**
 * 静的パラメータ生成
 */
export async function generateStaticParams() {
  try {
    const newsIds = await newsApi.getAllIds()
    return newsIds.map((id) => ({
      id,
    }))
  } catch (error) {
    console.error('Failed to generate static params for news:', error)
    return []
  }
}

/**
 * ニュース詳細ページ（App Router版）
 * - Server Component として実装
 * - 動的ルート対応
 * - エラーハンドリング
 * - SEO最適化
 */
export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  let newsArticle: NewsItem

  try {
    newsArticle = await newsApi.getById(params.id)
  } catch (error) {
    console.error(`Failed to fetch news article ${params.id}:`, error)
    notFound()
  }

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

        {/* パンくずナビ */}
        <nav className="mx-auto max-w-2xl px-4 py-4" aria-label="パンくずナビゲーション">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <AppRouterLink href="/" variant="default">
                ホーム
              </AppRouterLink>
            </li>
            <li className="before:content-['/'] before:mx-2">
              <AppRouterLink href="/news" variant="default">
                お知らせ
              </AppRouterLink>
            </li>
            <li className="before:content-['/'] before:mx-2 text-gray-900 font-medium">
              {newsArticle.title}
            </li>
          </ol>
        </nav>

        {/* 記事メイン */}
        <article className="mx-auto max-w-2xl px-4 py-8">
          <header>
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {newsArticle.title}
            </h2>
            
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>投稿日：</span>
                <AppRouterFormattedDate 
                  dateString={newsArticle.date}
                  className="font-medium"
                  showWeekday
                />
              </div>
            </div>
          </header>

          {/* 記事本文 */}
          {newsArticle.body && (
            <div className="mt-8">
              <AppRouterNewsContent 
                content={newsArticle.body}
                className="text-gray-800"
              />
            </div>
          )}
        </article>

        {/* ナビゲーション */}
        <nav className="mx-auto max-w-2xl px-4 py-8" aria-label="記事ナビゲーション">
          <div className="flex flex-col gap-4 text-center sm:flex-row sm:justify-center">
            <AppRouterLink 
              href="/" 
              variant="primary"
              className="inline-block rounded-lg bg-primary-600 px-16 py-3 text-white font-medium transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              トップページへ
            </AppRouterLink>
            
            <AppRouterLink 
              href="/news"
              variant="secondary"
              className="inline-block rounded-lg bg-secondary-600 px-8 py-3 text-white font-medium transition-colors hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2"
            >
              お知らせ一覧へ
            </AppRouterLink>
          </div>
        </nav>
      </div>
    </AppRouterInquiryContent>
  )
}