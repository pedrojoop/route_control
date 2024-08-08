import React from 'react';

export function Header() {
  return (
    <header className="fixed z-50 bg-slate-900 border-gray-200 dark:bg-gray-900 w-full">
      <div className="flex flex-wrap items-center max-w-6xl justify-between p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
      </div>
    </header>
  )
}