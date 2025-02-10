import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import NavbarCollapseButton from "./NavbarCollapseButton"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <nav className="relative">
      {/* モバイルメニューボタン */}
      <div className="lg:hidden">
        <NavbarCollapseButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* メインナビゲーション */}
      <motion.div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block lg:grow lg:basis-full`}
        initial={false}
        animate={isOpen ? "open" : "closed"}
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
      >
        <div className="mx-4 mt-5 flex flex-col gap-5 lg:mx-10 lg:mt-0 lg:flex-row lg:items-center lg:justify-end lg:pl-5">
          <Link
            href="/"
            className="group relative font-medium text-primary-700 dark:text-gray-400"
            aria-current="page"
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
            aria-current="page"
          >
            <span className="relative z-10">相談する</span>
            <motion.span
              className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary-400 dark:bg-gray-500"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.2 }}
            />
          </Link>
          <div className="relative">
            <motion.button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex w-full items-center font-medium text-primary-700 dark:text-gray-400"
              whileHover={{ color: "var(--tw-text-primary-400)" }}
              whileTap={{ scale: 0.98 }}
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
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full z-10 mt-2 w-48 rounded-md bg-white p-2 shadow-lg dark:bg-gray-800 lg:right-0"
                >
                  <Link
                    href="/places-and-groups"
                    className="group flex items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-primary transition-colors hover:bg-tertiary-100 focus:ring-2 focus:ring-tertiary-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
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
          <Link
            href="/user-comments"
            className="group relative font-medium text-primary-700 dark:text-gray-400"
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
    </nav>
  )
}

export default Navbar
