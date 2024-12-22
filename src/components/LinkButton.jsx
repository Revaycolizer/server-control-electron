// import React from 'react'

const LinkButton = ({ to, children }) => {
  return (
    <a
      href={to}
      className="inline-flex items-center px-4 py-2 bg-customGreenDark  border border-transparent rounded-md font-semibold text-xs text-white dark:text-neutral-800 uppercase tracking-widest hover:bg-neutral-700 dark:hover:bg-white focus:bg-neutral-700 dark:focus:bg-white active:bg-neutral-900 dark:active:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 transition ease-in-out duration-150"
    >
      {children}
    </a>
  );
};

export default LinkButton;
