import React from 'react'

export const ProfileData = ( { profile } ) => {
  return (
    <>
        <div className="mt-11  mx-auto px-4 sm:px-6 lg:px-8 shadow-custom   max-w-7xl  py-4 sm:mt-4 sm:rounded-[10px] bg-white">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            {Object.keys(profile.fields).map((field) => (
            <div key={field} className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">{field}</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile.fields[field]}</dd>
            </div>
                    ))}
          </dl>
        </div>
    </>
  )
}
