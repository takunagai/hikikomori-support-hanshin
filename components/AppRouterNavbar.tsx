'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface AppRouterNavbarProps {
  isMenuOpen: boolean
  onMenuOpenChange: (isOpen: boolean) => void
}

/**
 * App Router 対応 Navbar コンポーネント
 * - Client Component として実装
 * - アクセシビリティ機能完全対応
 * - Framer Motion アニメーション
 */
export default function AppRouterNavbar({ isMenuOpen, onMenuOpenChange }: AppRouterNavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownButtonRef = useRef<HTMLButtonElement>(null)
  const firstDropdownItemRef = useRef<HTMLAnchorElement>(null)

  // ドロップダウンメニューの外側をクリックした時に閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !dropdownButtonRef.current?.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  // ESCキーでドロップダウンを閉じる
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false)
        dropdownButtonRef.current?.focus()
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isDropdownOpen])

  // ドロップダウンが開いた時に最初の項目にフォーカス
  useEffect(() => {
    if (isDropdownOpen && firstDropdownItemRef.current) {
      // 少し遅延させてフォーカスを当てる（アニメーション完了後）
      setTimeout(() => {
        firstDropdownItemRef.current?.focus()
      }, 150)
    }
  }, [isDropdownOpen])

  // メニュー項目のクリック時にモバイルメニューを閉じる
  const handleMenuItemClick = () => {
    onMenuOpenChange(false)
    setIsDropdownOpen(false)
  }

  return (
    <div
      className={`${
        isMenuOpen
          ? 'block w-full'
          : 'hidden lg:block lg:w-auto'
      } lg:order-3 lg:ml-auto`}
      role="navigation"
      aria-label="メインナビゲーション"
    >
      <div className="mt-5 flex flex-col gap-5 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
        {/* 基本ナビゲーション項目 */}
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={handleMenuItemClick}
            className="font-medium text-gray-800 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 lg:text-sm dark:text-gray-200 dark:hover:text-primary-400"
          >
            {item.label}
          </Link>
        ))}

        {/* 情報ドロップダウンメニュー */}
        <div className="relative" ref={dropdownRef}>
          <button
            ref={dropdownButtonRef}
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center font-medium text-gray-800 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 lg:text-sm dark:text-gray-200 dark:hover:text-primary-400"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            情報
            <svg
              className={`ml-1 h-3 w-3 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* ドロップダウンメニュー */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                id="dropdown-menu"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md border bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:left-0 lg:right-auto lg:origin-top-left dark:border-gray-700 dark:bg-gray-800"
                role="menu"
                aria-orientation="vertical"
              >
                {dropdownItems.map((item, index) => (
                  <Link
                    key={item.href}
                    ref={index === 0 ? firstDropdownItemRef : null}
                    href={item.href}
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary-400"
                    role="menuitem"
                    tabIndex={isDropdownOpen ? 0 : -1}
                  >
                    {item.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* お問い合わせボタン */}
        <Link
          href="/inquiry"
          onClick={handleMenuItemClick}
          className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 lg:px-3 lg:py-2"
        >
          お問い合わせ
        </Link>
      </div>
    </div>
  )
}

/**
 * メインナビゲーション項目
 */
const navigationItems = [
  { href: '/flow', label: '相談する' },
  { href: '/places-and-groups', label: '居場所・親の会' },
  { href: '/user-comments', label: 'ご利用者様の声' },
  { href: '/news', label: 'お知らせ' },
] as const

/**
 * ドロップダウンメニュー項目
 */
const dropdownItems = [
  { href: '/reference', label: '相談窓口' },
  { href: '/faq', label: 'よくある質問' },
  { href: '/sitemap', label: 'サイトマップ' },
  { href: '/privacy-policy', label: 'プライバシーポリシー' },
] as const