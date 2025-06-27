/**
 * グローバルローディングUI
 * ページやセクションの読み込み中に表示される
 */
export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="読み込み中">
      <div className="text-center">
        {/* スピナーアニメーション */}
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary-600"></div>
        
        {/* ローディングテキスト */}
        <p className="text-sm text-gray-600">
          読み込み中...
        </p>
        
        {/* アクセシビリティ用の隠しテキスト */}
        <span className="sr-only">ページを読み込んでいます。しばらくお待ちください。</span>
      </div>
    </div>
  )
}

/**
 * より詳細なローディング状態のためのコンポーネント
 * 特定のセクションで使用可能
 */
export function DetailedLoading({ message = "読み込み中..." }: { message?: string }) {
  return (
    <div className="flex min-h-[30vh] items-center justify-center" role="status" aria-label={message}>
      <div className="text-center">
        <div className="mx-auto mb-6 h-16 w-16">
          {/* より複雑なアニメーション */}
          <div className="grid h-16 w-16 grid-cols-2 gap-2">
            <div className="animate-pulse rounded bg-primary-200"></div>
            <div className="animate-pulse rounded bg-primary-300" style={{ animationDelay: '0.1s' }}></div>
            <div className="animate-pulse rounded bg-primary-300" style={{ animationDelay: '0.2s' }}></div>
            <div className="animate-pulse rounded bg-primary-200" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
        
        <h3 className="mb-2 text-lg font-medium text-gray-800">{message}</h3>
        <p className="text-sm text-gray-600">
          しばらくお待ちください
        </p>
        
        <span className="sr-only">{message}。しばらくお待ちください。</span>
      </div>
    </div>
  )
}

/**
 * スケルトンローディング用のコンポーネント
 * リストやカード表示の読み込み中に使用
 */
export function SkeletonLoading() {
  return (
    <div className="space-y-4" role="status" aria-label="コンテンツを読み込み中">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-lg border p-4">
          <div className="mb-3 h-4 w-3/4 rounded bg-gray-200"></div>
          <div className="mb-2 h-3 w-full rounded bg-gray-200"></div>
          <div className="h-3 w-2/3 rounded bg-gray-200"></div>
        </div>
      ))}
      <span className="sr-only">コンテンツを読み込んでいます。しばらくお待ちください。</span>
    </div>
  )
}