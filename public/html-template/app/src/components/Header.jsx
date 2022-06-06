import React, { useEffect, useState } from 'react'
import { FiBell } from 'react-icons/fi'
import { getUser } from '../helpers/getUser'

import { CustomLink } from './custom-link'
import { Logo } from './icons/Logo'
import { Toggle } from './Toggle'

export const Header = () => {

  const [user, setUSer] = useState({ image: '', name: '' , position: '' })

  useEffect(() => {
    getUser().then( res => {
      setUSer({ image: res.image || 'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png', name: res.name || 'John Doe' , position: res.position || 'la posicion no fue especificada' })
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
    <header className='fixed h-20 w-[100vw] px-11 bg-[#ffffff] dark:bg-darkmode-black-02 pt-4 shadow-md'>
        <nav className='flex  items-center justify-between' >
            <div className='flex items-center' >
              <Logo/>
            </div>
            <div className='flex items-center justify-between flex-grow-1/2' >
                { links.map( el => { return <CustomLink key={el.id} to={el.src}> {el.name} </CustomLink>})}
            </div>
            <div className='flex-grow-[0.2] justify-between flex items-center' >
              <Toggle/>
              <FiBell className='text-[2rem] dark:text-white' />
              <div>
                <p className='text-black font-semibold dark:text-white' >{user.name}</p>
                <small className='text-gray-light dark:text-soft-gray' > {user.position} </small>
              </div>
              <div className='w-12 h-12 rounded-full overflow-hidden '>
                <img className='w-full h-full' src={user.image} alt="Foto de perfil" />
              </div>
            </div>
        </nav>
    </header>
  )
}
