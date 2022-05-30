import React, {useState} from 'react'
import { DasboardItem } from '../components/dasboard-item'

import { ModalAPlicaciones } from '../components/ModalAPlicaciones'
import { Modal } from '../components/modal'

export const Dashboard = () => {

    const items =[{
        logo: 'https://www.pngmart.com/files/16/official-Google-Logo-PNG-Image.png',
        title: 'Google',
        token: '8965tegr451f2w62',
        secret: '********5488',
        status: true,
    },
    {
        logo: 'https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-3-1.png',
        title: 'Facebook',
        token: '2894fw5a6f45132',
        secret: '********4564',
        status: true,
    },
    {
        logo: 'https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-3.png',
        title: 'Twitter',
        token: '48541csaacdv32546',
        secret: '*********7984',
        status: false,
    },
    {
        logo: 'https://logodownload.org/wp-content/uploads/2020/07/tesla-logo-8.png',
        title: 'Tesla',
        token: '78941014fscdsedf520',
        secret: '********8952',
        status: true,
    }]

    const [show, setShow] = useState(false)
    const [ add, setAdd] = useState(false)
    const handleShowModal = () => {
        setShow( !show )
    }

    const handleShowAndCLoseModal = () => {
        setAdd( !add )
        setShow( !show )

    }

    const handleShowAddedModal = () => {
        setAdd( !add )
    }

  return (
    <div className=' min-h-[95vh] items-center px-40 flex justify-center flex-col' >
        <div className='flex items-center justify-between w-full my-4'>
            <h2 className='text-[2rem] dark:text-white font-semibold' >Aplicaciones</h2>
            <button onClick={handleShowModal} className='bg-red text-white rounded-[10px] font-semibold px-3 py-1' >+ Agregar</button>
        </div>
        {items.map( el => { return( <DasboardItem logo={el.logo} secret={el.secret} status={el.status} title={el.title}  token={el.token} key={el.token} /> ) })}
        <ModalAPlicaciones view={show} hide={handleShowModal} add={handleShowAndCLoseModal} />
        <Modal view={add} hide={handleShowAddedModal} />
    </div>
  )
}
