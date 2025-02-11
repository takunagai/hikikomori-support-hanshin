'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold text-red-600">エラーが発生しました</h2>
      <button
        onClick={() => reset()}
        className="rounded bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
      >
        もう一度試す
      </button>
    </div>
  )
}
