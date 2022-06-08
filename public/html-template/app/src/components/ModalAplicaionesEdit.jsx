import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'

import {  AiFillEye } from 'react-icons/ai'
import { MdOutlineFileCopy } from 'react-icons/md'

import FileDragAndDropField from './FormikHelper' 

import { modalSubscribed, hideModal } from '../store/modals/modalEditSlice'
import { useSelector, useDispatch } from 'react-redux'

import { updateAppAsync } from '../store/apps/thunks'


export const ModalAPlicacionesEdit = () => {

    const appurls = [
        {
            appurl: ''
        }
    ]

    const modalstate = useSelector(modalSubscribed)
    const B_token = useSelector(state => state.user.token)
    const dispatch = useDispatch()

    const closeModal = useCallback(
        ()=>{
            dispatch(hideModal())
        }
        , [dispatch])


    const formikRef = useRef()

    const [ type, setInputType] = useState('password')
    const [ appId, setAppid ] = useState('')


    const SECRETEdit_URL = 'https://auth.synapse-crm.com/api/generator/secret'

    useEffect(()=> {
        if (modalstate.open) {
            formikRef.current.setFieldValue(
                "secretEdit",
                modalstate.secret
            )

            formikRef.current.setFieldValue(
                "applicationName",
                modalstate.appName
            )
            formikRef.current.setFieldValue(
                "fabricanteEdit",
                modalstate.fabricante
            )
            formikRef.current.setFieldValue(
                "websiteEdit",
                modalstate.website
            )
                                        
            let arr = modalstate.appurls.split(',')
            if (arr.length > 1) {
                let newArr = []
                arr.forEach( el => {
                    newArr.push({
                        appurl: el
                    })
                })
                formikRef.current.initialValues.appurls = newArr
            }
            else {
                formikRef.current.initialValues.appurls = [{
                    appurl: arr[0]
                }]
            }

            setAppid(modalstate.id)
        }
        

        
    }, [modalstate.open])

    const changeType = () => {
        type === 'password'? setInputType('text'): setInputType('password') 
    }

  return (
    <div style={modalstate.open ?{display: 'flex'}:{display: 'none'}} className='justify-end bg-black-transparent min-h-[100vh] z-[1000]  fixed top-0 bottom-0 left-0 right-0 m-[0 auto]' >
        <div className='bg-[#ffffff] dark:bg-darkmode-black-02 w-full lg:w-auto h-full px-4 pt-8 sm:px-12 ms:px-24 md:px-40 lg:px-16 lg:py-12' >
            <h2 className='dark:text-[#ffffff] z-[999] text-[2rem] font-semibold' >Editar una aplicacion</h2>
            
            <Formik
            innerRef={formikRef}
            initialValues={{  image: '', fabricanteEdit: '', websiteEdit: '', secretEdit: '' , appurls, applicationName: '' }}
            onSubmit={ (values, { resetForm }) => {
                dispatch(updateAppAsync({ client_id: appId, token: B_token ,...values }))
                resetForm()
                dispatch(hideModal())
            }}
             validate={values => {
                    const errors = {};
                    if (!values.applicationName) {
                        errors.applicationName = 'El Nombre de la aplicacion es obligatorio';
                    }
                    if (!values.fabricanteEdit) {
                    errors.fabricanteEdit = 'El fabricante es obligatorio';
                    }
                    if (!values.appurls) {
                    errors.appurls = 'La aplicacion debe tener una URL';
                    }
                    if (!values.websiteEdit) {
                    errors.websiteEdit = 'El website es obligatorio';
                    }
                    if (!values.secretEdit){
                        errors.secretEdit = 'Por favor vuelva a generar el secret'
                    }
                    if(values.appurls[0].appurl.length < 2){
                        errors.appurls = 'Debe colocar almenos una url a la aplicacion'
                    }
                    return errors;
                }} >
                {({values, ...props}) => (
                    
                    <Form>
                        <div className='max-h-20 mb-7 flex' >
                            <div>

                                <Field
                                    name="image"
                                    component={FileDragAndDropField}
                                    accept="image/*"
                                    edit={true}
                                />
                            </div>
                            <div>
                                <Field name='applicationName' className='dark:focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-[#ffffff] focus-visible:outline-none mb-[.4rem] border-b border-b-gray-border' type="text" placeholder='Nombre de la app' />
                                <p className='dark:text-[#ffffff]' >Client ID</p>
                                <p className='text-dark-blue dark:text-darkmode-blue-01 font-medium break-all' >{appId}</p>
                            </div>
                        </div>
                    <div className='flex flex-col w-full' >
                        <label className='mb-2 text-dark-blue dark:text-darkmode-blue-01 font-normal' htmlFor="fabricanteEdit" >Fabricante</label>
                        <Field name='fabricanteEdit' className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-[#ffffff] rounded px-3 py-2 focus:dark:bg-darkmode-black-02  mb-8 border-2 border-gray-light' id='fabricanteEdit' type="text" />
                    </div>
                    <div className='flex flex-col w-full' >
                        <label className='mb-2 text-dark-blue dark:text-darkmode-blue-01 font-normal' htmlFor="sitiowebEditEdit" >Sitio web</label>
                        <Field name='websiteEdit' className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-[#ffffff] rounded px-3 py-2 focus:dark:bg-darkmode-black-02  mb-8 border-2 border-gray-light' id='sitiowebEdit' type="text" />
                    </div>
                    <div className='relative flex flex-col w-full' >
                        <div className='flex justify-between' >
                            <label className='mb-2 text-dark-blue dark:text-darkmode-blue-01 font-normal' htmlFor="secretEdit" >Secret</label>
                            <button type='button' className='text-pink' onClick={() =>{ 
                                props.setFieldValue('secretEdit', '')
                                fetch(SECRETEdit_URL)
                                .then( res => res.json() )
                                .then( res => props.setFieldValue('secretEdit', res.data) )
                                .catch( err => console.log(err) )
                                }} >Regenerar</button>
                        </div>
                        <Field disabled  name='secretEdit' className='dark:focus-visible:outline-none pr-20 lg:pr-0 focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-[#ffffff] rounded px-3 py-2 focus:dark:bg-darkmode-black-02  mb-8 border-2 border-gray-light' id='secretEdit' type={type} />
                        <div className='w-12 flex justify-between absolute right-[1.25rem] bottom-[2.75rem]' >
                            <button onClick={async() => {
                               await navigator.clipboard.writeText(values.secretEdit)
                            }} type="button" className='text-gray-light text-[1.2rem]' ><MdOutlineFileCopy/></button>
                            <button onClick={changeType} type="button" className='text-gray-light text-[1.2rem]' ><AiFillEye/></button>
                        </div>
                    </div>
                    <div className='flex flex-col w-full' >
                        <label className='mb-2 text-dark-blue dark:text-darkmode-blue-01 font-normal' htmlFor="appurls" >App url</label>
                        { modalstate.open && (
                            <FieldArray name='appurls' className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-[#ffffff] rounded px-3 py-2 focus:dark:bg-darkmode-black-02  border-2 border-gray-light' id='appurl' type="text" >
                            {({ insert, remove, push }) => (
                            <div className='overflow-scroll overflow-x-hidden max-h-[11rem] scrollbar-thin scrollbar-thumb-pink pr-4 scrollbar-track-black-transparent dark:scrollbar-track-gray-border ' >
                                {
                                values.appurls.length > 0 &&
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
                        ) }
                    </div>
                    <ErrorMessage className='text-red' name='applicationName' component='p' />
                    <ErrorMessage className='text-red' name='fabricanteEdit' component='p' />
                    <ErrorMessage className='text-red' name='websiteEdit' component='p' />
                    <ErrorMessage className='text-red' name='secretEdit' component='p' />
                    <ErrorMessage className='text-red' name='appurls' component='p' />
                    <div className='mt-4 flex justify-between' >
                        <button type='reset' className='w-[45%] bg-[#ffffff] border border-solid rounded-[10px] font-semibold px-3 py-2 dark:bg-darkmode-black-02 dark:text-[#ffffff] dark:border-pink ' onClick={closeModal} >Volver</button>
                        <button type='submit' className='w-[45%] bg-pink text-white rounded-[10px] font-semibold px-3 py-2'  >Guardar</button>
                    </div>
                </Form>
                ) }
            </Formik>
        
        </div>
    </div>
  )
}