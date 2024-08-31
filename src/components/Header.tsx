import React, { useEffect, useState } from 'react'

export function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')

    if (currentTheme) setDarkMode(currentTheme === 'dark')
    else setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <header className=" z-50 bg-header border-gray-200 dark:bg-gray-900 w-full">
      <div className="flex flex-wrap items-center justify-between p-4">
        <span className="self-center text-primary text-2xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
        <label className="inline-flex items-center cursor-pointer">
          <input onChange={() => setDarkMode(!darkMode)} type="checkbox" value="" className="sr-only peer"/>
          <div className="peer-checked:bg-slate-700 relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
        </label>
      </div>
    </header>
  )
}