'use client'

import { useState } from 'react'
import Navbar from './Navbar'
import NavbarCollapseButton from './NavbarCollapseButton'
import SiteLogo from './SiteLogo'

interface HeaderProps {
  home?: boolean
}

/**
 * Header コンポーネント
 * ダークモード切替は実装保留中（コメントアウトされたボタンを将来的に有効化）
 */
export default function Header({ home = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // サイトタイトルは環境変数から取得
  const siteTitle =
    process.env.NEXT_PUBLIC_SITE_TITLE || '兵庫ひきこもり相談支援センター 阪神ブランチ'

  return (
    <header className="relative z-50 border-t-4 border-primary bg-tertiary-200 py-2 dark:bg-zinc-800">
      <nav
        className="mx-auto flex w-full max-w-[85rem] flex-wrap items-center justify-between px-4 lg:px-8"
        aria-label="グローバルナビゲーション"
      >
        {/* ロゴとモバイルメニュー制御 */}
        <div className="flex w-full items-center justify-between lg:w-auto">
          <SiteLogo home={home} siteTitle={siteTitle} />

          {/* モバイル向けコントロール */}
          <div className="flex items-center gap-4 lg:hidden">
            {/* ダークモード切り替え（将来的に有効化） */}
            {/* <ModeSwitcher theme={theme} setTheme={setTheme} /> */}

            <NavbarCollapseButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>

        {/* メインナビゲーション */}
        <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} />

        {/* デスクトップ向けダークモード切り替え（将来的に有効化） */}
        {/* 
        <div className="hidden lg:block">
          <ModeSwitcher theme={theme} setTheme={setTheme} />
        </div>
        */}
      </nav>
    </header>
  )
}
