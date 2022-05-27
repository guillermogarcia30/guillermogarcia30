import React from 'react'

import { AiOutlinePlus, AiFillEye } from 'react-icons/ai'
import { MdOutlineFileCopy } from 'react-icons/md'

export const ModalAPlicaciones = ({view, hide, id = "189da1-gfsaf-1561f-gfh1561"}) => {

  return (
    <div style={view ?{display: 'flex'}:{display: 'none'}} className='justify-end bg-black-transparent z-50 absolute top-0 bottom-0 left-0 right-0 m-[0 auto]' >
        <div className='bg-white dark:bg-darkmode-black-02 w-[40rem] h-full px-16 py-12' >
            <h2 className='dark:text-white text-[2rem] font-semibold' >Crear una aplicacion</h2>
            <div className='flex' >
                <div className='p-4 bg-dark-blue dark:text-darkmode-blue-01 rounded-full mr-3' >
                    <AiOutlinePlus className='text-white text-[3rem] ' />
                </div>
                <div>
                    <input className='dark:focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-white focus-visible:outline-none mb-[.4rem] border-b border-b-gray-border' type="text" placeholder='Nombre de la app' />
                    <p className='dark:text-white' >Client ID</p>
                    <p className='text-dark-blue dark:text-darkmode-blue-01 font-medium' >{id}</p>
                </div>
            </div>
            <form className='py-12' action="">
                <div className='flex flex-col w-full' >
                    <label className='mb-2 text-dark-blue dark:text-darkmode-blue-01 font-normal' htmlFor="fabricante" >Fabricante</label>
                    <input className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-white rounded px-3 py-2 mb-8 border-2 border-gray-border' id='fabricante' type="text" />
                </div>
                <div className='flex flex-col w-full' >
                    <label className='mb-2 text-dark-blue dark:text-darkmode-blue-01 font-normal' htmlFor="sitioweb" >Sitio web</label>
                    <input className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-white rounded px-3 py-2 mb-8 border-2 border-gray-border' id='sitioweb' type="text" />
                </div>
                <div className='relative flex flex-col w-full' >
                    <div className='flex justify-between' >
                        <label className='mb-2 text-dark-blue dark:text-darkmode-blue-01 font-normal' htmlFor="secret" >Secret</label>
                        <button className='text-red' >Regenerar</button>
                    </div>
                    <input className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-white rounded px-3 py-2 mb-8 border-2 border-gray-border' id='secret' type="text" />
                    <div className='w-12 flex justify-between absolute right-[1.25rem] bottom-[2.75rem]' >
                        <button className='text-gray-light text-[1.2rem]' ><MdOutlineFileCopy/></button>
                        <button className='text-gray-light text-[1.2rem]' ><AiFillEye/></button>
                    </div>
                </div>
                <div className='flex flex-col w-full' >
                    <label className='mb-2 text-dark-blue dark:text-darkmode-blue-01 font-normal' htmlFor="appurl" >App url</label>
                    <input className='dark:focus-visible:outline-none focus-visible:outline-none dark:bg-darkmode-black-02 dark:text-white rounded px-3 py-2 border-2 border-gray-border' id='appurl' type="text" />
                    <button className='text-red mb-8 text-right' >+ Agregar</button>
                </div>
            </form>
        <div className='flex justify-between' >
            <button className='w-[45%] bg-red text-white rounded-[10px] font-semibold px-3 py-2' onClick={hide} >Volver</button>
            <button className='w-[45%] bg-dark-blue text-white rounded-[10px] font-semibold px-3 py-2' >Guardar</button>
        </div>
        </div>
    </div>
  )
}
