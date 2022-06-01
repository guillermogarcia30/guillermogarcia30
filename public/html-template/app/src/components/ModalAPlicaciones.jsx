import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field, FieldArray, ErrorMessage, useFormikContext } from 'formik'

import { AiOutlinePlus, AiFillEye } from 'react-icons/ai'
import { MdOutlineFileCopy } from 'react-icons/md'

const CustomInput = () => {
    return (
    <>
        <input/>
    </>
    )
}

export const ModalAPlicaciones = ({view, hide, add }) => {

    const appurls = [
        {
            appurl: ''
        }
    ]

    const formikRef = useRef()

    const [ type, setInputType] = useState('password')
    const [ clientId, setCLientId] = useState('')

    const CLIENT_ID_URL = 'https://auth.synapse-crm.com/api/generator/client-id'
    const SECRET_URL = 'https://auth.synapse-crm.com/api/generator/secret'

    useEffect(()=> {
        fetch(SECRET_URL)
                .then( res => res.json() )
                .then( res => {
                    if (formikRef.current) {
                        formikRef.current.setFieldValue(
                          "secret",
                          res.data
                        )
                    }
                    // 
                } )
                .catch( err => console.log(err))
        fetch(CLIENT_ID_URL)
                .then( res => res.json() )
                .then( res => setCLientId(res.data) )
                .catch( err => console.log(err) )
        
    }, [])

    const changeType = () => {
        type === 'password'? setInputType('text'): setInputType('password') 
    }

  return (
    <div style={view ?{display: 'flex'}:{display: 'none'}} className='justify-end bg-black-transparent z-50 absolute top-0 bottom-0 left-0 right-0 m-[0 auto]' >
        <div className='bg-[#ffffff] dark:bg-darkmode-black-02 w-[40rem] h-full px-16 py-12' >
            <h2 className='dark:text-[#ffffff] text-[2rem] font-semibold' >Crear una aplicacion</h2>
            
            <Formik
            innerRef={formikRef}
            initialValues={{ fabricante: '', website: '', secret: '' , appurls, applicationName: '' }}
            onSubmit={ (values) => {
                console.log(values.appurls[0].appurl.length)
            }}
             validate={values => {
                    const errors = {};
                    if (!values.applicationName) {
                        errors.applicationName = 'El Nombre de la aplicacion es obligatorio';
                    }
                    if (!values.fabricante) {
                    errors.fabricante = 'El fabricante es obligatorio';
                    }
                    if (!values.appurls) {
                    errors.appurls = 'La aplicacion debe tener una URL';
                    }
                    if (!values.website) {
                    errors.website = 'El website es obligatorio';
                    }
                    if (!values.secret){
                        errors.secret = 'Por favor vuelva a generar el secret'
                    }
                    if(values.appurls[0].appurl.length < 2){
                        errors.appurls = 'Debe colocar almenos una url a la aplicacion'
                    }
                    return errors;
                }} >
                {({values, ...props}) => (
                    
                    <Form className='py-12' >
                        <div className=' mb-7 flex' >
                            <div className='p-4 bg-pink rounded-full mr-3' >
                                <AiOutlinePlus className=' text-white text-[3rem] ' />
                            </div>
                            <div>
                                <Field name='applicationName' className='dark:focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-[#ffffff] focus-visible:outline-none mb-[.4rem] border-b border-b-gray-border' type="text" placeholder='Nombre de la app' />
                                <p className='dark:text-[#ffffff]' >Client ID</p>
                                <p className='text-dark-blue dark:text-darkmode-blue-01 font-medium' >{clientId}</p>
                            </div>
                        </div>
                    <div className='flex flex-col w-full' >
                        <label className='mb-2 text-dark-blue dark:text-darkmode-blue-01 font-normal' htmlFor="fabricante" >Fabricante</label>
                        <Field name='fabricante' className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-[#ffffff] rounded px-3 py-2 focus:dark:bg-darkmode-black-02  mb-8 border-2 border-gray-light' id='fabricante' type="text" />
                    </div>
                    <div className='flex flex-col w-full' >
                        <label className='mb-2 text-dark-blue dark:text-darkmode-blue-01 font-normal' htmlFor="sitioweb" >Sitio web</label>
                        <Field name='website' className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-[#ffffff] rounded px-3 py-2 focus:dark:bg-darkmode-black-02  mb-8 border-2 border-gray-light' id='sitioweb' type="text" />
                    </div>
                    <div className='relative flex flex-col w-full' >
                        <div className='flex justify-between' >
                            <label className='mb-2 text-dark-blue dark:text-darkmode-blue-01 font-normal' htmlFor="secret" >Secret</label>
                            <button type='button' className='text-pink' onClick={() =>{ 
                                props.setFieldValue('secret', '')
                                fetch(SECRET_URL)
                                .then( res => res.json() )
                                .then( res => props.setFieldValue('secret', res.data) )
                                .catch( err => console.log(err) )
                                }} >Regenerar</button>
                        </div>
                        <Field disabled  name='secret' className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-[#ffffff] rounded px-3 py-2 focus:dark:bg-darkmode-black-02  mb-8 border-2 border-gray-light' id='secret' type={type} />
                        <div className='w-12 flex justify-between absolute right-[1.25rem] bottom-[2.75rem]' >
                            <button onClick={async() => {
                               await navigator.clipboard.writeText(values.secret)
                            }} type="button" className='text-gray-light text-[1.2rem]' ><MdOutlineFileCopy/></button>
                            <button onClick={changeType} type="button" className='text-gray-light text-[1.2rem]' ><AiFillEye/></button>
                        </div>
                    </div>
                    <div className='flex flex-col w-full' >
                        <label className='mb-2 text-dark-blue dark:text-darkmode-blue-01 font-normal' htmlFor="appurls" >App url</label>
                        <FieldArray  name='appurls' className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-[#ffffff] rounded px-3 py-2 focus:dark:bg-darkmode-black-02  border-2 border-gray-light' id='appurl' type="text" >
                        {({ insert, remove, push }) => (
                        <div className='overflow-scroll overflow-x-hidden max-h-[11rem] scrollbar-thin scrollbar-thumb-pink px-4 scrollbar-track-black-transparent dark:scrollbar-track-gray-border ' >
                            {values.appurls.length > 0 &&
                            values.appurls.map((appurls, index) => (
                                <div className="mb-2" key={index}>
                                <div className="flex flex-col w-full">
                                    <Field
                                    name={`appurls.${index}.appurl`}
                                    type="text"
                                    className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-[#ffffff] rounded px-3 py-2 focus:dark:bg-darkmode-black-02  border-2 border-gray-light'
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
                    <ErrorMessage className='text-red' name='applicationName' component='p' />
                    <ErrorMessage className='text-red' name='fabricante' component='p' />
                    <ErrorMessage className='text-red' name='website' component='p' />
                    <ErrorMessage className='text-red' name='secret' component='p' />
                    <ErrorMessage className='text-red' name='appurls' component='p' />
                    <div className='mt-4 flex justify-between' >
                        <button className='w-[45%] bg-[#ffffff] border border-solid rounded-[10px] font-semibold px-3 py-2 dark:bg-darkmode-black-02 dark:text-[#ffffff] dark:border-pink ' onClick={hide} >Volver</button>
                        <button type='submit' className='w-[45%] bg-pink text-white rounded-[10px] font-semibold px-3 py-2'  >Guardar</button>
                    </div>
                </Form>
                ) }
            </Formik>
        
        </div>
    </div>
  )
}
