import React from 'react'
import { CgProfile } from 'react-icons/cg'

import { CustomLink } from './custom-link'
import { Logo } from './icons/Logo'
import { Toggle } from './Toggle'

export const Header = () => {
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
    <header className='fixed w-[100vw] px-11 bg-[#ffffff] dark:bg-darkmode-black-02 pt-4 shadow-md'>
        <nav className='flex  items-center justify-between' >
            <div className='flex items-center' >
              <Logo/>
            </div>
            <div className='flex items-center justify-between flex-grow-1/2' >
                { links.map( el => { return <CustomLink key={el.id} to={el.src}> {el.name} </CustomLink>})}
            </div>
            <div className='w-40 justify-between flex items-center' >
              <Toggle/>
              <CgProfile className='w-12 h-12 dark:text-[#ffffff] cursor-pointer' /> 
            </div>
        </nav>
    </header>
  )
}
