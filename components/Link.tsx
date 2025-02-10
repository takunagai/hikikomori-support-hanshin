import NextLink from "next/link"
import { motion } from "framer-motion"
import type { ComponentPropsWithoutRef, ReactNode } from "react"

type Props = ComponentPropsWithoutRef<typeof NextLink> & {
  children: ReactNode
  variant?: "default" | "primary" | "secondary"
  showArrow?: boolean
  external?: boolean
}

const Link = ({
  children,
  variant = "default",
  showArrow = false,
  external = false,
  className = "",
  ...props
}: Props) => {
  const baseStyles = "relative inline-flex items-center gap-1 font-medium"
  const variantStyles = {
    default: "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200",
    primary: "text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300",
    secondary: "text-secondary-600 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300",
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`

  const content = (
    <>
      <span className="relative">
        {children}
        <motion.span
          className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-current"
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.2 }}
        />
      </span>
      {showArrow && (
        <motion.svg
          className="h-4 w-4"
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </motion.svg>
      )}
    </>
  )

  if (external) {
    return (
      <a
        className={combinedClassName}
        target="_blank"
        rel="noopener noreferrer"
        {...(props as ComponentPropsWithoutRef<"a">)}
      >
        {content}
      </a>
    )
  }

  return (
    <NextLink className={combinedClassName} {...props}>
      {content}
    </NextLink>
  )
}

export default Link
