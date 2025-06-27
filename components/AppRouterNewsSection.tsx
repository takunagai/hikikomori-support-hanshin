import Image from 'next/image'
import Link from 'next/link'
import { FaDove } from 'react-icons/fa'

import type { NewsItem } from '../types/news'
import { NEWS_CONFIG } from '../lib/constants'
import FormattedDate from './FormattedDate'
import AppRouterLink from './AppRouterLink'

interface AppRouterNewsSectionProps {
  newsItems: NewsItem[]
}

/**
 * App Router 対応 ニュースセクション
 * - Server Component として実装
 * - microCMS からのニュースデータ表示
 * - リーフレット表示機能
 */
export default function AppRouterNewsSection({ newsItems }: AppRouterNewsSectionProps) {
  return (
    <section className="py-12" aria-labelledby="news-section">
      <h2 id="news-section" className="flex items-center justify-center text-2xl font-semibold text-gray-900">
        <FaDove 
          className="mr-2 text-secondary-300" 
          aria-hidden="true" 
        />
        お知らせ
      </h2>
      
      {/* ニュース一覧 */}
      <div className="mx-auto max-w-2xl px-4">
        {newsItems.length > 0 ? (
          <ul className="mt-8 list-square pl-5 marker:text-secondary-400 space-y-2">
            {newsItems.slice(0, NEWS_CONFIG.DISPLAY_LIMIT).map((newsItem: NewsItem) => (
              <li 
                key={newsItem.id} 
                className="border-b border-dashed border-primary-100 py-2 last:border-b-0"
              >
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
                  <span className="flex-shrink-0 text-xs text-gray-600 md:text-sm">
                    <FormattedDate 
                      dateString={newsItem.date}
                      className="font-medium"
                    />
                  </span>
                  <Link
                    href={`/news/${newsItem.id}`}
                    className="text-primary"
                  >
                    {newsItem.title}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 text-center">
            <p className="text-gray-500">現在表示できるお知らせはありません。</p>
          </div>
        )}
      </div>

      {/* リーフレット表示 */}
      {newsItems.some(item => item.postThumbnail) && (
        <div className="mx-4 mt-8">
          <ul className="flex flex-wrap justify-center gap-4">
            {newsItems
              .slice(0, NEWS_CONFIG.LEAFLET_DISPLAY_LIMIT)
              .filter(newsItem => newsItem.postThumbnail)
              .map((newsItem: NewsItem) => (
                <li key={`leaflet-${newsItem.id}`} className="flex-shrink-0">
                  <AppRouterLink
                    href={`/news/${newsItem.id}`}
                    className="block transition-opacity hover:opacity-80 focus:opacity-80"
                    aria-label={`${newsItem.title}の詳細を見る`}
                  >
                    <Image
                      src={newsItem.postThumbnail!.url}
                      width={newsItem.postThumbnail!.width}
                      height={newsItem.postThumbnail!.height}
                      alt={newsItem.title}
                      className="max-w-[200px] shadow-lg rounded"
                    />
                  </AppRouterLink>
                </li>
              ))}
          </ul>
        </div>
      )}
      
      {/* ニュース一覧へのリンク */}
      <div className="mt-8 text-center">
        <AppRouterLink
          href="/news"
          variant="primary"
          showArrow
          className="text-lg"
        >
          お知らせ一覧を見る
        </AppRouterLink>
      </div>
    </section>
  )
}