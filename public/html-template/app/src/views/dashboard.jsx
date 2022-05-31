import React, {useState} from 'react'
import { useSelector } from 'react-redux';

import { DasboardItem } from '../components/dasboard-item'
import { ModalAPlicaciones } from '../components/ModalAPlicaciones'
import { Modal } from '../components/modal'
import { appsSubscribed } from '../store/appsSlice';

export const Dashboard = () => {

    const apps = useSelector(appsSubscribed)

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
    <div className='pt-24 min-h-[95vh] items-center px-40 flex justify-center flex-col' >
        <div className='flex items-center justify-between w-full my-4'>
            <h2 className='text-[2rem] dark:text-[#ffffff] font-semibold' >Aplicaciones</h2>
            <button onClick={handleShowModal} className='bg-red text-white rounded-[10px] font-semibold px-3 py-1' >+ Agregar</button>
        </div>
        <div className=' overflow-hidden duration-700 w-full min-h-[36.5rem]' >
            {apps.map( (el, i) => {
                 if(i === 0) {
                    return <DasboardItem logo={el.logo} secret={el.secret} status={el.status} title={el.title}  token={el.token} key={el.id} id={el.id} first={true} />
                 } else {
                  return <DasboardItem logo={el.logo} secret={el.secret} status={el.status} title={el.title}  token={el.token} key={el.id} id={el.id} />
                 }})}
        </div>
        <ModalAPlicaciones view={show} hide={handleShowModal} add={handleShowAndCLoseModal} />
        <Modal view={add} hide={handleShowAddedModal} />
    </div>
  )
}
