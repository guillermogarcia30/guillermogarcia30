// Tailwind UI things
import { Fragment, useEffect, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
// Synapse logo
import { Logo } from './icons/Logo'
import { BsTriangleFill } from 'react-icons/bs'

import { getUser } from '../helpers/getUser'
import { useSelector } from 'react-redux'


const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Teams', href: '#', current: false }
]
const userNavigation = [
  { name: 'Perfil', href: '/profile' },
  { name: 'Configuración', href: '/profile/configuration' },
  { name: 'Cerrar sesión', signOut: true  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Header = () => {

  const img = useSelector( state => state.user.image )
  const [user, setUSer] = useState({ image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png', name: 'Edward Colmenarez' , position: 'programador fontend' })

    useEffect(() => {
    getUser().then( res => {
      if(!res.error){}
      setUSer({ image: res.user.profile_image || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png', name: res.user.name || 'John Doe' , position: res.user.position || 'la posicion no fue especificada' })
    } )

  }, [img])

  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
            'bg-white shadow-custom shadow-sm lg:static lg:overflow-y-visible'
          )
        }
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 ">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                  <div className="flex-shrink-0 flex items-center">
                    <Link to={'/profile'}>
                      <Logo/>
                    </Link>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:max-w-md md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Search"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                  <a
                    href="#"
                    className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </a>

                  {/* Profile dropdown */}
                  <Menu as="div" className="flex-shrink-0 relative ml-5">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <div className='hidden lg:flex flex-col mr-4' >
                          <h4 className='text-[1.0625rem] text-right' >{user.name}</h4>
                          <p className='text-[#6A6A6A] uppercase text-[0.5625rem] text-left' >{user.position}</p>
                        </div>
                        <span className="sr-only">Open user menu</span>
                        <div className='relative'  >
                          <img className="h-11 w-11 rounded-full" src={user.image} alt="" />
                          <div className='w-2 h-2 absolute top-0 left-[29px]  bg-green rounded-full' ></div>
                          <div className='flex items-center rotate-[179deg] absolute text-[.5rem] right-[-15px] top-0 bottom-0 margin-[auto]' ><BsTriangleFill className='dark:text-white' /></div>
                        </div>
                      </Menu.Button>
                    </div>
                    
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                        {userNavigation.map((item, i) => {
                          if(item.signOut){
                      return (
                            <Menu.Item key={i}>
                            <a onClick={() => {
                              document.getElementById('logout-form')?.submit()
                            }}
                            className="block rounded-md py-2 px-3 text-base text-[#6A6A6A] hover:bg-soft-gray "
                            >
                              {item.name}
                            </a>
                          </Menu.Item>

                      )
                    }else{
                      return (
                        <Menu.Item key={item.name}>
                            <Link
                            to={item.href}
                          className="block rounded-md py-2 px-3 text-base text-[#6A6A6A] hover:bg-soft-gray "
                        >
                          {item.name}
                        </Link>
                    </Menu.Item>
                      )
                    }
                        })}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
                      'block rounded-md py-2 px-3 text-base font-medium'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                  <div className="flex-shrink-0">
                    <div className='relative' >
                      <img className="h-10 w-10 rounded-full" src={user.image} alt="" />
                      <div className='w-2 h-2 absolute top-0 left-[29px]  bg-green rounded-full' ></div>
                    </div>
                  </div>
                  <div className='flex flex-col ml-4' >
                          <h4 className='text-base text-right' >{user.name}</h4>
                          <p className='text-[#6A6A6A] uppercase text-[0.5625rem] text-left' >{user.position}</p>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                  {userNavigation.map((item, i) => {
                    
                    if(item.signOut){
                      return (
                        <a key={i} href='#'  onClick={() => {
                          document.getElementById('logout-form')?.submit()
                        }} >{item.name}</a>
                      )
                    }else{
                      return (
                        <Link
                      key={i}
                      to={item.href}
                      className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                      )
                    }
                    
                  })}
                </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  )
}








// import React, { useEffect, useState, useRef } from 'react'
// import { Link } from "react-router-dom"


// import { getUser } from '../helpers/getUser'
// import { useSelector } from 'react-redux'


// import { CustomLink } from './custom-link'
// import { Logo } from './icons/Logo'

// import { Toggle } from './Toggle'

// // Icons
// import { FiBell } from 'react-icons/fi'
// import { BsTriangleFill } from 'react-icons/bs'
// import { BiLogOut } from 'react-icons/bi'
// import { GiHamburgerMenu } from 'react-icons/gi'
// import { MenuAppIcon } from './icons/MenuAppIcon'
// import { AiOutlineClose } from 'react-icons/ai'

// export const Header = () => {
//   const menu = useRef()
  
//   const img = useSelector( state => state.user.image )
//   const [user, setUSer] = useState({ image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png', name: '' , position: '' })
//   const [ dropdownView, setDropDownView] = useState(false)
//   const [ dropdownView2, setDropDownView2] = useState(false)
//   useEffect(() => {
//     /**
//      * Alert if clicked on outside of element
//      */

//       function handleClickOutside(event) {
//         if (menu.current && !menu.current.contains(event.target)) {
//           setDropDownView(false);
//         }
//       }
//       // Bind the event listener
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         // Unbind the event listener on clean up
//         document.removeEventListener("mousedown", handleClickOutside);
//       };

//   }, [dropdownView]);
//   useEffect(() => {
//     getUser().then( res => {
//       if(!res.error){}
//       setUSer({ image: res.user.profile_image || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png', name: res.user.name || 'John Doe' , position: res.user.position || 'la posicion no fue especificada' })
//     } )

//   }, [img])

//   const links = [{
//                   id: 1, src: '/home', name: 'Dashboard'
//                 }, 
//                 {
//                   id: 2, src: '/team', name: 'Team'
//                 },
//                 {
//                   id: 3, src: '/proyecto', name: 'Proyecto'
//                 },
//                 {
//                   id: 4,src: '/calendario', name: 'Calendario'
//                 }]
//   return (
//     <header className='fixed z-[100] pb-4 w-[100vw] px-11 lg:px-40 xl:px-52 bg-[#ffffff] dark:bg-darkmode-black-02 pt-4 shadow-custom'>
//         <nav className='flex  items-center justify-between' >
          
//             <div className='lg:flex hidden items-center' >
//               <button className=' mr-[60px] focus-visible:outline-none focus-visible:border-none' ><MenuAppIcon/></button>
//               <Logo/>
//             </div>
//             <div className='flex relative lg:hidden justify-between w-20' >
//               <button className='focus-visible:outline-none focus-visible:border-none' onClick={() => setDropDownView(!dropdownView)} >{ !dropdownView ? <GiHamburgerMenu className='text-[#8E8E8E] text-[1.2rem]' /> : <AiOutlineClose className='text-[#8E8E8E] text-[1.2rem]' /> }</button>
//               {/* Menu movil */}
//               {
//                   dropdownView2 && (
//                     <div  className="lg:hidden fixed w-[100vw] top-[65px] left-[1px]  bg-white shadow-custom dark:bg-darkmode-black-02">
//                       {
//                         links.map( (el, i) => { return (
//                           <div key={i} className='flex items-center justify-between px-2 py-3 cursor-pointer' >
//                               <CustomLink  onClick={() => setDropDownView(!dropdownView2)} to={el.src}>{el.name}</CustomLink>
//                           </div>
//                         ) } )
//                       }
//                       <div className='ml-3 flex items-center relative border-t-2 border-solid border-t-gray-border pt-4' >
//                         <div className='w-10 h-10 rounded-full overflow-hidden mb-2'>
//                           <img className='w-full h-full' src={user.image} alt="Foto de perfil" />
//                         </div>
//                         <div className='ml-4 leading-[20px] flex flex-col items-start' >
//                           <p className='text-black font-semibold dark:text-white' >{user.name}</p>
//                           <small className='text-gray-light dark:text-soft-gray' > {user.position}</small>
//                         </div>

//                         <div className='w-2 h-2 absolute top-[15px] left-[29px]  bg-green rounded-full' ></div>
//                       </div>
//                       <div>
//                         <Link onClick={() => setDropDownView(!dropdownView)} to={'/profile'} className='ml-3 lg:ml-0 font-medium focus-visible:outline-none text-gray-light' >Perfil</Link>
//                       </div>
//                       <div onClick={()=>{
//                         document.getElementById('logout-form').submit()
//                       }} className='flex items-center justify-between px-2 py-3 cursor-pointer' >
//                         <div className='flex justify-between w-[4rem] items-center ml-1'  >
//                           <p className='text-gray-light' >Salir</p>
//                           <BiLogOut className='text-gray-light' />
//                         </div>
//                       </div>
//                   </div>
//                   )
//                 }
//               <div className='flex w-8  items-center' >
//                 <img className='h-full' src="https://auth.synapse-crm.com/assets/favicon.png" alt="" />
//               </div>
//             </div>
            
//             <div className='hidden lg:flex items-center justify-between flex-grow-1/2' >
//                 { links.map( el => { return <CustomLink key={el.id} to={el.src}> {el.name} </CustomLink>})}
//             </div>
//             <div className='lg:flex-grow-[0.2] flex-grow-[0.5] justify-between flex items-center' >
//               <button className='mr-3 lg:hidden' ><MenuAppIcon/></button>
//               <Toggle/>
//               <button className='relative' >
//                 <FiBell className='text-[1.5rem] dark:text-white' />
//                 <div className='w-2 h-2 absolute top-0 right-[2px]  bg-red rounded-full' ></div>
//               </button>
//               <div className='hidden lg:block leading-[12px]' >
//                 <p className='text-black font-semibold dark:text-white' >{user.name}</p>
//                 <small className='text-gray-light dark:text-soft-gray' > {user.position} </small>
//               </div>
//               <div className='relative' >
//                 <Link to={'/profile'} >
//                   <div className='w-10 h-10 rounded-full overflow-hidden '>
//                     <img className='w-full h-full' src={user.image} alt="Foto de perfil" />
//                   </div>
//                 </Link>
//                 <button ref={menu} onClick={() => { setDropDownView(!dropdownView)}} className='hidden lg:block rotate-[179deg] absolute text-[.5rem] right-[-15px] top-0 bottom-0 margin-[auto]' ><BsTriangleFill className='dark:text-white' /></button>
//                 {/* Dropdown Desktop*/}
//                 {
//                   dropdownView && (
//                     <div  className="hidden lg:block fixed w-36 top-[65px] lg:right-[140px] semi-l:right-[150px] xl:right-[190px]  bg-white shadow-custom dark:bg-darkmode-black-02">
//                     <div onClick={()=>{
//                       document.getElementById('logout-form').submit()
//                     }} className='flex items-center justify-between px-2 py-3 cursor-pointer' >
//                       <p>Cerrar sesión</p>
//                       <BiLogOut/>
//                     </div>
//                   </div>
//                   )
//                 }
//                 <div className='w-2 h-2 absolute top-0 right-[2px]  bg-green rounded-full' ></div>
                
//               </div>
              
//             </div>
//         </nav>
//     </header>
//   )
// }
