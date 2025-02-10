import { motion } from "framer-motion"

type Props = {
  isOpen: boolean
  onClick: () => void
}

const NavbarCollapseButton = ({ isOpen, onClick }: Props) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded bg-white p-2 align-middle text-primary shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
      aria-controls="navbar-collapse"
      aria-label="Toggle navigation"
      aria-expanded={isOpen}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: {
            rotate: 45,
            y: 2,
          },
          closed: {
            rotate: 0,
            y: 0,
          },
        }}
        transition={{ duration: 0.2 }}
        className="relative h-5 w-5"
      >
        <motion.span
          className="absolute block h-0.5 w-5 bg-current"
          variants={{
            open: { opacity: 1 },
            closed: { opacity: 1 },
          }}
        />
        <motion.span
          className="absolute top-2 block h-0.5 w-5 bg-current"
          variants={{
            open: { opacity: 0 },
            closed: { opacity: 1 },
          }}
        />
        <motion.span
          className="absolute top-4 block h-0.5 w-5 bg-current"
          variants={{
            open: {
              rotate: 90,
              y: -8,
            },
            closed: {
              rotate: 0,
              y: 0,
            },
          }}
        />
      </motion.div>
    </motion.button>
  )
}

export default NavbarCollapseButton
