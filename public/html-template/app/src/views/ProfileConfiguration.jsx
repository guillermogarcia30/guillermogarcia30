import { Form, Formik, Field } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { updateProfileData } from '../store/user/thunks'
import { onProfilePicOpen } from '../store/modals/modalEditSlice'
import { ModalImg } from '../components/ModalImg'
// Icons
import {  ArrowLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'


export const ProfileConfiguration = () => {

    const navigate = useNavigate()

    const [ data, setData ] = useState([])
    const dispatch = useDispatch()
    const userData = useSelector( state => state.user )
    useEffect(()=> {
        fetch('https://auth.synapse-crm.com/api/countries')
        .then( res => res.json() )
        .then( res => setData(res.data) )
    }, [])


  return (
    <div className='mt-11 relative lg:static max-w-7xl items-center mx-auto px-4 sm:px-6 flex flex-col' >
        
        {/* Container */}
        <Formik initialValues={{ email: '', phoneNumber: '', country: '', state: '', city: '', position: '', address: '', birth_date: '' }}
        onSubmit={(values)=> {
            dispatch(updateProfileData({token: userData.token, backup_email: userData.email , ...values }))
        }}>
            {({values, ...props}) => (
                <Form className='w-full' >
        <div>
        <div className='flex w-full justify-between items-center  mb-8' >
            <div className='flex flex-col justify-start w-full ' >
                <div className='hidden sm:flex items-center' >
                    <p className='hidden sm:inline-flex text-sm font-medium text-[#6B7280]' >Cuenta</p>
                    <ChevronRightIcon className='hidden sm:inline-flex h-5 w-5 text-[#6B7280]' />
                    <p className='hidden sm:inline-flex text-sm font-medium ' >Perfil</p>
                </div>
                <div className='flex items-center' >
                    <ArrowLeftIcon onClick={() => navigate(-1) } className='sm:hidden w-6 h-6 mr-4 text-pink' />
                    <h2 className='mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate' >Editar perfil</h2>
                </div>
            </div>
            <div className='flex' >
                <button type='button' onClick={()=> navigate(-1)} className="hidden  sm:inline-flex justify-center px-4 py-2 border border-[#6B7280] shadow-sm text-sm font-medium rounded-[5px] text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"  ><span className='text-[#6B7280]' >Volver</span></button>

                <button type='submit' className='ml-6 px-4 py-2 bg-pink text-white rounded-[5px]' >Guardar</button>
            </div>
        </div>
            <div className="md:grid md:grid-cols-1 md:gap-6">
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="shadow-custom sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6 ">
                        <h2 className="text-lg font-medium">Informaci??n personal</h2>
                        <p className='text-sm text-[#808080] mb-4' >Informaci??n personal del usuario</p>
                    <div className="grid sm:grid-cols-2 gap-6">

                        <div className="flex flex-col">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-[#111827]">
                            Correo electr??nico
                        </label>
                        <Field
                            maxLength="255"
                            type="text"
                            name="email"
                            id="email"
                            autoComplete="email"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full  sm:w-4/5 shadow-sm sm:text-sm border-[#D1D5DB] rounded-md"
                        />
                        </div>

                        <div className="flex flex-col">
                        <label htmlFor="phoneNumber" className="block sm:w-4/5 sm:self-end text-sm font-medium text-gray-[#111827]">
                            Tel??fono
                        </label>
                        <Field
                            maxLength="15"
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            autoComplete="tel"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-4/5 sm:self-end shadow-sm sm:text-sm border-[#D1D5DB] rounded-md"
                        />
                        </div>

                        <div className="flex flex-col">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-[#111827]">
                            Pa??s
                        </label>
                        <Field className="hidden"  name="country" />

                            <select
                            onChange={(e) => {
                                props.setFieldValue("country", e.target.value)
                            }}
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="mt-1 block w-full sm:w-4/5 py-2 px-3 border border-[#D1D5DB] bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value={''} >Seleccione un pa??s</option>
                                    { data.map( el => { return( <option  key={el.id} value={el.id} >{el.name}</option>) }) }
                        </select>
                        </div>
                        <div className="flex flex-col">
                        <label htmlFor="state" className="sm:w-4/5 sm:self-end block text-sm font-medium text-gray-[#111827]">
                            Estado
                        </label>
                        <Field
                            maxLength="20"
                            type="text"
                            name="state"
                            id="state"
                            autoComplete=""
                            className=" sm:self-end mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-4/5 shadow-sm sm:text-sm border-[#D1D5DB] rounded-md"
                        />
                        </div>
                        <div className="flex flex-col">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-[#111827]">
                            Ciudad
                        </label>
                        <Field
                            maxLength="20"
                            type="text"
                            name="city"
                            id="city"
                            autoComplete=""
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-4/5 shadow-sm sm:text-sm border-[#D1D5DB] rounded-md"
                        />
                        </div>
                        <div className="flex flex-col">
                        <label htmlFor="position" className="sm:w-4/5 sm:self-end block text-sm font-medium text-gray-[#111827]">
                            Posici??n
                        </label>
                        <Field
                            maxLength="30"
                            type="text"
                            name="position"
                            id="position"
                            autoComplete=""
                            className="sm:w-4/5 sm:self-end mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-[#D1D5DB] rounded-md"
                        />
                        </div>
                        <div className="flex flex-col mt-4 mb-4">
                        <label htmlFor="birth_date" className="text-sm sm:w-4/5 font-medium text-gray-[#111827]">
                            Fecha de nacimi??nto
                        </label>
                        <Field
                            type="date"
                            name="birth_date"
                            id="birth_date"
                            className="mt-1 sm:w-4/5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-[#D1D5DB] rounded-md"
                        />
                    </div>
                    </div>
                    
                    <div className="col-span-3">
                  <label htmlFor="addres" className="block text-sm font-medium text-gray-700">
                    Direcci??n
                  </label>
                  <Field className="hidden" name='address' />
                    <div className="mt-1">
                        <textarea
                        maxLength="100"
                        onChange={(e)=> props.setFieldValue("address", e.target.value)}
                        id="addres"
                        name="addres"
                        rows={3}
                        className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        defaultValue={''}
                        />
                    </div>
                </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-[#111827]">Photo</label>
                        <div className="mt-1 flex items-center">
                        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path className='text-[#c3c3c3]' d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                        <button
                        onClick={ () => {
                            dispatch(onProfilePicOpen())
                        }}
                            type="button"
                            className="ml-5 bg-white py-2 px-3 border border-[#D1D5DB] rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Subir
                        </button>
                        </div>
                    </div>
                    </div>
                </div>

            </div>
            </div>
        </div>
                </Form>
            )}

        </Formik>
                <ModalImg/>
    </div>
  )
}


