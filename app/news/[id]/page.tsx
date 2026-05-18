import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AppRouterInquiryContent from '../../../components/AppRouterInquiryContent'
import AppRouterLink from '../../../components/AppRouterLink'
import AppRouterNewsContent from '../../../components/AppRouterNewsContent'
import FormattedDate from '../../../components/FormattedDate'
import { newsApi } from '../../../lib/microcms-app-router'
import type { NewsItem } from '../../../types/news'

interface NewsDetailPageProps {
  params: Promise<{ id: string }>
}

/**
 * 動的メタデータ生成
 */
export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const newsArticle = await newsApi.getById(id)
    const description = newsArticle.body?.replace(/(<([^>]+)>)/gi, '').slice(0, 160) || ''

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
  const { id } = await params
  let newsArticle: NewsItem

  try {
    newsArticle = await newsApi.getById(id)
  } catch (error) {
    console.error(`Failed to fetch news article ${id}:`, error)
    notFound()
  }

  const isReport = newsArticle.status?.includes('レポート') ?? false

  return (
    <AppRouterInquiryContent>
      <div className="pb-8">
        {/* ページヘッダー */}
        <header className="alignfull bg-dots3 py-12 text-center">
          <div className="container">
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">お知らせ</h1>
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
          </ol>
        </nav>

        {/* 記事メイン */}
        <article className="mx-auto max-w-2xl px-4 py-8">
          <header>
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{newsArticle.title}</h2>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>投稿日：</span>
                <FormattedDate dateString={newsArticle.date} className="font-medium" showWeekday />
              </div>
            </div>
          </header>

          {isReport && newsArticle.report && (
            <div className="mt-8">
              <AppRouterNewsContent content={newsArticle.report} className="text-gray-800" />
            </div>
          )}

          {!isReport && newsArticle.body && (
            <div className="mt-8">
              <AppRouterNewsContent content={newsArticle.body} className="text-gray-800" />
            </div>
          )}
        </article>

        {/* ナビゲーション */}
        <nav className="mx-auto max-w-2xl px-4 py-8" aria-label="記事ナビゲーション">
          <div className="text-center">
            <AppRouterLink href="/" className="btn btn-primary px-16">
              トップページへ
            </AppRouterLink>

            <AppRouterLink href="/news" className="btn btn-secondary px-7">
              活動報告を見る
            </AppRouterLink>
          </div>
        </nav>
      </div>
    </AppRouterInquiryContent>
  )
}
