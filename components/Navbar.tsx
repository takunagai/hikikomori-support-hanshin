import Link from "next/link"
import { useState } from "react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        id="navbar-collapse"
        className="mx-10 hidden grow basis-full text-sm lg:block"
      >
        <div className="mt-5 flex flex-col gap-5 lg:mt-0 lg:flex-row lg:items-center lg:justify-end lg:pl-5">
          <Link
            href="/"
            className="font-medium text-primary-700 hover:text-primary-400 dark:text-gray-400 dark:hover:text-gray-500"
            aria-current="page"
          >
            Home
          </Link>
          <Link
            href="/flow"
            className="font-medium text-primary-700 hover:text-primary-400 dark:text-gray-400 dark:hover:text-gray-500"
            aria-current="page"
          >
            相談する
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex w-full items-center font-medium text-primary-700 hover:text-primary-400 focus:text-primary-500 dark:text-gray-400 dark:hover:text-gray-500"
            >
              お役立ち情報
              <svg
                className={`ml-2 h-2.5 w-2.5 text-secondary-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
              </svg>
            </button>

            {isOpen && (
              <div
                className="absolute top-full z-10 mt-2 w-48 rounded-md bg-white p-2 shadow-md transition-all duration-200 dark:bg-gray-800"
              >
                <Link
                  href="/places-and-groups"
                  className="flex items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-primary hover:bg-tertiary-100 focus:ring-2 focus:ring-tertiary-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                >
                  居場所一覧
                </Link>
                <Link
                  href="/reference"
                  className="flex items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-primary hover:bg-tertiary-100 focus:ring-2 focus:ring-tertiary-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                >
                  相談・教育支援センター
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/user-comments"
            className="font-medium text-primary-700 hover:text-primary-400 dark:text-gray-400 dark:hover:text-gray-500"
          >
            ご利用者様の声
          </Link>
          <Link
            href="/faq"
            className="font-medium text-primary-700 hover:text-primary-400 dark:text-gray-400 dark:hover:text-gray-500"
          >
            よくある質問
          </Link>
          <Link
            href="/inquiry"
            className="font-medium text-primary-700 hover:text-primary-400 dark:text-gray-400 dark:hover:text-gray-500"
          >
            お問合せ
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
