import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FiCamera } from 'react-icons/fi'
import { ModalImg } from '../components/ModalImg'

import { onProfilePicOpen } from '../store/modals/modalEditSlice'

export const Profile = () => {

    const userData = useSelector( state => state.user )
    const dispatch = useDispatch()

  return (
    <div className='pt-24 min-h-[95vh] items-center px-40 flex flex-col' >
        <div className='flex items-center justify-between w-full my-4'>
            <h2 className='text-[2rem] dark:text-[#ffffff] font-semibold' >Perfil</h2>
        </div>
        <div className='w-full ' >
            {/* Datos principales */}
            <div className='w-full bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3 flex-col' >
                <div className='flex mb-4' >
                    <div className='relative cursor-pointer' onClick={() => dispatch(onProfilePicOpen())} >
                        <div className='w-[6rem] h-[6rem] rounded-full overflow-hidden' >
                            <img className='w-full min-h-full' src={userData.image} alt="foto de perfil" />
                        </div>
                        <div className='absolute right-0 bottom-[-5px] bg-gray-light w-8 h-8 rounded-full flex justify-center items-center' >
                            <FiCamera className='text-white text-[1.2rem]' />
                        </div>
                    </div>
                    <div className="flex flex-col ml-4">
                        <h4 className='text-[#000000] dark:text-white font-bold text-[1.5rem]' >{userData.name}</h4>
                        <p className='font-semibold dark:text-soft-gray text-gray-light' >Vinculados</p>
                    </div>
                </div>
                {/* Cargo y pais */}
                <div>
                    <p className='font-semibold dark:text-white' >{userData.position}</p>
                    <p className='font-semibold dark:text-soft-gray text-gray-light' >{userData.pais}</p>
                </div>
            </div>
            {/* Fin de datos principales */}
            {/* Datos personales */}
            <div className='w-full bg-[#ffffff] dark:bg-darkmode-black-02  flex  px-7 py-3 flex-col mt-8'>
                <h4 className='text-[#000000] dark:text-white font-bold text-[1.5rem]' >Informacion Personal</h4>
                <div className='flex justify-between items-center' >
                    <p className=' dark:text-white font-semibold' >Fecha de nacimiento: <span className='text-gray-dark dark:text-soft-gray ' >{userData.birthDay}</span></p>
                    <p className=' dark:text-white font-semibold' >Ciudad: <span className='text-gray-dark dark:text-soft-gray ' >{userData.ciudad}</span></p>
                    <p className=' dark:text-white font-semibold' >Direccion: <span className='text-gray-dark dark:text-soft-gray ' >{userData.address}</span></p>
                </div>
            </div>
            {/* Fin de Datos personales */}
            {/* Telefono */}
            <div className='w-full bg-[#ffffff] dark:bg-darkmode-black-02  flex  px-7 py-3 flex-col mt-8'>
                <h4 className='text-[#000000] dark:text-white font-bold text-[1.5rem]' >Telefono</h4>
                <div className='flex justify-between items-center' >
                    <p className=' dark:text-white font-semibold' >Telefono personal: <span className='text-gray-dark dark:text-soft-gray ' >{userData.phone}</span></p>
                </div>
            </div>
            {/* Fin de telefono */}
            {/* Email */}
            <div className='w-full bg-[#ffffff] dark:bg-darkmode-black-02  flex  px-7 py-3 flex-col mt-8'>
                <h4 className='text-[#000000] dark:text-white font-bold text-[1.5rem]' >Correo Electronico</h4>
                <div className='flex justify-between items-center' >
                    <p className=' dark:text-white font-semibold' >Correo: <span className='text-gray-dark dark:text-soft-gray ' >{userData.email}</span></p>
                </div>
            </div>
        </div>
        <ModalImg />
    </div>
  )
}
