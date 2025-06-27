import type { Metadata, Viewport } from 'next'
import { Yomogi } from 'next/font/google'

// import Footer from '../components/Footer'
// import Header from '../components/Header'
import { ThemeProvider } from '../components/providers/ThemeProvider'

import '../styles/globals.css'

// Google Fontsの設定（Pages Routerから移行）
const yomogi = Yomogi({
  variable: '--yomogi-font',
  weight: '400',
  subsets: ['latin'],
  fallback: ['cursive', 'system-ui', '-apple-system', 'sans-serif'],
  display: 'swap', // フォント読み込み最適化
})

// サイトの基本情報
const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || '兵庫ひきこもり相談支援センター 阪神ブランチ'
const siteDescription = 'ひきこもりでお悩みの方やそのご家族の相談窓口です。兵庫県阪神地域（尼崎市、西宮市、芦屋市、伊丹市、宝塚市、川西市、三田市、川辺郡猪名川町）で無料の相談支援を行っています。'
const siteUrl = 'https://hanshin-branch.org'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s | ${siteTitle}`,
    default: siteTitle,
  },
  description: siteDescription,
  keywords: [
    'ひきこもり',
    '相談',
    '支援',
    '兵庫県',
    '阪神',
    '無料',
    '家族会',
    '尼崎市',
    '西宮市',
    '芦屋市',
    '伊丹市',
    '宝塚市',
    '川西市',
    '三田市',
    '猪名川町',
  ],
  authors: [{ name: siteTitle }],
  creator: siteTitle,
  publisher: siteTitle,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: siteUrl,
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: siteTitle,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ikigaisagashi1',
    creator: '@ikigaisagashi1',
    title: siteTitle,
    description: siteDescription,
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
  },
  category: '相談支援',
  classification: '公共サービス',
  alternates: {
    canonical: siteUrl,
  },
  other: {
    // 構造化データの基本設定
    'application-name': siteTitle,
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': siteTitle,
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

/**
 * App Router ルートレイアウト
 * 全ページに共通するHTML構造とプロバイダーを定義
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="ja" 
      className={`${yomogi.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body 
        className="flex h-full flex-col leading-relaxed antialiased bg-white text-gray-900"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="flex h-full w-full flex-col">
            {/* Header - Phase 1では一時的にコメントアウト */}
            {/* <Header /> */}
            <div className="cover__main container flex-1">
              <main 
                id="primary" 
                role="main"
                aria-label="メインコンテンツ"
                className="min-h-[60vh] px-4 py-8"
              >
                {children}
              </main>
            </div>
            {/* Footer - Phase 1では一時的にコメントアウト */}
            {/* <Footer /> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
