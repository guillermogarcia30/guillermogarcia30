import React, { useCallback, useRef } from 'react'

import { useDispatch } from 'react-redux'
import { BiTrash } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'

import { deleteApp } from '../helpers/deleteApp'


import { removeApp } from '../store/appsSlice'
import { showModal } from '../store/modalEditSlice'



export const DasboardItem = ({logo, title, token, secret, status, id, fabricante, website, appurls}) => {


    const dispatch = useDispatch()
    const ref = useRef()
    const onAppRemove = useCallback(
        (appId) => {
                ref.current.classList.replace('z-10', 'z-[5]')
                ref.current.classList.add('translate-y-[-170px]')
                return setTimeout(()=>{
                    deleteApp(appId)
                    dispatch(removeApp({ id: appId }))
                }, 400)
        },
        [dispatch]
      )
    const onAppEdit = useCallback(
        (nombre, id_client, s_fabricante, s_website, s_appurls, s_secret) => {

            dispatch(showModal({ title: nombre, id: id_client, fabricante: s_fabricante, website: s_website, appurls: s_appurls, secret: s_secret }))
        },
        [dispatch]
    )
  return (
    <div ref={ref} className='z-10 duration-500 px-16 mb-10 shadow-lg rounded-[10px] py-[2.5rem] w-full bg-[#ffffff] dark:bg-darkmode-black-02 flex justify-between items-center' >
        <div className='xl:min-w-[20rem] md:min-w-[9rem] lg:min-w-[12rem]  semi-l:min-w-[15rem] pr-12 border-r-2 border-solid border-r-gray-border w-fit flex items-center' >
            <div className='w-12 h-12' >
                <img className='w-full h-full' src={logo} alt={title} />
            </div>
                <h3 className='dark:text-[#ffffff] ml-16 max-w-[12rem]' >{title}</h3>
        </div>
        <div className='min-w-[15rem] pr-12 border-r-2 border-solid border-r-gray-border' >
            <h4 className='text-dark-blue dark:text-darkmode-blue-01 font-semibold' >{token}</h4>
            <p className='dark:text-[#ffffff]' >Secret: {secret}</p>
        </div>
        <div>
            {status ? (<p className='text-[.8rem] px-2 py-1 rounded-[20px] bg-green-light text-green font-medium' >Activo</p>) : (<p className='text-[.8rem] px-2 py-1 rounded-[20px] bg-red-light text-red font-medium'>Inactivo</p>)}
        </div>
        <div>
            <button onClick={() => dispatch(onAppRemove(id))} className='bg-pink px-2 py-2 rounded-[10px] mr-12 md:mr-2 '><BiTrash className='text-white' /></button>
            <button onClick={() => onAppEdit(title, token, fabricante, website, appurls, secret) } className='bg-blue px-2 py-2 rounded-[10px]' ><FiEdit className='text-white'/></button>
            
        </div>
    </div>
  )
}
