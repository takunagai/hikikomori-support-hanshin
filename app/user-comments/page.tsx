import type { Metadata } from 'next'

import { userCommentsApi } from '../../lib/microcms-app-router'
import AppRouterAfterContentArea from '../../components/AppRouterAfterContentArea'
import AppRouterInquiryContent from '../../components/AppRouterInquiryContent'
import AppRouterUserCommentsGrid from '../../components/AppRouterUserCommentsGrid'

export const metadata: Metadata = {
  title: 'ご利用者様の声',
  description: '兵庫ひきこもり相談支援センター 阪神ブランチをご利用いただいた方々からの声を紹介します。実際の体験談やメッセージをご覧ください。',
  openGraph: {
    title: 'ご利用者様の声 | 兵庫ひきこもり相談支援センター 阪神ブランチ',
    description: '兵庫ひきこもり相談支援センター 阪神ブランチをご利用いただいた方々からの声を紹介します。',
  },
}

/**
 * ご利用者様の声ページ（App Router版）
 * - Server Component + Client Component の適切な分離
 * - microCMS からデータ取得
 * - アニメーション対応
 * - SEO最適化
 */
export default async function UserCommentsPage() {
  // microCMS からユーザーコメントを取得
  const userComments = await userCommentsApi.getAll()

  return (
    <AppRouterInquiryContent>
      <div className="py-8">
        {/* ページヘッダー */}
        <header className="alignfull bg-dots3 py-12 text-center">
          <div className="container">
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
              ご利用者様の声
            </h1>
          </div>
        </header>

        {/* イントロダクション */}
        <section className="mx-auto max-w-2xl px-4">
          <div className="mt-8">
            <p className="text-lg text-gray-700">
              当センターをご利用いただいた方々からいただいた声を紹介します。
            </p>
          </div>
        </section>

        {/* ユーザーコメント表示エリア */}
        <section className="px-4 py-8" aria-labelledby="user-comments-section">
          <h2 id="user-comments-section" className="sr-only">
            利用者の体験談
          </h2>
          
          {userComments.length > 0 ? (
            <AppRouterUserCommentsGrid userComments={userComments} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                現在、表示できるご利用者様の声はありません。
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