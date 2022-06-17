import React from 'react'

export const TeamList = ( { team } ) => {
  const roleData = {
    'admin': 'text-[#00C537] bg-[#D2FAD1]',
    'super_admin': 'text-[#FFD914] bg-[#FAEFD1]',
    'user': 'text-[#063A5F] bg-[#D1E9FA]'
  }

  
  return (
    <>
            <div className="mt-16 max-w-7xl mx-4 sm:mx-6 lg:px-8 lg:mx-8  pb-12">
                  <h2 className="text-sm font-medium text-gray-500">Equipo</h2>
                  <p className='text-[#808080] mb-4' >Miembros de mi equipo</p>
                  <div className="mt-1 grid md:grid-cols-3 lg:grid-cols-4 gap-4 sm:grid-cols-2">
                    {team.map((person) => (
                      <div key={person.handle} className='bg-white rounded-lg px-2 shadow-custom' >
                        <div
                          
                          className="relative  px-6 pb-3 pt-5 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                        >                          
                          <div className="flex-1 min-w-0">
                            <a href="#" className="focus:outline-none">
                              <span className="absolute inset-0" aria-hidden="true" />
                              <p className="text-sm font-medium text-gray-900 truncate">{person.name}</p>
                              <p className="text-xs text-[#808080] truncate">{person.position}</p>
                            </a>
                        
                          </div> 
                          <div className={`${roleData[person.role.name]} rounded-lg px-2`} >
                              <p className='capitalize text-sm' >{person.role.description}</p>
                          </div>
                            
                          <div>
                            </div>                     
                          <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
                          </div>

                        </div>
                        <div className='border-t  border-t-[#808080] grid grid-cols-2 mt-4' >
                            <button className='p-1 text-[#808080] border-r border-r-[#808080] ' >Llamar</button>
                            <button className='p-1 text-[#808080] border-l border-l-[#808080]' >Correo</button>
                          </div>
                      </div>
                    ))}
                  </div>
                </div>
    </>
  )
}
