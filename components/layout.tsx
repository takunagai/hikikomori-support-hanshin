import { useTheme } from 'next-themes'
import Head from 'next/head'
import type React from 'react'
import { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'

import { Yomogi } from 'next/font/google'
const yomogi = Yomogi({
  variable: '--yomogi-font',
  weight: '400', // バリアブルフォントでないので必要
  subsets: ['latin'],
  fallback: ['cursive', 'system-ui', '-apple-system', 'sans-serif'],
})

// import styles from './layout.module.css'
// import utilStyles from '../styles/utils.module.css'

type Props = {
  children: React.ReactNode // React 18 以降で、children を props として受け取るのに必要になった
  title?: string
  description?: string
  home?: boolean
}

export const siteTitle =
  process.env.NEXT_PUBLIC_SITE_TITLE || '.env NEXT_PUBLIC_SITE_TITLE で設定してください'

export default function Layout({ children, title, description, home }: Props) {
  const pageTitle = title || 'タイトル未設定'

  // Dark mode
  const [mounted, setMounted] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <>
      <Head>
        {home ? (
          <title>{pageTitle}</title>
        ) : (
          <title>
            {pageTitle} - {siteTitle}
          </title>
        )}
        <meta name="description" content={description || 'ページ概要未設定'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ikigaisagashi1" />
        <meta
          name="twitter:image"
          content="https://pbs.twimg.com/profile_images/1592493354264428545/4RhzK19v_400x400.jpg"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://hanshin-branch.org" />
        <meta
          property="og:image"
          content="https://pbs.twimg.com/profile_images/1592493354264428545/4RhzK19v_400x400.jpg"
        />

        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <div className={`${yomogi.variable} flex h-full w-full flex-col`}>
        {/*<TopmostNotificationBar />*/}
        <Header
          home={home}
          siteTitle={siteTitle}
          pageTitle={pageTitle}
          theme={theme}
          setTheme={setTheme}
        />
        {/*<div className="w-full border-b border-zinc-500/25 py-2 px-4 sm:px-6 lg:px-8">*/}
        {/*  <BreadCrumbs pageTitle={pageTitle} />*/}
        {/*</div>*/}
        <div className="cover__main container">
          <main id="primary">{children}</main>
        </div>

        <Footer />
      </div>
    </>
  )
}
