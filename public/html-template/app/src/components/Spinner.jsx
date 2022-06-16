import React from 'react'

import { useSelector } from 'react-redux'

export const Spinner = () => {
    const view = useSelector( state => state.user.loadingChange ) 
  return (
<div  className={view ? 'loader' : 'hidden'} >
        <div>
            <div className="loader__item"></div>
            <div className="loader__item"></div>
            <div className="loader__item"></div>
            <div className="loader__item"></div>
        </div>
    </div>
  )
}
