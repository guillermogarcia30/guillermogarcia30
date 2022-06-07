import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiError } from 'react-icons/bi'
import { onErrorClose } from '../store/modals/modalEditSlice'

export const ModalPetitionWrong = () => {

  const view = useSelector( state => state.modal.onError )
  const dispatch = useDispatch()

  return (
    <div style={view ?{display: 'flex'}:{display: 'none'}} className='bg-black-transparent w-[100vw] h-[100vh] fixed top-0 bottom-0 left-0 right-0 m-[auto]' >
      <div className='px-[3.375rem] w-[26.825rem] h-[18.3125rem] rounded-[1.25rem] bg-[#ffffff] dark:bg-darkmode-black-02 z-50 absolute top-0 bottom-0 left-0 right-0 m-[auto]' >
          <div className='h-full w-full flex flex-col justify-center items-center' >
              <div className='flex items-center justify-center bg-red-light rounded-full w-12 h-12' >
                  <BiError className='text-red text-[1.5rem] ' />
              </div>
              <h4 className='text-lg leading-6 font-medium text-center mt-4 text-[0.8125rem] dark:text-[#ffffff]' >Algo salio mal</h4>
              <p className='text-center text-sm dark:text-[#ffffff] my-9' >Por favor intenta de nuevo mas tarde</p>
              <button className='px-4 py-2 rounded-md height-[2.25rem] w-[20.0625rem] bg-red text-white font-semibold' onClick={() => dispatch(onErrorClose())} >Regresar</button>
          </div>
      </div>
    </div>
  )
}
