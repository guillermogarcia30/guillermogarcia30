import React, {useState} from 'react'
import { useSelector } from 'react-redux';

import { DasboardItem } from '../components/dasboard-item'
import { ModalAPlicaciones } from '../components/ModalAPlicaciones'
import { ModalAPlicacionesEdit } from '../components/ModalAplicaionesEdit'
import { appsSubscribed } from '../store/apps/appsSlice';

// Icons
import { AiOutlinePlus } from 'react-icons/ai'


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

  return (
    <div className='pt-24 min-h-[100vh] relative lg:static items-center lg:px-40 px-8 flex flex-col' >
        <div className='flex items-center justify-between w-full my-4'>
            <h2 className='text-[2rem] dark:text-[#ffffff] font-semibold' >Aplicación</h2>
            <button onClick={handleShowModal} className='lg:block hidden bg-red text-white rounded-[10px] font-semibold px-3 py-1' >+ Agregar</button>
        </div>
        <div className=' overflow-x-hidden duration-700 w-full min-h-[36.5rem]' >
            { apps.length? (apps.map( (el, i) => {
                 if(i === 0) {
                    return <DasboardItem logo={el.logo} secret={el.secret} status={el.status} title={el.title}  token={el.token} key={el.id} id={el.id} first={true}  appurls={el.appurls} fabricante={el.fabricante} website={el.website} />
                 } else {
                  return <DasboardItem logo={el.logo} secret={el.secret} status={el.status} title={el.title}  token={el.token} key={el.id} id={el.id}  appurls={el.appurls} fabricante={el.fabricante} website={el.website} />
                 }})): (
                     <div className=' flex justify-center items-center h-[5rem] w-full bg-white mt-16 dark:bg-darkmode-black-02 ' >
                         <h3 className='text-center dark:text-white ' >Aun no has añadido Aplicaciones, empieza ahora!!</h3>
                     </div>
                 )}
        </div>
        <ModalAPlicaciones view={show} hide={handleShowModal} add={handleShowAndCLoseModal} />
        <ModalAPlicacionesEdit/>
        <button onClick={handleShowModal} className='lg:hidden absolute bottom-3 right-4 bg-red text-white rounded-full font-semibold px-3 py-3' > <AiOutlinePlus className='text-[3rem]' /> </button>
    </div>
  )
}
