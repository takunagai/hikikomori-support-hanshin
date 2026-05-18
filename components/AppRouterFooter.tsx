import Image from 'next/image'
import Link from 'next/link'
import { SocialLinks } from './SocialLinks'

/**
 * App Router 対応 Footer コンポーネント
 * - Server Component として実装
 * - ソーシャルリンクのみ Client Component として分離
 * - Next.js Image コンポーネントでパフォーマンス最適化
 */
export default function AppRouterFooter() {
  return (
    <footer className="mt-auto">
      <div className="container px-5 pt-12">
        <footer className="alignfull bg-tertiary-100 pt-8">
          <div className="container">
            {/* メイン情報セクション */}
            <div className="flex flex-col gap-4 py-8 md:flex-row md:gap-8 lg:items-center lg:justify-center">
              {/* イラスト画像 */}
              <div className="md:basis-1/2 lg:basis-2/5">
                <Image
                  src="/images/hanshin-branch/illust_main.png"
                  width={900}
                  height={637}
                  alt="ひきこもり支援のイラスト"
                  className="h-auto max-w-full"
                  priority={false}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAwIiBoZWlnaHQ9IjYzNyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
                />
              </div>

              {/* 組織情報 */}
              <div className="text-center text-primary md:basis-1/2 md:text-left lg:basis-2/5">
                <h2 className="text-lg font-bold">
                  兵庫ひきこもり相談支援センター
                  <br />
                  阪神ブランチ
                </h2>

                <p className="mt-0 text-xs text-gray-600">(運営：一般社団法人いきがいさがし)</p>

                {/* 連絡先情報 */}
                <address className="mt-3 not-italic">
                  <p>
                    電話番号：
                    <span className="font-bold">
                      <a
                        href="tel:050-3749-1227"
                        className="hover:text-primary-600 transition-colors"
                        aria-label="電話をかける: 050-3749-1227"
                      >
                        050-3749-1227
                      </a>
                    </span>
                  </p>

                  <p className="mt-1">開所日時：火・水・木・金 10:00〜16:00</p>

                  <p className="mt-1">
                    所在地：兵庫県西宮市名塩新町3-2
                    <br />
                    <span className="text-sm text-gray-600">(JR西宮名塩駅西に出てすぐ)</span>
                  </p>
                </address>

                {/* ソーシャルリンク（Client Component） */}
                <div className="mt-3">
                  <SocialLinks />
                </div>
              </div>
            </div>

            {/* ナビゲーションリンク */}
            <div className="alignfull bg-white py-4">
              <div className="container">
                <nav aria-label="フッターナビゲーション">
                  <ul className="flex flex-wrap justify-center gap-4 text-sm">
                    {footerLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="border-b border-dotted border-primary-200 text-primary hover:text-primary-600 transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* コピーライト */}
      <FooterBar />
    </footer>
  )
}

/**
 * フッターナビゲーションリンク
 */
const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/flow', label: '相談する' },
  { href: '/places-and-groups', label: '居場所・親の会' },
  { href: '/reference', label: '相談窓口' },
  { href: '/user-comments', label: 'ご利用者様の声' },
  { href: '/news', label: 'お知らせ' },
  { href: '/sitemap', label: 'サイトマップ' },
  { href: '/faq', label: 'よくある質問' },
  { href: '/privacy-policy', label: '個人情報保護方針' },
  { href: '/inquiry', label: 'お問合せ' },
] as const

/**
 * コピーライトバー
 * Server Component として実装
 */
function FooterBar() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="bg-primary py-4 text-primary-200">
      <div className="container">
        <p className="text-center text-sm">
          © {currentYear} 兵庫ひきこもり相談支援センター 阪神ブランチ
        </p>
      </div>
    </div>
  )
}
