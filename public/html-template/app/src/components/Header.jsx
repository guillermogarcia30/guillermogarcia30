import React, { useEffect, useState } from 'react'
import { FiBell } from 'react-icons/fi'
import { BsTriangleFill } from 'react-icons/bs'
import { getUser } from '../helpers/getUser'

import { CustomLink } from './custom-link'
import { Logo } from './icons/Logo'
import { Toggle } from './Toggle'

export const Header = () => {

  const [user, setUSer] = useState({ image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png', name: '' , position: '' })

  useEffect(() => {
    getUser().then( res => {
      if(!res.error){}
      setUSer({ image: res.user.image || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png', name: res.user.name || 'John Doe' , position: res.user.position || 'la posicion no fue especificada' })
      console.log(res)
    } )

  }, [])

  const links = [{
                  id: 1, src: '/home', name: 'Dashboard'
                }, 
                {
                  id: 2, src: '/team', name: 'Team'
                },
                {
                  id: 3, src: '/proyecto', name: 'Proyecto'
                },
                {
                  id: 4,src: '/calendario', name: 'Calendario'
                }]
  return (
    <header className='fixed h-16 w-[100vw] px-11 bg-[#ffffff] dark:bg-darkmode-black-02 pt-4 shadow-md'>
        <nav className='flex  items-center justify-between' >
            <div className='flex items-center' >
              <Logo/>
            </div>
            <div className='flex items-center justify-between flex-grow-1/2' >
                { links.map( el => { return <CustomLink key={el.id} to={el.src}> {el.name} </CustomLink>})}
            </div>
            <div className='flex-grow-[0.2] justify-between flex items-center' >
              <Toggle/>
              <button className='relative' >
                <FiBell className='text-[1.5rem] dark:text-white' />
                <div className='w-2 h-2 absolute top-0 right-[2px]  bg-red rounded-full' ></div>
              </button>
              <div className='leading-[12px]' >
                <p className='text-black font-semibold dark:text-white' >{user.name}</p>
                <small className='text-gray-light dark:text-soft-gray' > {user.position} </small>
              </div>
              <div className='relative' >
                <div className='w-10 h-10 rounded-full overflow-hidden '>
                  <img className='w-full h-full' src={user.image} alt="Foto de perfil" />
                </div>
                <button className='rotate-[179deg] absolute text-[.7rem] right-[-15px] top-[7px]' ><BsTriangleFill/></button>
                <div className='w-3 h-3 absolute top-0 right-[2px]  bg-green rounded-full' ></div>
              </div>
              
            </div>
        </nav>
    </header>
  )
}
