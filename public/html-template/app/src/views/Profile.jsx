import React from 'react'

import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

// icons
import { PencilIcon, ChevronRightIcon, ArrowLeftIcon } from '@heroicons/react/solid'

//Profile components
import { ProfileHeader } from '../components/profile/ProfileHeader'
import { TeamList } from '../components/profile/TeamList'
import { ProfileData } from '../components/profile/ProfileData'





const team = [
  {
    name: 'Leslie Alexander',
    handle: 'lesliealexander',
    role: {
      name: 'admin',
      description: 'Admin'
    },
    position: 'Especialista de operaciones',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Michael Foster',
    handle: 'michaelfoster',
    role: {
      name: 'super_admin',
      description: 'SA'
    },
    position: 'Desarrollador Back-end',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Dries Vincent',
    handle: 'driesvincent',
    role: {
      name: 'admin',
      description: 'Admin'
    },
    position: 'Desarrolladora front-end',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    handle: 'lindsaywalton',
    role: {
      name: 'user',
      description: 'user'
    },
    position: 'Diseñadora',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

export const Profile = () => {
  const navigate = useNavigate()
  const userData = useSelector( state => state.user )
  const loading = useSelector( state => state.apps.loading )
  
  const profile = {
    name: userData.name,
    position: userData.position,
    imageUrl: userData.image,
    tenant: userData.tenant,
    tenant_img: userData.tenant_img,
    tenant_name: userData.tenant_name,
    fields: {
      'Correo Electronico': userData.email,
      Telefono: userData.phone,
      'País': userData.country_name,
      'Estado': userData.state,
      'Ciudad': userData.ciudad,
      'Dirección': userData.address,
    },
  }

    if(loading){
            return(
                    <div className="mt-11 max-w-7xl mx-auto px-4">
                      <div  className='flex items-center justify-between mb-10' >
                        <div className='flex flex-col justify-center' >
                          <div className='hidden sm:flex items-center' >
                            <p className='hidden sm:inline-flex text-sm font-medium text-[#6B7280]' >Cuenta</p>
                            <ChevronRightIcon className='hidden sm:inline-flex h-5 w-5 text-[#6B7280]' />
                            <p className='hidden sm:inline-flex text-sm font-medium ' >Perfil</p>
                          </div>
                          <div className="flex items-center">
                            <ArrowLeftIcon onClick={() => navigate(-1)} className='sm:hidden w-6 h-6 text-pink mr-4' />
                            <h2 className='mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate' >Perfil de usuario</h2>
                          </div>
                        </div>
                        <div>
                              <button
                                onClick={()=> navigate('/profile/configuration')}
                                type="button"
                                className="inline-flex justify-center px-4 py-2 border border-[#6B7280] shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                              >
                                <PencilIcon className="-ml-1 text-[#6B7280] mr-2 h-5 w-5" aria-hidden="true" />
                                <Link to={'/profile/configuration'} ><span className='text-[#6B7280]' >Editar</span></Link>
                              </button>
                        </div>
                      </div>
                        <div className="grid sm:grid-cols-profile-2 lg:grid-cols-profile-3  sm:space-x-5">
                        
                          <div className="flex">
                            <img
                              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                              src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                              alt="Tu imagen de perfil"
                            />
                          </div>
                          <div className="items-start sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                            <div className="2xl:block my-auto mx-auto sm:ml-8 xl:ml-8  min-w-0 flex-1">
                              <h1 className="text-2xl text-gray-900 truncate">{profile.name}</h1>
                              <p className='text-xs uppercase text-[#6B6B6B]' >{profile.position}</p>
                            </div>
                          </div>
                        </div>
                    </div>
            )
    }
  
  return (
    <>
      
      <div className="h-full flex">
        
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="lg:hidden">
          </div>
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
              <article className='' >
                {/* Profile header */}
                  <ProfileHeader profile={profile} />
                {/* Description list */}                
                <ProfileData profile={profile} />
                {/* Team member list */}
                <TeamList team={team} />
              </article>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}