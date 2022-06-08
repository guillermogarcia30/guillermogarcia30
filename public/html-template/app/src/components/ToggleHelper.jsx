import React from 'react'



export const ToggleHelper = ({i, check = true}) => {



  return (
    <>
          <label htmlFor={`check${i}`} className='dark relative cursor-pointer bg-darkmode-green-toggle w-12 h-6 rounded-full' >
              <input className='sr-only peer' defaultChecked={check} type="checkbox" id={`check${i}`} />
              <span className='w-5 h-5  bg-white absolute rounded-full left-[3px] mx-[0] my-[auto] top-0 bottom-0 peer-checked:left-[26px] transition-all duration-500 ' ></span>
          </label>
        

    </>
  )
}
