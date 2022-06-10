import React, { useState } from 'react'



export const ToggleHelper = ({i, check = false, left = 'left-[3px]', checkedLeft = 'peer-checked:left-[26px]'}) => {

  const [ checked, setChecked ] = useState(check )

  return (
    <>
          <label htmlFor={`check${i}`} className={ checked ? 'relative cursor-pointer bg-darkmode-green-toggle w-12 h-6 rounded-full' : 'relative cursor-pointer bg-gray-light w-12 h-6 rounded-full' } >
              <input onChange={() => setChecked( !checked )} className='sr-only peer' defaultChecked={check} type="checkbox" id={`check${i}`} />
              <span className={`w-5 h-5  bg-white absolute rounded-full ${left} mx-[0] my-[auto] top-0 bottom-0 ${checkedLeft} transition-all duration-500 `} ></span>
          </label>
        

    </>
  )
}
