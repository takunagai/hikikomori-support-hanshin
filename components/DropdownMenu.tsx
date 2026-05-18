'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface DropdownItem {
  href: string
  label: string
}

interface DropdownMenuProps {
  label: string
  items: readonly DropdownItem[]
  onMenuItemClick: () => void
}

export default function DropdownMenu({ label, items, onMenuItemClick }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const firstItemRef = useRef<HTMLAnchorElement>(null)

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // ESC key to close
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // Focus first item on open
  useEffect(() => {
    if (isOpen && firstItemRef.current) {
      setTimeout(() => {
        firstItemRef.current?.focus()
      }, 150)
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
    onMenuItemClick()
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center font-medium text-gray-800 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 lg:w-auto lg:text-sm dark:text-gray-200 dark:hover:text-primary-400"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg
          className={`ml-1 h-3 w-3 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="mt-2 w-full rounded-md bg-gray-50 py-1 pl-4 lg:absolute lg:left-0 lg:right-auto lg:mt-2 lg:w-48 lg:origin-top-left lg:border lg:bg-white lg:pl-0 lg:shadow-lg lg:ring-1 lg:ring-black lg:ring-opacity-5 dark:bg-gray-800/50 lg:dark:border-gray-700 lg:dark:bg-gray-800"
            role="menu"
            aria-orientation="vertical"
          >
            {items.map((item, index) => (
              <Link
                key={item.href}
                ref={index === 0 ? firstItemRef : null}
                href={item.href}
                onClick={handleLinkClick}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary-400"
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
