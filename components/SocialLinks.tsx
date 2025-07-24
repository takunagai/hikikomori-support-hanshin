'use client'

import Link from 'next/link'
import { FaInstagram, FaXTwitter } from 'react-icons/fa6'

/**
 * ソーシャルリンク Client Component
 * React Icons を使用するため Client Component として分離
 */
export function SocialLinks() {
  const socialLinks = [
    {
      href: 'https://www.instagram.com/hanshin_branchi/',
      label: 'Instagram',
      icon: FaInstagram,
      ariaLabel: 'Instagramで「兵庫ひきこもり相談支援センター阪神ブランチ」をフォロー',
    },
    {
      href: 'https://x.com/ikigaisagashi1',
      label: 'X（旧Twitter）',
      icon: FaXTwitter,
      ariaLabel: 'X（旧Twitter）で「兵庫ひきこもり相談支援センター阪神ブランチ」をフォロー',
    },
  ]

  return (
    <ul className="flex justify-center gap-2 lg:justify-start list-none">
      {socialLinks.map((social) => {
        const IconComponent = social.icon
        
        return (
          <li key={social.href}>
            <Link
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-900 transition-colors duration-200 hover:bg-primary-100 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-white dark:hover:bg-primary-900 dark:hover:text-primary-400"
              aria-label={social.ariaLabel}
            >
              <span className="sr-only">{social.label}</span>
              <IconComponent className="h-4 w-4" aria-hidden="true" />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}