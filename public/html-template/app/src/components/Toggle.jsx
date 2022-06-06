import React from 'react'

import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

export const Toggle = () => {

    const theme = localStorage.getItem('theme')
    const handleChange = (e) => {
       if(e.target.checked) {
            document.documentElement.classList.replace('light', 'dark') 
            localStorage.setItem( 'theme','dark')  
       } else {
         document.documentElement.classList.replace('dark', 'light')
         localStorage.setItem( 'theme','light')
       }
    }

  return (
    <>
        { theme && theme==='dark' ?(
          <label htmlFor="check" className='dark relative cursor-pointer bg-yellow dark:bg-darkmode-green-toggle w-12 h-[1.2rem] rounded-full' >
              <input defaultChecked={true} onChange={handleChange}  className='sr-only peer' type="checkbox" id="check" />
              <span className='w-[1.6rem] h-[1.6rem]  bg-dark-blue absolute rounded-full -left-1 mx-[0] my-[auto] top-0 bottom-0 peer-checked:left-[30px] transition-all duration-500 ' ></span>
              <BsFillSunFill className='w-4 h-4 text-yellow absolute rounded-full left-[1px] mx-[0] my-[auto] top-0 bottom-0 peer-checked:left-[35px] peer-checked:text-transparent transition-all duration-500 ' />
              <BsFillMoonFill className='w-4 h-4 rotate-[242deg] text-transparent absolute rounded-full left-[2px] mx-[0] my-[auto] top-0 bottom-0 peer-checked:left-[35px] peer-checked:text-yellow transition-all duration-500 ' />
          </label>
        ): (
          <label htmlFor="check" className='dark relative cursor-pointer bg-yellow dark:bg-darkmode-green-toggle w-12 h-[1.2rem] rounded-full' >
              <input defaultChecked={false} onChange={handleChange}  className='sr-only peer' type="checkbox" id="check" />
              <span className='w-[1.6rem] h-[1.6rem]  bg-dark-blue absolute rounded-full -left-1 mx-[0] my-[auto] top-0 bottom-0 peer-checked:left-[30px] transition-all duration-500 ' ></span>
              <BsFillSunFill className='w-4 h-4 text-yellow absolute rounded-full left-[1px] mx-[0] my-[auto] top-0 bottom-0 peer-checked:left-[35px] peer-checked:text-transparent transition-all duration-500 ' />
              <BsFillMoonFill className='w-4 h-4 rotate-[242deg] text-transparent absolute rounded-full left-[2px] mx-[0] my-[auto] top-0 bottom-0 peer-checked:left-[35px] peer-checked:text-yellow transition-all duration-500 ' />
          </label>
        ) }
    </>
  )
}
