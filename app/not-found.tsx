import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ページが見つかりません',
  description: 'お探しのページは見つかりませんでした。トップページから目的のページをお探しください。',
  robots: {
    index: false,
    follow: false,
  },
}

/**
 * 404 Not Found ページ
 * ユーザビリティを考慮したエラーページ
 */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="mb-8">
        <h1 className="mb-4 text-6xl font-bold text-primary-600">404</h1>
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          ページが見つかりません
        </h2>
        <p className="mb-8 text-gray-600">
          申し訳ございません。お探しのページは削除されたか、
          <br />
          URLが変更された可能性があります。
        </p>
      </div>

      <div className="mb-8 space-y-4">
        <Link
          href="/"
          className="inline-block rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          トップページに戻る
        </Link>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <p className="mb-4 text-sm font-medium text-gray-700">
          よくアクセスされるページ
        </p>
        <nav className="space-y-2">
          <Link
            href="/faq"
            className="block text-primary-600 hover:text-primary-800 hover:underline"
          >
            よくある質問
          </Link>
          <Link
            href="/flow"
            className="block text-primary-600 hover:text-primary-800 hover:underline"
          >
            相談の流れ
          </Link>
          <Link
            href="/places-and-groups"
            className="block text-primary-600 hover:text-primary-800 hover:underline"
          >
            居場所とグループ情報
          </Link>
          <Link
            href="/inquiry"
            className="block text-primary-600 hover:text-primary-800 hover:underline"
          >
            お問い合わせ
          </Link>
        </nav>
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p>
          お困りの場合は、
          <Link
            href="/inquiry"
            className="text-primary-600 hover:text-primary-800 hover:underline"
          >
            お問い合わせページ
          </Link>
          からご連絡ください。
        </p>
      </div>
    </div>
  )
}