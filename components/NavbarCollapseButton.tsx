import { motion } from 'framer-motion'

type Props = {
  isOpen: boolean
  onClick: () => void
}

const NavbarCollapseButton = ({ isOpen, onClick }: Props) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded p-2 align-middle text-primary transition-colors hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:ring-offset-2 focus:ring-offset-white dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
      aria-controls="navbar-collapse"
      aria-label="Toggle navigation"
      aria-expanded={isOpen}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative h-5 w-5">
        <motion.span
          className="absolute top-2 block h-0.5 w-5 bg-current"
          variants={{
            open: {
              rotate: 45,
              y: 0,
            },
            closed: {
              rotate: 0,
              y: 0,
            },
          }}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="absolute top-2 block h-0.5 w-5 bg-current"
          variants={{
            open: {
              rotate: -45,
              y: 0,
            },
            closed: {
              rotate: 0,
              y: -8,
            },
          }}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="absolute top-2 block h-0.5 w-5 bg-current"
          variants={{
            open: {
              rotate: -45,
              y: 0,
              opacity: 0,
            },
            closed: {
              rotate: 0,
              y: 8,
              opacity: 1,
            },
          }}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.button>
  )
}

export default NavbarCollapseButton
