// import React from 'react'

const SecondaryButton = ({ children }) => {
  return (
    <button className="inline-flex items-center px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-500 rounded-md font-semibold text-xs text-neutral-700 dark:text-neutral-300 uppercase tracking-widest shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 focus:outline-none  dark:focus:ring-offset-neutral-800 disabled:opacity-25 transition ease-in-out duration-150">
      {children}
    </button>
  );
};

export default SecondaryButton;
