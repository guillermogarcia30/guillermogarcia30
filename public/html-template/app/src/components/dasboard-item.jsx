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
    <div ref={ref} className='relative lg:static z-0 duration-500 px-16 mb-10 shadow-custom rounded-[10px] py-[2rem] lg:px-[2rem] w-full bg-[#ffffff] dark:bg-darkmode-black-02 flex flex-col lg:flex-row lg:justify-between items-center' >
        <div className='xl:min-w-[20rem] md:min-w-[9rem] lg:min-w-[12rem]  semi-l:min-w-[15rem] lg:pr-4 semi-l:pr-12 lg:border-r-2 lg:border-solid lg:border-r-gray-border w-fit flex flex-col lg:flex-row items-center' >
            <div className='lg:w-12 lg:h-12 w-16 h-16 mb-4 lg:mb-0' >
                <img className='w-full h-full' src={logo} alt={title} />
            </div>
                <h3 className='dark:text-[#ffffff] font-semibold text-lg lg:ml-5 semi-l:ml-16 max-w-[12rem] mb-4 lg:mb-0' >{title}</h3>
        </div>
        <div className='break-all min-w-[13rem] lg:pr-4 semi-l:pr-12 lg:w-40 semi-l:w-auto lg:border-r-2 lg:border-solid lg:border-r-gray-border' >
            <h4 className='text-dark-blue text-sm lg:text-base text-center lg:text-left dark:text-darkmode-blue-01 font-semibold' >{token}</h4>
            <p className='dark:text-[#ffffff] text-sm lg:text-base text-center lg:text-left' >Secret: {decodeSecret}</p>
        </div>
        <div className='lg:static absolute top-3 right-3' >
            {status ? (<p className='text-[.8rem] px-2 py-1 rounded-[20px] bg-green-light text-green font-medium' >Activo</p>) : (<p className='text-[.8rem] px-2 py-1 rounded-[20px] bg-red-light text-red font-medium'>Inactivo</p>)}
        </div>
        <div className='hidden lg:block' >
            <button onClick={() => onAppRemove(id, B_token)} className='bg-pink px-2 py-2 rounded-[10px] mr-[25px] '><BiTrash className='text-white' /></button>
            <button onClick={() => onAppEdit(title, token, fabricante, website, appurls, secret) } className='bg-blue px-2 py-2 rounded-[10px]' ><FiEdit className='text-white'/></button>     
        </div>
        <div className='lg:hidden flex items-center justify-between w-52 px-8 mt-9' >
            <button onClick={() => onAppEdit(title, token, fabricante, website, appurls, secret) } className='bg-blue px-2 py-2 rounded-[10px]' ><FiEdit className='text-white text-[1.4rem] lg:text-base'/></button>     
            <button onClick={() => onAppRemove(id, B_token)} className='bg-pink px-2 py-2 rounded-[10px] '><BiTrash className='text-white text-[1.4rem] lg:text-base ' /></button>
        </div>
    </div>
  )
}
