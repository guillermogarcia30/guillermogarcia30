import React from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import { ModalImg } from '../components/ModalImg'

import { onProfilePicOpen } from '../store/modals/modalEditSlice'

// Icons
import { FiCamera } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'


export const Profile = () => {

    const loading = useSelector( state => state.apps.loading )

    const userData = useSelector( state => state.user )
    const dispatch = useDispatch()
    if (loading) {
        return (
        <div className='pt-24 min-h-[100vh] items-center lg:px-40 xl:px-52 px-8 flex flex-col'>
            <div className='flex items-center justify-between w-full my-4'>
                <h2 className='text-[2rem] dark:text-[#ffffff] font-semibold' >Perfil</h2>
            </div>
            <div className='w-full '>
            <div className='w-full shadow-custom rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-[25px] flex-col'>
                <div className='flex mb-4' >
                    <div className='relative cursor-pointer' >
                        <div className='w-[6rem] h-[6rem] rounded-full overflow-hidden' >
                            <img className='w-full min-h-full' src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' alt="foto de perfil" />
                        </div>
                        <div className='absolute right-0 bottom-[-5px] bg-gray-light w-8 h-8 rounded-full flex justify-center items-center' >
                            <FiCamera className='text-white text-[1.2rem]' />
                        </div>
                    </div>
                </div>
            </div>
            
            </div>
        </div>
        )
    }

  return (
    <div className='pt-24 min-h-[100vh] items-center lg:px-40 xl:px-52 px-8 flex flex-col' >
        <div className='flex items-center justify-between w-full my-4'>
            <h2 className='text-[2rem] dark:text-[#ffffff] font-semibold' >Perfil</h2>
            <Link to={'/home'} className='font-normal text-lg' >Aplicación <span className='text-gray-light' >/ perfil</span></Link>
        </div>
        <div className='w-full ' >
            {/* Datos principales */}
            <div className='w-full shadow-custom rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-[25px] flex-col' >
                <div className='flex mb-4' >
                    <div className='relative cursor-pointer' onClick={() => dispatch(onProfilePicOpen())} >
                        { !userData.profilePicCHangeLoading ? (
                        <div className='w-[6rem] h-[6rem] rounded-full overflow-hidden' >
                            <img className='w-full min-h-full' src={userData.image} alt="foto de perfil" />                            
                        </div> 
                        ) : (
                            <div className='w-[6rem] h-[6rem] bg-gray-light flex items-center justify-center rounded-full overflow-hidden' >
                                <svg role="status" className="w-8 h-8 mr-2 text-white animate-spin fill-pink" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                            </div >
                        )}                        
                        <div className='absolute right-0 bottom-[-5px] bg-gray-light w-8 h-8 rounded-full flex justify-center items-center' >
                            <FiCamera className='text-white text-[1.2rem]' />
                        </div>
                    </div>
                    <div className="flex flex-col ml-4 relative">
                        <h4 className='text-[#000000] dark:text-white font-bold text-lg lg:text-xl' >{userData.name}</h4>
                        <p className='font-semibold dark:text-soft-gray text-gray-light' >Vinculados</p>
                        <Link to='/profile/configuration' className='absolute right-[-30px] top-[7px]' ><FiEdit className='text-gray-light' /></Link>
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
            <div className='w-full shadow-custom rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02  flex  px-7 py-[25px] flex-col mt-8'>
                <h4 className=' text-[#000000] dark:text-white font-bold text-lg lg:text-xl mb-[20px]' >Información Personal</h4>
                <div className='flex justify-between lg:items-center flex-col lg:flex-row ' >
                    <p className=' mb-2 lg:mb-0 dark:text-white font-semibold' >Fecha de nacimiento: <span className='text-gray-dark dark:text-soft-gray ' >{userData.birthDay}</span></p>
                    <p className=' mb-2 lg:mb-0 dark:text-white font-semibold' >Ciudad: <span className='text-gray-dark dark:text-soft-gray ' >{userData.ciudad}</span></p>
                    <p className=' mb-2 lg:mb-0 dark:text-white font-semibold' >Dirección: <span className='text-gray-dark dark:text-soft-gray ' >{userData.address}</span></p>
                </div>
            </div>
            {/* Fin de Datos personales */}
            {/* Telefono */}
            <div className='w-full shadow-custom rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02  flex  px-7 py-[25px] flex-col mt-8'>
                <h4 className=' text-[#000000] dark:text-white font-bold text-lg lg:text-xl mb-[20px]' >Teléfono</h4>
                <div className='flex justify-between items-center' >
                    <p className=' dark:text-white font-semibold' >Teléfono personal: <span className='text-gray-dark dark:text-soft-gray ' >{userData.phone}</span></p>
                </div>
            </div>
            {/* Fin de telefono */}
            {/* Email */}
            <div className='w-full shadow-custom rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02  flex  px-7 py-[25px] flex-col mt-8'>
                <h4 className=' text-[#000000] dark:text-white font-bold text-lg lg:text-xl mb-[20px]' >Correo Electrónico</h4>
                <div className='flex justify-between items-center' >
                    <p className=' dark:text-white font-semibold' >Correo: <span className='text-gray-dark dark:text-soft-gray ' >{userData.email}</span></p>
                </div>
            </div>
        </div>
        <ModalImg />
    </div>
  )
}
