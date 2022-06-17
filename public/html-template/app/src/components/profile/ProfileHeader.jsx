import React from 'react'
import { PencilIcon, ChevronRightIcon, ArrowLeftIcon } from '@heroicons/react/solid'
import { Link, useNavigate } from 'react-router-dom'

export const ProfileHeader = ({ profile }) => {

    const navigate = useNavigate()

  return (
    <>
        <div className="mt-11 max-w-7xl   mx-4 px-4 sm:px-6 sm:mx-6 lg:px-8 lg:mx-8">
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
                            src={profile.imageUrl}
                            alt="Tu imagen de perfil"
                          />
                        </div>
                        <div className="items-start sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                          <div className="2xl:block my-auto mx-auto sm:ml-8 xl:ml-8  min-w-0 flex-1">
                            <h1 className="text-2xl text-gray-900 truncate">{profile.name}</h1>
                            <p className='text-xs uppercase text-[#6B6B6B]' >{profile.position}</p>
                          </div>
                          <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                            
                          </div>
                        </div>
                        <div className='my-auto h-full lg:flex lg:flex-col lg:items-end sm:col-start-1 sm:col-end-3 lg:col-start-auto lg:col-end-auto lg:m-auto self-end  min-h-[5rem]' >
                          <div className='flex items-center' >
                            <figure className='w-16 h-16' >
                              <img className='w-full h-full object-contain' src={profile.tenant_img} alt="logo de empresa" />
                            </figure>
                            <h4 className='uppercase ml-4' >{profile.tenant_name}</h4>
                          </div>
                          <p className='text-[#6B6B6B] text-[0.65625rem]' >{profile.tenant}</p>
                        </div>
                      </div>
                  </div>
    </>
  )
}
