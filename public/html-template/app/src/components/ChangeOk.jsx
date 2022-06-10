import React from 'react'

import { AiOutlineCheck } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

import { setChangeOk } from '../store/modals/modalEditSlice'

export const ChangeOk = () => {
  const view = useSelector( state => state.modal.changeOk )
  const dispatch = useDispatch()
  return (
    <div style={view ?{display: 'flex'}:{display: 'none'}} className='bg-black-transparent w-[100vw] z-[100] h-[100vh] fixed top-0 bottom-0 left-0 right-0 m-[auto]' >
      <div className='px-[3.375rem] w-[26.825rem] h-[25rem] rounded-[1.25rem] bg-[#ffffff] dark:bg-darkmode-black-02 z-50 absolute top-0 bottom-0 left-0 right-0 m-[auto]' >
          <div className='h-full w-full flex flex-col justify-center items-center' >
              <div className='flex items-center justify-center bg-green-light rounded-full w-12 h-12' >
                  <AiOutlineCheck className='text-green text-[25px] ' />
              </div>
              <h4 className='text-[18px] leading-6 font-medium text-center mt-[20px] dark:text-[#ffffff]' >Los cambios de su cuenta han sido modificados</h4>
              <p className='text-center text-[17px] dark:text-[#ffffff] my-9' >Si quieres modificar los datos de tu cuenta puedes modificarlos en tu perfil en el boton editar</p>
              <button className='px-4 py-2 rounded-md height-[2.25rem] w-[20.0625rem] bg-red text-white font-semibold' onClick={() => dispatch(setChangeOk({ok: false }))} >Regresar</button>
          </div>
      </div>
    </div>
  )
}
