import Link from 'next/link'

interface SiteLogoProps {
  home?: boolean
  siteTitle: string
}

/**
 * App Router 対応 SiteLogo コンポーネント
 * - Server Component として実装可能
 * - アクセシビリティ最適化
 */
export default function SiteLogo({ home = false, siteTitle }: SiteLogoProps) {
  const commonClasses =
    'site-title flex-none text-xl font-bold text-primary dark:text-white transition-colors hover:text-primary-600 dark:hover:text-primary-400'

  if (home) {
    return <h1 className={commonClasses}>{siteTitle}</h1>
  }

  return (
    <div className={commonClasses}>
      <Link
        href="/"
        className="block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
        aria-label={`${siteTitle} - ホームページに戻る`}
      >
        {siteTitle}
      </Link>
    </div>
  )
}
