import React from 'react'

import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

export const Toggle = () => {
    const handleChange = (e) => {
        e.target.checked? document.documentElement.classList.replace('light', 'dark') : document.documentElement.classList.replace('dark', 'light')
    }
  return (
    <>
        <label htmlFor="check" className='dark relative cursor-pointer bg-yellow dark:bg-darkmode-green-toggle w-20 h-6 rounded-full' >
            <input onChange={handleChange}  className='sr-only peer' type="checkbox" id="check" />
            <span className='w-8 h-8  bg-dark-blue absolute rounded-full -left-1 mx-[0] my-[auto] top-0 bottom-0 peer-checked:left-[55px] transition-all duration-500 ' ></span>
            <BsFillSunFill className='w-5 h-5 text-yellow absolute rounded-full left-[2px] mx-[0] my-[auto] top-0 bottom-0 peer-checked:left-[60px] peer-checked:text-transparent transition-all duration-500 ' />
            <BsFillMoonFill className='w-5 h-5 rotate-[242deg] text-transparent absolute rounded-full left-[2px] mx-[0] my-[auto] top-0 bottom-0 peer-checked:left-[60px] peer-checked:text-yellow transition-all duration-500 ' />
        </label>
    </>
  )
}
