import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
  title: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

const Accordion = ({ title, children, defaultOpen = false }: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="-mt-px border bg-white first:rounded-t-lg last:rounded-b-lg dark:border-gray-700 dark:bg-gray-800">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex w-full items-center gap-x-3 py-4 px-5 text-left font-bold text-primary transition-colors hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700/50"
        aria-expanded={isOpen}
        whileTap={{ scale: 0.98 }}
      >
        <motion.svg
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="h-3 w-3 text-gray-600 dark:text-gray-400"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 8.85999L14.5 8.85998"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M8 15.36L8 2.35999"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ transformOrigin: "center" }}
          />
        </motion.svg>
        {title}
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.2, ease: "easeInOut" },
              opacity: { duration: 0.1, ease: "linear" },
            }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Accordion
