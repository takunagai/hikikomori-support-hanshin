'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

/**
 * App Router対応のThemeProvider
 * ダークモード機能を提供するが、現在はライトモード固定
 */
export const ThemeProvider: FC<Props> = ({ children }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light" // 現在はライトモード固定（将来的に削除予定）
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  )
}