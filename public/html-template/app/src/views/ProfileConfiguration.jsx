import { Form, Formik, Field } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'

import { ToggleHelper } from '../components/ToggleHelper'

// Icons
import { AiOutlineEdit } from 'react-icons/ai'

export const ProfileConfiguration = () => {

    const userData = useSelector( state => state.user )



  return (
    <div className='pt-24 min-h-[100vh] relative lg:static items-center lg:px-40 px-8 flex flex-col' >
        <div className='flex items-center justify-between w-full my-4'>
            <h2 className='text-2xl dark:text-[#ffffff] font-semibold' >Configuración</h2>
            <h4 className='font-normal text-lg lg:block hidden' >Perfil <span className='text-gray-light' >/ configuración</span></h4>
        </div>
        {/* Container */}
        <div className='w-full' >
            <h4 className='text-xl font-semibold mb-8 mt-7' >Cuenta</h4>
            <div className='w-full shadow-lg mb-6 rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3' >
                <div className='max-w-[3rem] max-h-[3rem] overflow-hidden rounded-full' >
                    <img className='w-full h-full' src={userData.image} alt="" />
                </div>
                <div className='pl-4' >
                    <h5 className='font-semibold' >{userData.name}</h5>
                    <p className='dark:text-white text-[11px] text-gray ' >¿Este no es tu usuario? <span className='text-pink underline' >Cambiar de cuenta</span> </p>
                </div>
            </div>

            <h4 className='text-xl font-semibold mb-8' >Preferencia</h4>
            <div className='w-full shadow-lg mb-6 rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3 flex-col' >
                <div className='flex items-center' >
                    <ToggleHelper i={1} />
                    <small className=' ml-4 text-[11px] ' >Enviar correo de nueva notificación</small>
                </div>
                <div className='flex items-center mt-4' >
                    <ToggleHelper i={2} />
                    <small className=' ml-4 text-[11px] ' >Cerrar la cuenta cada 10 dias</small>
                </div>
            </div>

            <h4 className='text-xl font-semibold mb-8' >Activar estado</h4>
            <div className='w-full mb-6 rounded-[5px]   flex flex-col' >
                <div className='bg-[#ffffff] shadow-lg w-full dark:bg-darkmode-black-02 dark:text-white rounded-[5px] p-2 text-[11px]' ><p>si tienes el estado activo tus clientes pueden ver si estás activo o ausente, si quieres que tus clientes no vean tu estado de perfil puedes desactivarlo</p></div>
                <div className='flex items-center mt-4' >
                    <ToggleHelper i={3} />
                    <small className=' ml-4 text-[11px] ' >Puedes desactivar el estado de la cuenta</small>
                </div>
            </div>

            <h4 className='text-xl font-semibold mb-8' >Privacidad</h4>
            <div className='w-full shadow-lg mb-6 rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3 flex-col' >
            <div className='flex items-center' >
                    <ToggleHelper i={4} />
                    <small className=' ml-4 text-[11px] ' >Perfil modo oculto</small>
                </div>
                <div className='flex items-center mt-4' >
                    <ToggleHelper i={5} />
                    <small className=' ml-4 text-[11px] ' >Ocultar direccion de correo electrónico</small>
                </div>
                <div className='flex items-center mt-4' >
                    <ToggleHelper i={5} />
                    <small className=' ml-4 text-[11px] ' >Ocultar número de teléfono</small>
                </div>
                <div className='flex items-center mt-4' >
                    <ToggleHelper i={6} />
                    <small className=' ml-4 text-[11px] ' >Nadie ve con quien estás vinculado</small>
                </div>
            </div>

            <h4 className='text-xl font-semibold mb-8' >Información</h4>
            <Formik initialValues={{ country: '' }} >
                <Form>
                <div className='w-full shadow-lg mb-6 rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3 flex-col'  >
                    <div className='w-full flex items-center' >
                        <label htmlFor='country' >Pais</label> <AiOutlineEdit className='ml-4' />
                     </div>
                    <Field className='bg-white-input rounded-[5px] h-8 px-4 py-6' name='country' id='country' type='text' />
                </div>  
                </Form>

            </Formik>
        </div>
    </div>
  )
}
