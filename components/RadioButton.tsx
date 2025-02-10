import { motion } from "framer-motion"
import type { ComponentPropsWithoutRef } from "react"

type Props = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  label: string
}

const RadioButton = ({ label, className = "", ...props }: Props) => {
  return (
    <label className="group relative inline-flex cursor-pointer items-center">
      <input type="radio" className="peer sr-only" {...props} />
      <motion.div
        className="relative flex items-center justify-center rounded-md border-2 border-primary-200 bg-white px-3 py-1.5 text-sm text-primary-700 transition-colors hover:bg-primary-50 peer-checked:border-primary-500 peer-checked:bg-primary-500 peer-checked:text-white peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2 dark:border-primary-700 dark:bg-gray-800 dark:text-primary-300 dark:hover:bg-primary-900/20 dark:peer-checked:border-primary-500 dark:peer-checked:bg-primary-500 dark:peer-checked:text-white"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {label}
      </motion.div>
    </label>
  )
}

export default RadioButton
