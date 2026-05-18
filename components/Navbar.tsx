'use client'

import Link from 'next/link'
import DropdownMenu from './DropdownMenu'

interface NavbarProps {
  isMenuOpen: boolean
  onMenuOpenChange: (isOpen: boolean) => void
}

/**
 * App Router 対応 Navbar コンポーネント
 * - DropdownMenu コンポーネントを利用してリファクタリング
 * - ナビゲーション構造を単一のデータソースで管理
 */
export default function Navbar({ isMenuOpen, onMenuOpenChange }: NavbarProps) {
  // メニュー項目のクリック時にモバイルメニューを閉じる
  const handleMenuItemClick = () => {
    onMenuOpenChange(false)
  }

  return (
    <div
      className={`${isMenuOpen ? 'block w-full' : 'hidden lg:block lg:w-auto'} lg:order-3 lg:ml-auto`}
      role="navigation"
      aria-label="メインナビゲーション"
    >
      <div className="mt-5 flex flex-col gap-5 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
        {navigationStructure.map((item) => {
          if (item.type === 'link') {
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleMenuItemClick}
                className="font-medium text-gray-800 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 lg:text-sm dark:text-gray-200 dark:hover:text-primary-400"
              >
                {item.label}
              </Link>
            )
          }
          if (item.type === 'dropdown') {
            return (
              <DropdownMenu
                key={item.label}
                label={item.label}
                items={item.items}
                onMenuItemClick={handleMenuItemClick}
              />
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

/**
 * ナビゲーション全体の構造定義
 * type: 'link' または 'dropdown'
 */
const navigationStructure = [
  { type: 'link', href: '/', label: 'Home' },
  { type: 'link', href: '/flow', label: '相談する' },
  {
    type: 'dropdown',
    label: 'お役立ち情報',
    items: [
      { href: '/places-and-groups', label: '居場所一覧' },
      { href: '/reference', label: '相談・教育支援センター' },
    ],
  },
  {
    type: 'dropdown',
    label: '活動報告',
    items: [
      { href: '/news', label: '活動報告' },
      { href: '/user-comments', label: 'ご利用者様の声' },
    ],
  },
  { type: 'link', href: '/faq', label: 'よくある質問' },
  { type: 'link', href: '/inquiry', label: 'お問合せ' },
] as const
