import React from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// icons
import { PencilIcon, ChevronRightIcon } from '@heroicons/react/solid'





const team = [
  {
    name: 'Leslie Alexander',
    handle: 'lesliealexander',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Michael Foster',
    handle: 'michaelfoster',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Dries Vincent',
    handle: 'driesvincent',
    role: 'Manager, Business Relations',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    handle: 'lindsaywalton',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

export const Profile = () => {
  const userData = useSelector( state => state.user )
  const profile = {
    name: userData.name,
    position: userData.position,
    imageUrl:
      userData.image,
    fields: {
      'Correo Electronico': userData.email,
      Telefono: userData.phone,
      'País': userData.pais,
      'Estado': userData.state,
      'Ciudad': userData.ciudad,
      'Dirección': userData.address,
    },
  }
  
  return (
    <>
      
      <div className="h-full flex">
        
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="lg:hidden">
          </div>
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">

              <article>
                {/* Profile header */}
                <div  >
                  <div className="max-w-5xl mt-11 mx-auto px-4 sm:px-6 lg:px-8">
                  <div  className='flex items-center justify-between mb-10' >
                    <div className='flex flex-col justify-center' >
                      <div className='flex items-center' >
                        <p className='text-sm font-medium text-[#6B7280]' >Cuenta</p>
                        <ChevronRightIcon className='h-5 w-5 text-[#6B7280]' />
                        <p className='text-sm font-medium ' >Perfil</p>
                      </div>
                      <h2 className='mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate' >Perfil de usuario</h2>
                    </div>
                    <div>
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 border border-[#6B7280] shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                          >
                            <PencilIcon className="-ml-1 text-[#6B7280] mr-2 h-5 w-5" aria-hidden="true" />
                            <Link to={'/profile/configuration'} ><span className='text-[#6B7280]' >Editar</span></Link>
                          </button>
                    </div>
                  </div>
                    <div className=" sm:flex sm:items-end sm:space-x-5">
                    
                      <div className="flex">
                        <img
                          className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                          src={profile.imageUrl}
                          alt="Tu imagen de perfil"
                        />
                      </div>
                      <div className="mt-6 my-auto sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="2xl:block my-auto mx-auto sm:ml-8 xl:ml-8  min-w-0 flex-1">
                          <h1 className="text-2xl text-gray-900 truncate">{profile.name}</h1>
                          <p className='text-xs uppercase text-[#6B6B6B]' >{profile.position}</p>
                        </div>
                        <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Description list */}
                <div className="max-w-5xl mx-auto px-8 py-4 sm:mt-4 sm:rounded-[10px] shadow-custom sm:px-6 lg:px-8 bg-white">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    {Object.keys(profile.fields).map((field) => (
                      <div key={field} className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">{field}</dt>
                        <dd className="mt-1 text-sm text-gray-900">{profile.fields[field]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Team member list */}
                <div className="mt-16 max-w-5xl mx-auto  pb-12">
                  <h2 className="text-sm font-medium text-gray-500">Team members</h2>
                  <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {team.map((person) => (
                      <div key={person.handle} className='bg-white rounded-lg px-6 shadow-custom' >
                        <div
                          
                          className="relative  px-6 pb-3 pt-5 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                        >
                          <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <a href="#" className="focus:outline-none">
                              <span className="absolute inset-0" aria-hidden="true" />
                              <p className="text-sm font-medium text-gray-900">{person.name}</p>
                              <p className="text-sm text-gray-500 truncate">{person.role}</p>
                            </a>
                        
                          </div>
                        
                        </div>
                        <div className='border-t  border-t-[#808080] grid grid-cols-2 mt-4' >
                            <button className='p-2 text-[#808080] border-r border-r-[#808080] ' >Llamar</button>
                            <button className='p-2 text-[#808080] border-l border-l-[#808080]' >Correo</button>
                          </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}