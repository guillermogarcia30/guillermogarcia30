import React, { useCallback, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { BiTrash } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'


import { deleteAppAsync } from '../store/apps/thunks'

import { showModal } from '../store/modals/modalEditSlice'



export const DasboardItem = ({logo, title, token, secret = '', status, id, fabricante, website, appurls}) => {

    let a = secret.slice(0, secret.length - 4)
    let b = a.replaceAll(/[a-zA-Z0-9]/g, '*')
    let c = secret.slice(secret.length - 4, secret.length)
    let decodeSecret = `${b}${c}`

    const dispatch = useDispatch()
    const B_token = useSelector(state => state.user.token)
    const ref = useRef()
    // Delete application
    const onAppRemove = useCallback(
        (appId, token) => {
                ref.current.classList.replace('z-10', 'z-[5]')
                ref.current.classList.add('translate-y-[-170px]')
                return setTimeout(()=>{
                    dispatch(deleteAppAsync(appId, token))
                }, 400)
        },
        [dispatch]
      )

    //   Edit application
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
            <p className='dark:text-[#ffffff]' >Secret: {decodeSecret}</p>
        </div>
        <div>
            {status ? (<p className='text-[.8rem] px-2 py-1 rounded-[20px] bg-green-light text-green font-medium' >Activo</p>) : (<p className='text-[.8rem] px-2 py-1 rounded-[20px] bg-red-light text-red font-medium'>Inactivo</p>)}
        </div>
        <div>
            <button onClick={() => onAppRemove(id, B_token)} className='bg-pink px-2 py-2 rounded-[10px] mr-12 md:mr-2 '><BiTrash className='text-white' /></button>
            <button onClick={() => onAppEdit(title, token, fabricante, website, appurls, secret) } className='bg-blue px-2 py-2 rounded-[10px]' ><FiEdit className='text-white'/></button>
            
        </div>
    </div>
  )
}
