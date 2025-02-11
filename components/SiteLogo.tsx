import Link from 'next/link'

type Props = {
  home?: boolean
  siteTitle: string
}

const SiteLogo = ({ home, siteTitle }: Props) => {
  const commonClasses = 'site-title flex-none text-xl font-bold text-primary dark:text-white'

  return (
    <>
      {home ? (
        <h1 className={commonClasses} aria-label="Brand">
          {siteTitle}
        </h1>
      ) : (
        <p className={commonClasses} aria-label="Brand">
          <Link href="/">{siteTitle}</Link>
        </p>
      )}
    </>
  )
}

export default SiteLogo
