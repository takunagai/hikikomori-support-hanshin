import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from 'next-themes' // for Dark mode
import type { AppProps } from 'next/app'
import '../styles/globals.css'

/**
 * App コンポーネント(全てのページを初期化)
 * @see https://nextjs.org/docs/pages/building-your-application/routing/custom-app
 */
export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
        <Component key={router.asPath} {...pageProps} />
      </ThemeProvider>
    </AnimatePresence>
  )
}
