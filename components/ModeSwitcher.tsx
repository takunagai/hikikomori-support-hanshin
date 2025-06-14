type Props = {
  theme?: string
  setTheme: (theme: string) => void
}

const ModeSwitcher = ({ theme, setTheme }: Props) => {
  return (
    <>
      {/*
      <div className="flex items-center">
        <input
          type="checkbox"
          id="hs-basic-with-description-checked"
          className="relative h-7 w-[3.25rem] shrink-0 cursor-pointer appearance-none rounded-full border-2 border border-transparent border-transparent bg-gray-100 ring-1 ring-transparent ring-offset-white transition-colors duration-200 ease-in-out before:inline-block before:h-6 before:w-6 before:translate-x-0 before:transform before:rounded-full before:bg-white before:shadow before:ring-0 before:transition before:duration-200 before:ease-in-out checked:bg-blue-600 checked:bg-none checked:before:translate-x-full checked:before:bg-blue-200 focus:border-blue-600 focus:outline-none focus:ring-blue-600 dark:bg-gray-700 dark:before:bg-gray-400 dark:checked:bg-blue-600 dark:checked:before:bg-blue-200 dark:focus:ring-offset-gray-800"
        />
        <label
          htmlFor="hs-basic-with-description-checked"
          className="ml-3 text-xs text-gray-500 dark:text-gray-400"
        >
          Dark
          <br />
          Mode
        </label>
      </div>
      */}

      <div className="dark-mode-toggle-switcher text-center text-[10px]">
        <a
          className="hs-dark-mode group inline-block items-center text-gray-600 hover:text-blue-600 hs-dark-mode-active:hidden dark:text-gray-400 dark:hover:text-gray-500"
          href={'#!'}
          onClick={() => setTheme('dark')}
          data-hs-theme-click-value="dark"
        >
          <svg
            className="mr-1 inline-block h-3 w-3 md:h-4 md:w-4"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
          </svg>
          <br />
          Dark
        </a>
        <a
          className="hs-dark-mode group hidden items-center text-gray-600 hover:text-blue-600 hs-dark-mode-active:inline-block dark:text-gray-400 dark:hover:text-gray-500"
          href={'#!'}
          onClick={() => setTheme('light')}
          data-hs-theme-click-value="light"
        >
          <svg
            className="mr-1 inline-block h-3 w-3 md:h-4 md:w-4"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
          </svg>
          <br />
          Light
        </a>
      </div>
    </>
  )
}

export default ModeSwitcher
