import React from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom"


export const CustomLink = ({ children, to, ...props }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  // 
    return (
      <div>
          {match ? (
              <Link 
              className='font-medium relative text-black dark:text-white duration-700 before:animate-border-b before:-bottom-4 before:absolute before:w-full before:h-full before:border-b-2 before:border-b-black dark:before:border-b-darkmode-blue-01 '
              to={to}
              {...props}
            >
              {children}
            </Link>
          ): (
            <Link 
            className='font-medium focus-visible:outline-none text-gray-light '
            to={to}
            {...props}
          >
            {children}
          </Link>
          )}
        
      </div>
    );
  }