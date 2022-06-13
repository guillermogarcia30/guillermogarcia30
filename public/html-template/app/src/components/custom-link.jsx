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
              className='font-medium relative ml-2 lg:ml-0 text-[#000000] dark:text-[#ffffff] duration-700 lg:before:animate-border-b lg:before:bottom-[-27px] before:absolute before:w-1 before:left-[-17px] lg:before:left-0 before:bg-dark-blue lg:before:bg-transparent lg:before:w-full before:h-full lg:before:border-b-2 lg:before:border-b-black lg:dark:before:border-b-darkmode-blue-01 '
              to={to}
              {...props}
            >
              {children}
            </Link>
          ): (
            <Link 
            className='ml-2 lg:ml-0 font-medium focus-visible:outline-none text-gray-light '
            to={to}
            {...props}
          >
            {children}
          </Link>
          )}
        
      </div>
    );
  }