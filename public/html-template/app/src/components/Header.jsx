// Tailwind UI things
import { Fragment, useEffect, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
// Synapse logo
import { Logo } from './icons/Logo'
// Other icons
import { BsTriangleFill } from 'react-icons/bs'
import { MenuAppIcon } from '../components/icons/MenuAppIcon'

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
        {({ open, ...props }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 ">
              <div className="relative flex justify-between lg:gap-8 xl:flex">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                  <div className="flex-shrink-0 flex items-center">
                    <Link to={'/profile'}>
                      <Logo/>
                    </Link>
                    <button><MenuAppIcon/></button>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0">
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
                <div className="hidden lg:flex lg:items-center lg:justify-end">
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
                            <a className="block rounded-md py-2 px-3 text-base text-[#6A6A6A] hover:bg-soft-gray " href='#' onClick={() => {
                              document.getElementById('logout-form')?.submit()
                            }}
                            
                            >
                              {item.name}
                            </a>
                          </Menu.Item>

                      )
                    }else{
                      return (
                        <Menu.Item key={item.name}>
                            <Link
                            onClick={()=> props.close()}
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
                    onClick={()=> props.close()}
                    key={item.name}
                    to={item.href}
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
                        <a key={i} href='#'  
                        className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        onClick={() => {
                          document.getElementById('logout-form')?.submit()
                        }} >{item.name}</a>
                      )
                    }else{
                      return (
                        <Link
                        onClick={()=> props.close()}
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