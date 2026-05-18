'use client'

import Link from 'next/link'
import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * グローバルエラーページ
 * アプリケーション全体のエラーハンドリング
 */
export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // エラーをコンソールに記録（開発環境でのデバッグ用）
    if (process.env.NODE_ENV === 'development') {
      // biome-ignore lint/suspicious/noConsole: 開発時のエラー確認用
      console.error('アプリケーションエラー:', error)
    }

    // 本番環境では、エラー監視サービスにレポート
    // 例: Sentry, LogRocket等への送信
  }, [error])

  // エラーの種類によってメッセージを変更
  const getErrorMessage = (error: Error) => {
    if (error.message.includes('fetch')) {
      return 'データの取得に失敗しました。インターネット接続をご確認ください。'
    }
    if (error.message.includes('timeout')) {
      return 'リクエストがタイムアウトしました。しばらく時間をおいて再度お試しください。'
    }
    return 'システムエラーが発生しました。'
  }

  const errorMessage = getErrorMessage(error)

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="mb-8">
        {/* エラーアイコン */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-gray-900">エラーが発生しました</h1>

        <p className="mb-6 text-gray-600">{errorMessage}</p>

        {/* 開発環境でのエラー詳細表示 */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 rounded-lg bg-gray-50 p-4 text-left">
            <summary className="cursor-pointer font-medium text-gray-700">
              エラー詳細（開発環境のみ）
            </summary>
            <pre className="mt-2 overflow-auto text-xs text-gray-600">
              {error.message}
              {error.stack && (
                <>
                  {'\n\nスタックトレース:\n'}
                  {error.stack}
                </>
              )}
            </pre>
          </details>
        )}
      </div>

      <div className="space-y-4">
        {/* 再試行ボタン */}
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          もう一度試す
        </button>

        {/* ホームページに戻るリンク */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-800 hover:underline"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            トップページに戻る
          </Link>
        </div>
      </div>

      {/* サポート情報 */}
      <div className="mt-8 border-t border-gray-200 pt-8 text-sm text-gray-500">
        <p className="mb-2">問題が解決しない場合は、以下からお問い合わせください。</p>
        <Link href="/inquiry" className="text-primary-600 hover:text-primary-800 hover:underline">
          お問い合わせページ
        </Link>
      </div>
    </div>
  )
}
