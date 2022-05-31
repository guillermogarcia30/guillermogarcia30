import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, FieldArray,ErrorMessage } from 'formik'

import { AiOutlinePlus, AiFillEye } from 'react-icons/ai'
import { MdOutlineFileCopy } from 'react-icons/md'

    

export const ModalAPlicaciones = ({view, hide, add,id = "189da1-gfsaf-1561f-gfh1561"}) => {

    const appurls = [
        {
            appurl: ''
        }
    ]

  return (
    <div style={view ?{display: 'flex'}:{display: 'none'}} className='justify-end bg-black-transparent z-50 absolute top-0 bottom-0 left-0 right-0 m-[0 auto]' >
        <div className='bg-white dark:bg-darkmode-black-02 w-[40rem] h-full px-16 py-12' >
            <h2 className='dark:text-white text-[2rem] font-semibold' >Crear una aplicacion</h2>
            <div className='flex' >
                <div className='p-4 bg-pink rounded-full mr-3' >
                    <AiOutlinePlus className=' text-white text-[3rem] ' />
                </div>
                <div>
                    <input className='dark:focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-white focus-visible:outline-none mb-[.4rem] border-b border-b-gray-border' type="text" placeholder='Nombre de la app' />
                    <p className='dark:text-white' >Client ID</p>
                    <p className='text-dark-blue dark:text-darkmode-blue-01 font-medium' >{id}</p>
                </div>
            </div>
            <Formik
            initialValues={{ fabricante: '', website: '', appurls }}
             validate={values => {
                    const errors = {};
                    if (!values.fabricante) {
                    errors.fabricante = 'El fabricante es obligatorio';
                    }
                    if (!values.appurls) {
                    errors.appurls = 'La aplicacion debe tener una URL';
                    }
                    if (!values.website) {
                    errors.website = 'El website es obligatorio';
                    }
                    return errors;
                }} >
                {({values}) => (
                    <Form className='py-12' >
                    <div className='flex flex-col w-full' >
                        <label className='mb-2 text-dark-blue dark:text-darkmode-blue-01 font-normal' htmlFor="fabricante" >Fabricante</label>
                        <Field name='fabricante' className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-white rounded px-3 py-2 focus:dark:bg-darkmode-black-02  mb-8 border-2 border-gray-light' id='fabricante' type="text" />
                    </div>
                    <div className='flex flex-col w-full' >
                        <label className='mb-2 text-dark-blue dark:text-darkmode-blue-01 font-normal' htmlFor="sitioweb" >Sitio web</label>
                        <Field name='website' className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-white rounded px-3 py-2 focus:dark:bg-darkmode-black-02  mb-8 border-2 border-gray-light' id='sitioweb' type="text" />
                    </div>
                    <div className='relative flex flex-col w-full' >
                        <div className='flex justify-between' >
                            <label className='mb-2 text-dark-blue dark:text-darkmode-blue-01 font-normal' htmlFor="secret" >Secret</label>
                            <button className='text-pink' >Regenerar</button>
                        </div>
                        <Field name='secret' className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-white rounded px-3 py-2 focus:dark:bg-darkmode-black-02  mb-8 border-2 border-gray-light' id='secret' type="password" />
                        <div className='w-12 flex justify-between absolute right-[1.25rem] bottom-[2.75rem]' >
                            <button className='text-gray-light text-[1.2rem]' ><MdOutlineFileCopy/></button>
                            <button className='text-gray-light text-[1.2rem]' ><AiFillEye/></button>
                        </div>
                    </div>
                    <div className='flex flex-col w-full' >
                        <label className='mb-2 text-dark-blue dark:text-darkmode-blue-01 font-normal' htmlFor="appurls" >App url</label>
                        <FieldArray  name='appurls' className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-white rounded px-3 py-2 focus:dark:bg-darkmode-black-02  border-2 border-gray-light' id='appurl' type="text" >
                        {({ insert, remove, push }) => (
                        <div className='overflow-scroll overflow-x-hidden max-h-[11rem] scrollbar-thin scrollbar-thumb-pink px-4 scrollbar-track-black-transparent dark:scrollbar-track-gray-border ' >
                            {values.appurls.length > 0 &&
                            values.appurls.map((appurl, index) => (
                                <div className="mb-2" key={index}>
                                <div className="flex flex-col w-full">
                                    <Field
                                    name={`appurl.${index}.email`}
                                    type="text"
                                    className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-white rounded px-3 py-2 focus:dark:bg-darkmode-black-02  border-2 border-gray-light'
                                    />
                                </div>
                                </div>
                            ))}
                            <button
                            type="button"
                            className='text-pink mb-8 text-right w-full '
                            onClick={() => push({ appurl: '' })}
                            >
                            + Agregar
                            </button>
                        </div>
                        )}
                    </FieldArray>
                    </div>
                    <ErrorMessage className='text-red' name='fabricante' component='p' />
                    <ErrorMessage className='text-red' name='website' component='p' />
                    <ErrorMessage className='text-red' name='appurl' component='p' />
                </Form>
                ) }
            </Formik>
        <div className='flex justify-between' >
            <button className='w-[45%] bg-white border border-solid rounded-[10px] font-semibold px-3 py-2 dark:bg-darkmode-black-02 dark:text-white dark:border-pink ' onClick={hide} >Volver</button>
            <button className='w-[45%] bg-pink text-white rounded-[10px] font-semibold px-3 py-2' onClick={add} >Guardar</button>
        </div>
        </div>
    </div>
  )
}
