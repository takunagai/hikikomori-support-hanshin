import { useState } from "react"
import SiteLogo from "./SiteLogo"
import NavbarCollapseButton from "./NavbarCollapseButton"
import Navbar from "./Navbar"
// import ModeSwitcher from "./ModeSwitcher"

type Props = {
  home?: boolean
  siteTitle: string
  pageTitle: string
  theme?: string
  setTheme: (theme: string) => void
}

const Header = ({ home, siteTitle, theme, setTheme }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative z-50 border-t-4 border-primary bg-tertiary-200 py-2 dark:bg-zinc-800">
      <nav
        className="mx-auto flex w-full max-w-[85rem] flex-wrap items-center justify-between px-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex w-full items-center justify-between lg:w-auto">
          <SiteLogo home={home} siteTitle={siteTitle} />
          <div className="flex items-center gap-4 lg:hidden">
            {/*<ModeSwitcher theme={theme} setTheme={setTheme} />*/}
            <NavbarCollapseButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>
        <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} />
        {/*<div className="hidden lg:block">*/}
        {/*  <ModeSwitcher theme={theme} setTheme={setTheme} />*/}
        {/*</div>*/}
      </nav>
    </header>
  )
}

export default Header
