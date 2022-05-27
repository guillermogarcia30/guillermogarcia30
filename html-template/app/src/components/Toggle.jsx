import React from 'react'

import { BsFillSunFill } from 'react-icons/bs'

export const Toggle = () => {
    const handleChange = (e) => {
        e.target.checked? document.documentElement.classList.replace('light', 'dark') : document.documentElement.classList.replace('dark', 'light')
    }
  return (
    <>
        <label htmlFor="check" className='dark relative cursor-pointer bg-white border dark:bg-black dark:border-white border-solid w-12 h-6 rounded-full' >
            <input onChange={handleChange}  className='sr-only peer' type="checkbox" id="check" />
            <span className='w-2/5 h-4/5 bg-black absolute rounded-full left-1 mx-[0] my-[auto] top-0 bottom-0 peer-checked:bg-white peer-checked:left-[25px] transition-all duration-500 ' ></span>
        </label>
    </>
  )
}
