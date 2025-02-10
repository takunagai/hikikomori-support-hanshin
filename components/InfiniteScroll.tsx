import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  itemsPerPage?: number
  threshold?: number
  loadMoreText?: string
}

const InfiniteScroll = ({
  children,
  itemsPerPage = 6,
  threshold = 0.1,
  loadMoreText = "読み込み中...",
}: Props) => {
  const [displayCount, setDisplayCount] = useState(itemsPerPage)
  const [isLoading, setIsLoading] = useState(false)
  const loaderRef = useRef<HTMLDivElement>(null)

  // childrenが配列でない場合は配列に変換
  const items = Array.isArray(children) ? children : [children]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && displayCount < items.length) {
          setIsLoading(true)
          setTimeout(() => {
            setDisplayCount((prev) => Math.min(prev + itemsPerPage, items.length))
            setIsLoading(false)
          }, 500) // ローディングを見せるために少し遅延を入れる
        }
      },
      {
        threshold,
      }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [items.length, displayCount, itemsPerPage, threshold])

  return (
    <>
      {items.slice(0, displayCount)}
      {displayCount < items.length && (
        <div
          ref={loaderRef}
          className="col-span-full mt-8 flex items-center justify-center py-4 text-gray-500"
        >
          <div className="flex items-center gap-2">
            <svg
              className={`h-5 w-5 animate-spin text-primary-500 ${
                isLoading ? "opacity-100" : "opacity-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="font-medium">{loadMoreText}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default InfiniteScroll
