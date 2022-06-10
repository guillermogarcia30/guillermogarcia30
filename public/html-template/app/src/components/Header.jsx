import React, { useEffect, useState, useRef } from 'react'
import { Link } from "react-router-dom"


import { getUser } from '../helpers/getUser'

import { CustomLink } from './custom-link'
import { Logo } from './icons/Logo'

import { Toggle } from './Toggle'

// Icons
import { FiBell } from 'react-icons/fi'
import { BsTriangleFill } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MenuAppIcon } from './icons/MenuAppIcon'
import { AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'

export const Header = () => {
  const menu = useRef()
  
  const img = useSelector( state => state.user.image )
  const [user, setUSer] = useState({ image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png', name: '' , position: '' })
  const [ dropdownView, setDropDownView] = useState(false)
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */

      function handleClickOutside(event) {
        if (menu.current && !menu.current.contains(event.target)) {
          setDropDownView(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };

  }, [dropdownView]);
  useEffect(() => {
    getUser().then( res => {
      if(!res.error){}
      setUSer({ image: res.user.profile_image || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png', name: res.user.name || 'John Doe' , position: res.user.position || 'la posicion no fue especificada' })
    } )

  }, [img])

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
    <header className='fixed z-[100] pb-4 w-[100vw] px-11 lg:px-40 xl:px-52 bg-[#ffffff] dark:bg-darkmode-black-02 pt-4 shadow-custom'>
        <nav className='flex  items-center justify-between' >
          
            <div className='lg:flex hidden items-center' >
              <button className=' mr-[60px] focus-visible:outline-none focus-visible:border-none' ><MenuAppIcon/></button>
              <Logo/>
            </div>
            <div className='flex relative lg:hidden justify-between w-20' >
              <button className='focus-visible:outline-none focus-visible:border-none' onClick={() => setDropDownView(!dropdownView)} >{ !dropdownView ? <GiHamburgerMenu className='text-[#8E8E8E] text-[1.2rem]' /> : <AiOutlineClose className='text-[#8E8E8E] text-[1.2rem]' /> }</button>
              {/* Menu movil */}
              {
                  dropdownView && (
                    <div  className="lg:hidden fixed w-[100vw] top-[65px] left-[1px]  bg-white shadow-custom dark:bg-darkmode-black-02">
                      {
                        links.map( (el, i) => { return (
                          <div key={i} className='flex items-center justify-between px-2 py-3 cursor-pointer' >
                              <CustomLink  onClick={() => setDropDownView(!dropdownView)} to={el.src}>{el.name}</CustomLink>
                          </div>
                        ) } )
                      }
                      <div className='ml-3 flex items-center relative border-t-2 border-solid border-t-gray-border pt-4' >
                        <div className='w-10 h-10 rounded-full overflow-hidden mb-2'>
                          <img className='w-full h-full' src={user.image} alt="Foto de perfil" />
                        </div>
                        <div className='ml-4 leading-[20px] flex flex-col items-start' >
                          <p className='text-black font-semibold dark:text-white' >{user.name}</p>
                          <small className='text-gray-light dark:text-soft-gray' > {user.position}</small>
                        </div>

                        <div className='w-2 h-2 absolute top-[15px] left-[29px]  bg-green rounded-full' ></div>
                      </div>
                      <div>
                        <Link onClick={() => setDropDownView(!dropdownView)} to={'/profile'} className='ml-3 lg:ml-0 font-medium focus-visible:outline-none text-gray-light' >Perfil</Link>
                      </div>
                      <div onClick={()=>{
                        document.getElementById('logout-form').submit()
                      }} className='flex items-center justify-between px-2 py-3 cursor-pointer' >
                        <div className='flex justify-between w-[4rem] items-center ml-1'  >
                          <p className='text-gray-light' >Salir</p>
                          <BiLogOut className='text-gray-light' />
                        </div>
                      </div>
                  </div>
                  )
                }
              <div className='flex w-8  items-center' >
                <img className='h-full' src="https://auth.synapse-crm.com/assets/favicon.png" alt="" />
              </div>
            </div>
            
            <div className='hidden lg:flex items-center justify-between flex-grow-1/2' >
                { links.map( el => { return <CustomLink key={el.id} to={el.src}> {el.name} </CustomLink>})}
            </div>
            <div className='lg:flex-grow-[0.2] flex-grow-[0.5] justify-between flex items-center' >
              <button className='mr-3 lg:hidden' ><MenuAppIcon/></button>
              <Toggle/>
              <button className='relative' >
                <FiBell className='text-[1.5rem] dark:text-white' />
                <div className='w-2 h-2 absolute top-0 right-[2px]  bg-red rounded-full' ></div>
              </button>
              <div className='hidden lg:block leading-[12px]' >
                <p className='text-black font-semibold dark:text-white' >{user.name}</p>
                <small className='text-gray-light dark:text-soft-gray' > {user.position} </small>
              </div>
              <div className='relative' >
                <Link to={'/profile'} >
                  <div className='w-10 h-10 rounded-full overflow-hidden '>
                    <img className='w-full h-full' src={user.image} alt="Foto de perfil" />
                  </div>
                </Link>
                <button ref={menu} onClick={() => { setDropDownView(!dropdownView)}} className='hidden lg:block rotate-[179deg] absolute text-[.5rem] right-[-15px] top-0 bottom-0 margin-[auto]' ><BsTriangleFill className='dark:text-white' /></button>
                {/* Dropdown Desktop*/}
                {
                  dropdownView && (
                    <div  className="hidden lg:block fixed w-36 top-[65px] lg:right-[140px] semi-l:right-[150px] xl:right-[190px]  bg-white shadow-custom dark:bg-darkmode-black-02">
                    <div onClick={()=>{
                      document.getElementById('logout-form').submit()
                    }} className='flex items-center justify-between px-2 py-3 cursor-pointer' >
                      <p>Cerrar sesión</p>
                      <BiLogOut/>
                    </div>
                  </div>
                  )
                }
                <div className='w-2 h-2 absolute top-0 right-[2px]  bg-green rounded-full' ></div>
                
              </div>
              
            </div>
        </nav>
    </header>
  )
}
