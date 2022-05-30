import React from 'react'

import { AiOutlineCheck } from 'react-icons/ai'

export const Modal = ({view, hide}) => {
  return (
    <div style={view ?{display: 'flex'}:{display: 'none'}} className='px-[3.375rem] w-[26.825rem] h-[18.3125rem] rounded-[1.25rem] bg-white dark:bg-darkmode-black-02 z-50 absolute top-0 bottom-0 left-0 right-0 m-[auto]' >
        <div className='h-full w-full flex flex-col justify-center items-center' >
            <div className='flex items-center justify-center bg-green-light rounded-full w-[4.0625] h-[4.0625]' >
                <AiOutlineCheck className='text-green text-4xl ' />
            </div>
            <h4 className='font-bold text-center mt-4 text-[0.8125rem] dark:text-white' >Se ah guardado tu registro</h4>
            <p className='text-center text-[0.8125rem] dark:text-white my-9' >Si quiere modificar hay una tarjeta con icono de modificar o borrar el reistro</p>
            <button className='py-1 height-[2.25rem] w-[20.0625rem] bg-red text-white font-semibold' onClick={hide} >Regresar</button>
        </div>
    </div>
  )
}
