import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
  isMenuOpen: boolean
  onMenuOpenChange: (isOpen: boolean) => void
}

const Navbar = ({ isMenuOpen, onMenuOpenChange }: Props) => {
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

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // ESCキーでドロップダウンを閉じる
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isDropdownOpen) {
        setIsDropdownOpen(false)
        dropdownButtonRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isDropdownOpen])

  // ドロップダウンが開いた時に最初の項目にフォーカス
  useEffect(() => {
    if (isDropdownOpen) {
      firstDropdownItemRef.current?.focus()
    }
  }, [isDropdownOpen])

  return (
    <nav className="relative">
      {/* デスクトップメニュー */}
      <div className="hidden lg:block">
        <div className="mx-10 flex items-center justify-end gap-5 py-2" role="menubar">
          <Link
            href="/"
            className="group relative font-medium text-primary-700 dark:text-gray-400"
            aria-current="page"
            role="menuitem"
          >
            <span className="relative z-10">Home</span>
            <motion.span
              className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary-400 dark:bg-gray-500"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.2 }}
            />
          </Link>
          <Link
            href="/flow"
            className="group relative font-medium text-primary-700 dark:text-gray-400"
            role="menuitem"
          >
            <span className="relative z-10">相談する</span>
            <motion.span
              className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary-400 dark:bg-gray-500"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.2 }}
            />
          </Link>
          <div className="relative">
            <div className="hidden lg:block">
              <motion.button
                ref={dropdownButtonRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex w-full items-center font-medium text-primary-700 dark:text-gray-400"
                whileHover={{ color: "#846333" }}
                whileTap={{ scale: 0.98 }}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                role="menuitem"
              >
                <span className="relative z-10">お役立ち情報</span>
                <motion.svg
                  className="ml-2 h-2.5 w-2.5 text-secondary-400"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden="true"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </motion.svg>
              </motion.button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    ref={dropdownRef}
                    id="dropdown-menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 z-10 mt-2 w-48 rounded-md bg-white p-2 shadow-lg dark:bg-gray-800"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="dropdown-button"
                  >
                    <Link
                      ref={firstDropdownItemRef}
                      href="/places-and-groups"
                      className="group flex items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-primary transition-colors hover:bg-tertiary-100 focus:ring-2 focus:ring-tertiary-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      role="menuitem"
                      tabIndex={0}
                    >
                      <span className="relative">
                        居場所一覧
                        <motion.span
                          className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary-400 dark:bg-gray-500"
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.2 }}
                        />
                      </span>
                    </Link>
                    <Link
                      href="/reference"
                      className="group flex items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-primary transition-colors hover:bg-tertiary-100 focus:ring-2 focus:ring-tertiary-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      role="menuitem"
                      tabIndex={0}
                    >
                      <span className="relative">
                        相談・教育支援センター
                        <motion.span
                          className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary-400 dark:bg-gray-500"
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.2 }}
                        />
                      </span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="lg:hidden">
              <div className="font-medium text-primary-700 dark:text-gray-400">
                <span className="relative z-10">お役立ち情報</span>
              </div>
              <div className="mt-2 ml-4 flex flex-col gap-3" role="menu" aria-orientation="vertical">
                <Link
                  href="/places-and-groups"
                  className="group relative text-sm text-primary-600 transition-colors hover:text-primary-400 dark:text-gray-400 dark:hover:text-gray-300"
                  role="menuitem"
                >
                  <span className="relative z-10">
                    ├ 居場所一覧
                    <motion.span
                      className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary-400 dark:bg-gray-500"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.2 }}
                    />
                  </span>
                </Link>
                <Link
                  href="/reference"
                  className="group relative text-sm text-primary-600 transition-colors hover:text-primary-400 dark:text-gray-400 dark:hover:text-gray-300"
                  role="menuitem"
                >
                  <span className="relative z-10">
                    └ 相談・教育支援センター
                    <motion.span
                      className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary-400 dark:bg-gray-500"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.2 }}
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <Link
            href="/user-comments"
            className="group relative font-medium text-primary-700 dark:text-gray-400"
            role="menuitem"
          >
            <span className="relative z-10">ご利用者様の声</span>
            <motion.span
              className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary-400 dark:bg-gray-500"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.2 }}
            />
          </Link>
          <Link
            href="/faq"
            className="group relative font-medium text-primary-700 dark:text-gray-400"
            role="menuitem"
          >
            <span className="relative z-10">よくある質問</span>
            <motion.span
              className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary-400 dark:bg-gray-500"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.2 }}
            />
          </Link>
          <Link
            href="/inquiry"
            className="group relative font-medium text-primary-700 dark:text-gray-400"
            role="menuitem"
          >
            <span className="relative z-10">お問合せ</span>
            <motion.span
              className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary-400 dark:bg-gray-500"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.2 }}
            />
          </Link>
        </div>
      </div>

      {/* モバイルメニュー */}
      <div className={`${isMenuOpen ? "block" : "hidden"} lg:hidden`}>
        <motion.div
          initial={false}
          animate={isMenuOpen ? "open" : "closed"}
          variants={{
            open: {
              opacity: 1,
              height: "auto",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
            },
            closed: {
              opacity: 0,
              height: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
            },
          }}
          className="overflow-hidden"
          role="menu"
          aria-orientation="vertical"
          aria-label="メインメニュー"
        >
          <div className="mx-4 mt-5 flex flex-col gap-5">
            <Link
              href="/"
              className="group relative font-medium text-primary-700 dark:text-gray-400"
              aria-current="page"
              role="menuitem"
            >
              <span className="relative z-10">Home</span>
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary-400 dark:bg-gray-500"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.2 }}
              />
            </Link>
            <Link
              href="/flow"
              className="group relative font-medium text-primary-700 dark:text-gray-400"
              role="menuitem"
            >
              <span className="relative z-10">相談する</span>
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary-400 dark:bg-gray-500"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.2 }}
              />
            </Link>
            <div className="relative">
              <div className="font-medium text-primary-700 dark:text-gray-400">
                <span className="relative z-10">お役立ち情報</span>
              </div>
              <div className="mt-2 ml-4 flex flex-col gap-3" role="menu" aria-orientation="vertical">
                <Link
                  href="/places-and-groups"
                  className="group relative text-sm text-primary-600 transition-colors hover:text-primary-400 dark:text-gray-400 dark:hover:text-gray-300"
                  role="menuitem"
                >
                  <span className="relative z-10">
                    ├ 居場所一覧
                    <motion.span
                      className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary-400 dark:bg-gray-500"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.2 }}
                    />
                  </span>
                </Link>
                <Link
                  href="/reference"
                  className="group relative text-sm text-primary-600 transition-colors hover:text-primary-400 dark:text-gray-400 dark:hover:text-gray-300"
                  role="menuitem"
                >
                  <span className="relative z-10">
                    └ 相談・教育支援センター
                    <motion.span
                      className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary-400 dark:bg-gray-500"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.2 }}
                    />
                  </span>
                </Link>
              </div>
            </div>
            <Link
              href="/user-comments"
              className="group relative font-medium text-primary-700 dark:text-gray-400"
              role="menuitem"
            >
              <span className="relative z-10">ご利用者様の声</span>
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary-400 dark:bg-gray-500"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.2 }}
              />
            </Link>
            <Link
              href="/faq"
              className="group relative font-medium text-primary-700 dark:text-gray-400"
              role="menuitem"
            >
              <span className="relative z-10">よくある質問</span>
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary-400 dark:bg-gray-500"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.2 }}
              />
            </Link>
            <Link
              href="/inquiry"
              className="group relative font-medium text-primary-700 dark:text-gray-400"
              role="menuitem"
            >
              <span className="relative z-10">お問合せ</span>
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary-400 dark:bg-gray-500"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </nav>
  )
}

export default Navbar
