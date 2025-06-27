import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ホーム',
  description: 'ひきこもりでお悩みの方やそのご家族の相談窓口です。兵庫県阪神地域で無料の相談支援を行っています。',
}

/**
 * App Router トップページ（暫定実装）
 * Phase 2でmicroCMS連携とフル機能を実装予定
 */
export default function HomePage() {
  return (
    <div className="space-y-16 py-8">
      {/* ヒーローセクション */}
      <section className="text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            兵庫ひきこもり相談支援センター
            <br />
            <span className="text-primary-600">阪神ブランチ</span>
          </h1>
          <p className="mb-8 text-lg text-gray-600 md:text-xl">
            ひきこもりでお悩みの方やそのご家族の相談窓口です。
            <br />
            兵庫県阪神地域で無料の相談支援を行っています。
          </p>
          <div className="space-x-4">
            <Link
              href="/inquiry"
              className="inline-block rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700"
            >
              お問い合わせ
            </Link>
            <Link
              href="/faq"
              className="inline-block rounded-lg border border-primary-600 px-6 py-3 font-medium text-primary-600 transition-colors hover:bg-primary-50"
            >
              よくある質問
            </Link>
          </div>
        </div>
      </section>

      {/* サービス紹介 */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            私たちのサービス
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 text-center shadow">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">相談支援</h3>
              <p className="text-gray-600">
                ひきこもりに関する悩みについて、専門スタッフが丁寧にお話を伺います。
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">居場所提供</h3>
              <p className="text-gray-600">
                安心して過ごせる居場所やグループ活動の情報をご提供します。
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">情報提供</h3>
              <p className="text-gray-600">
                支援制度や各種情報について、わかりやすくご案内します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* お知らせセクション（Phase 2で実装予定） */}
      <section>
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">お知らせ</h2>
          <div className="rounded-lg border bg-gray-50 p-8 text-center">
            <p className="text-gray-600">
              お知らせ機能は Phase 2 で実装予定です。
              <br />
              microCMS との連携により最新情報をお届けします。
            </p>
            <Link
              href="/news"
              className="mt-4 inline-block text-primary-600 hover:text-primary-800 hover:underline"
            >
              お知らせ一覧を見る
            </Link>
          </div>
        </div>
      </section>

      {/* アクセス情報 */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            対象地域
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold">市部</h3>
              <ul className="space-y-2 text-gray-600">
                <li>尼崎市</li>
                <li>西宮市</li>
                <li>芦屋市</li>
                <li>伊丹市</li>
                <li>宝塚市</li>
                <li>川西市</li>
                <li>三田市</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold">町部</h3>
              <ul className="space-y-2 text-gray-600">
                <li>川辺郡猪名川町</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            お気軽にご相談ください
          </h2>
          <p className="mb-8 text-gray-600">
            ひとりで悩まず、まずはお話をお聞かせください。
            <br />
            相談は無料です。
          </p>
          <Link
            href="/inquiry"
            className="inline-block rounded-lg bg-primary-600 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-primary-700"
          >
            相談のお申し込み
          </Link>
        </div>
      </section>
    </div>
  )
}