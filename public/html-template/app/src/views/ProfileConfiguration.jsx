import { Form, Formik, Field } from 'formik'
import React from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { updateProfileData } from '../store/user/thunks'
import { AiOutlineCheck } from 'react-icons/ai'

import { ToggleHelper } from '../components/ToggleHelper'

// Icons
import { AiOutlineEdit } from 'react-icons/ai'

export const ProfileConfiguration = () => {

    const dispatch = useDispatch()
    const userData = useSelector( state => state.user )



  return (
    <div className='pt-24 min-h-[100vh] relative lg:static items-center lg:px-40 xl:px-52 px-8 flex flex-col' >
        <div className='flex items-center justify-between w-full my-4'>
            <h2 className='text-2xl dark:text-[#ffffff] font-semibold' >Configuración</h2>
            <h4 className='font-normal text-lg lg:block hidden' >Perfil <span className='text-gray-light' >/ configuración</span></h4>
        </div>
        {/* Container */}
        <Formik initialValues={{ country: '', city: '', address: '', tlf: '', email: '' }} 
        onSubmit={(values)=> {
            dispatch(updateProfileData({token: userData.token, backup_email: userData.email , ...values }))
        }} >
            <div className='w-full lg:px-20 semi-l:px-0 semi-l:hidden relative' >
                <Form>
                    {/* Primer separador */}

                    <div>
                        <h4 className='text-xl font-semibold mb-8 mt-7' >Cuenta</h4>
                        <div className='w-full shadow-custom mb-6 rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3' >
                            <div className='max-w-[3rem] max-h-[3rem] overflow-hidden rounded-full' >
                                <img className='w-full h-full' src={userData.image} alt="" />
                            </div>
                            <div className='pl-4' >
                                <h5 className='font-semibold' >{userData.name}</h5>
                                <p className='dark:text-white text-[11px] text-gray ' >¿Este no es tu usuario? <span className='text-pink underline' >Cambiar de cuenta</span> </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className='text-xl font-semibold mb-8' >Preferencia</h4>
                        <div className='w-full shadow-custom mb-6 rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3 flex-col' >
                            <div className='flex items-center' >
                                <ToggleHelper i={1} />
                                <small className=' ml-4 text-[11px] ' >Enviar correo de nueva notificación</small>
                            </div>
                            <div className='flex items-center mt-4' >
                                <ToggleHelper i={2} />
                                <small className=' ml-4 text-[11px] ' >Cerrar la cuenta cada 10 dias</small>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className='text-xl font-semibold mb-8' >Activar estado</h4>
                        <div className='w-full mb-6 rounded-[5px]   flex flex-col' >
                            <div className='bg-[#ffffff] shadow-custom w-full dark:bg-darkmode-black-02 dark:text-white rounded-[5px] p-2 text-[11px]' ><p>si tienes el estado activo tus clientes pueden ver si estás activo o ausente, si quieres que tus clientes no vean tu estado de perfil puedes desactivarlo</p></div>
                            <div className='flex items-center pl-[1.8rem] mt-4' >
                                <ToggleHelper i={3} />
                                <small className=' ml-4 text-[11px] ' >Puedes desactivar el estado de la cuenta</small>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className='text-xl font-semibold mb-8' >Privacidad</h4>
                        <div className='w-full shadow-custom mb-6 rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3 flex-col' >
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
                    </div>


                        <h4 className='text-xl font-semibold mb-8' >Información</h4>

                        <div className='w-full shadow-custom mb-6 rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3 flex-col'  >
                            <div className='mb-2 w-full flex items-center' >
                                <label className='font-normal text-lg' htmlFor='country' >Pais</label> <AiOutlineEdit className='ml-4 text-gray-light ' />
                            </div>
                            <Field className='bg-white-input mb-4 rounded-[5px] h-8 px-4 py-6' name='country' id='country' type='text' />
                            <div className='mb-2 w-full flex items-center' >
                                <label className='font-normal text-lg' htmlFor='country' >Ciudad</label> <AiOutlineEdit className='ml-4 text-gray-light ' />
                            </div>
                            <Field className='bg-white-input mb-4 rounded-[5px] h-8 px-4 py-6' name='city' id='city' type='text' />
                            <div className='mb-2 w-full flex items-center' >
                                <label className='font-normal text-lg' htmlFor='address' >Dirección</label> <AiOutlineEdit className='ml-4 text-gray-light ' />
                            </div>
                            <Field className='bg-white-input mb-4 rounded-[5px] h-8 px-4 py-6' name='address' id='address' type='text' />
                        </div>
                        <div className='w-full shadow-custom mb-6 rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3 flex-col'  >
                            <div className='mb-2 w-full flex items-center' >
                                <label className='font-normal text-lg' htmlFor='tlf' >Teléfono personal</label> <AiOutlineEdit className='ml-4 text-gray-light ' />
                            </div>
                            <Field className='bg-white-input mb-4 rounded-[5px] h-8 px-4 py-6' name='tlf' id='tlf' type='number' />
                        </div>
                        <div className='w-full shadow-custom mb-6 rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3 flex-col'  >
                            <div className='mb-2 w-full flex items-center' >
                                <label className='font-normal text-lg' htmlFor='email' >Correo electrónico</label> <AiOutlineEdit className='ml-4 text-gray-light ' />
                            </div>
                            <Field className='bg-white-input mb-4 rounded-[5px] h-8 px-4 py-6' name='email' id='email' type='text' />
                        </div>
                    <button type='submit' className='lg:hidden fixed bottom-3 right-4 bg-red text-white rounded-full font-semibold px-3 py-3' > <AiOutlineCheck className='text-[3rem]' /> </button>

                    </Form>
                </div>
            </Formik>
            {/* form desktop */}
        <Formik initialValues={{ country: '', city: '', address: '', tlf: '', email: '' }} 
        onSubmit={(values)=> {
            dispatch(updateProfileData({token: userData.token, backup_email: userData.email , ...values }))
        }} >
            <div className='hidden w-full semi-l:block' >
                <Form  >
                    {/* Primer separador */}

                    <div className='flex justify-between ' >
                        <div className='w-80 ' >
                            <div>
                                <h4 className='text-xl font-semibold mb-8' >Cuenta</h4>
                                <div className='w-full shadow-custom mb-6 rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3' >
                                    <div className='max-w-[3rem] max-h-[3rem] overflow-hidden rounded-full' >
                                        <img className='w-full h-full' src={userData.image} alt="" />
                                    </div>
                                    <div className='pl-4' >
                                        <h5 className='font-semibold' >{userData.name}</h5>
                                        <p className='dark:text-white text-[11px] text-gray ' >¿Este no es tu usuario? <span className='text-pink underline' >Cambiar de cuenta</span> </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className='text-xl font-semibold mb-8' >Activar estado</h4>
                                <div className='w-full mb-6 rounded-[5px]   flex flex-col' >
                                    <div className='bg-[#ffffff] shadow-custom w-full dark:bg-darkmode-black-02 dark:text-white rounded-[5px] p-2 text-[11px]' ><p>si tienes el estado activo tus clientes pueden ver si estás activo o ausente, si quieres que tus clientes no vean tu estado de perfil puedes desactivarlo</p></div>
                                    <div className='flex items-center pl-[1.8rem] mt-4' >
                                        <ToggleHelper i={7} />
                                        <small className=' ml-4 text-[11px] ' >Puedes desactivar el estado de la cuenta</small>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className='text-xl font-semibold mb-8' >Privacidad</h4>
                                <div className='w-full shadow-custom mb-6 rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3 flex-col' >
                                <div className='flex items-center' >
                                        <ToggleHelper i={8} />
                                        <small className=' ml-4 text-[11px] ' >Perfil modo oculto</small>
                                    </div>
                                    <div className='flex items-center mt-4' >
                                        <ToggleHelper i={9} />
                                        <small className=' ml-4 text-[11px] ' >Ocultar direccion de correo electrónico</small>
                                    </div>
                                    <div className='flex items-center mt-4' >
                                        <ToggleHelper i={10} />
                                        <small className=' ml-4 text-[11px] ' >Ocultar número de teléfono</small>
                                    </div>
                                    <div className='flex items-center mt-4' >
                                        <ToggleHelper i={11} />
                                        <small className=' ml-4 text-[11px] ' >Nadie ve con quien estás vinculado</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        {/*  */}
                        {/*  */}
                        <div>
                            <div>
                                <h4 className='text-xl font-semibold mb-8' >Preferencia</h4>
                                <div className='w-full shadow-custom mb-6 rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3 flex-col' >
                                    <div className='flex items-center' >
                                        <ToggleHelper i={12} />
                                        <small className=' ml-4 text-[11px] ' >Enviar correo de nueva notificación</small>
                                    </div>
                                    <div className='flex items-center mt-4' >
                                        <ToggleHelper i={13} />
                                        <small className=' ml-4 text-[11px] ' >Cerrar la cuenta cada 10 dias</small>
                                    </div>
                                </div>
                            </div>
                                <div>
                                    <h4 className='text-xl font-semibold mb-8' >Información</h4>
                                    <div className='w-full shadow-custom mb-6 rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3 flex-col'  >
                                        <div className='mb-2 w-full flex items-center' >
                                            <label className='font-normal text-lg' htmlFor='country' >Pais</label> <AiOutlineEdit className='ml-4 text-gray-light ' />
                                        </div>
                                        <Field className='bg-white-input mb-4 rounded-[5px] h-8 px-4 py-6' name='country' id='country' type='text' />
                                        <div className='mb-2 w-full flex items-center' >
                                            <label className='font-normal text-lg' htmlFor='country' >Ciudad</label> <AiOutlineEdit className='ml-4 text-gray-light ' />
                                        </div>
                                        <Field className='bg-white-input mb-4 rounded-[5px] h-8 px-4 py-6' name='city' id='city' type='text' />
                                        <div className='mb-2 w-full flex items-center' >
                                            <label className='font-normal text-lg' htmlFor='address' >Dirección</label> <AiOutlineEdit className='ml-4 text-gray-light ' />
                                        </div>
                                        <Field className='bg-white-input mb-4 rounded-[5px] h-8 px-4 py-6' name='address' id='address' type='text' />
                                    </div>
                                </div>
                        </div>
                            <div className='mt-[3.6rem]' >
                                <div className='w-full shadow-custom mb-6 rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3 flex-col'  >
                                    <div className='mb-2 w-full flex items-center' >
                                        <label className='font-normal text-lg' htmlFor='tlf' >Teléfono personal</label> <AiOutlineEdit className='ml-4 text-gray-light ' />
                                    </div>
                                    <Field className='bg-white-input mb-4 rounded-[5px] h-8 px-4 py-6 appearance-none' name='tlf' id='tlf' type='number' />
                                </div>
                                <div className='w-full shadow-custom mb-6 rounded-[5px] bg-[#ffffff] dark:bg-darkmode-black-02 flex  px-7 py-3 flex-col'  >
                                    <div className='mb-2 w-full flex items-center' >
                                        <label className='font-normal text-lg' htmlFor='email' >Correo electrónico</label> <AiOutlineEdit className='ml-4 text-gray-light ' />
                                    </div>
                                    <Field className='bg-white-input mb-4 rounded-[5px] h-8 px-4 py-6' name='email' id='email' type='text' />
                                </div>
                            </div>
                            
                    </div>
                    <div className='flex items-center justify-end mt-12' >
                                <Link to={'/profile'} className='bg-[#ffffff] border border-solid rounded-[5px] font-semibold px-11 py-2 dark:bg-darkmode-black-02 dark:text-[#ffffff] dark:border-pink '>Volver</Link>
                                <button type='submit' className='bg-pink ml-8 text-white rounded-[5px] font-semibold px-11 py-2'  >Guardar</button>
                    </div>
                    </Form>

                </div>
                
            </Formik>
    </div>
  )
}
