import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onErrorOpen, setMsg } from '../store/modals/modalEditSlice'

import { useDropzone } from 'react-dropzone'

import { onProfilePicClose } from '../store/modals/modalEditSlice'
import { changeProfilePicture } from '../store/user/thunks'
import { useEffect } from 'react'


export const ModalImg = () => {

    const userData = useSelector( state => state.user )
    const B_token = useSelector(state => state.user.token)
    const view = useSelector( state => state.modal.changeProfilePic )
    const dispatch = useDispatch()

    const [url, setUrl] = useState('')
    const [ img, setImg ] = useState(null)
    


    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
            // Do whatever you want with the file contents
              if(file.size  > 1048576){
                  dispatch(setMsg({ msg: 'La imagen no debe exceder 1mb de tamaño' }))
                return dispatch(onErrorOpen())
              } else if(file.type !== "image/png" && file.type !== "image/jpeg"){
                console.log(file.type)
                dispatch(setMsg({ msg: 'La imagen debe ser de formato JPG o PNG' }))
                return dispatch(onErrorOpen())
              }

              let url = new URL(reader.result)
              setImg(file)
              setUrl(url)
            }
            reader.readAsDataURL(file)
          })
      }, [])

 

          



    const { getRootProps, getInputProps } = useDropzone({onDrop})
      

  return (
    <div className={view ? 'bg-black-transparent z-[100] w-[100vw] h-[100vh] fixed top-0 bottom-0 right-0 left-0 m-[auto]': 'hidden'} >
        <div className='max-w-[25rem] min-w-[1rem] h-[27rem] bg-white dark:bg-darkmode-black-02 absolute top-0 bottom-0 right-0 left-0 m-[auto] ' >
            <div {...getRootProps()} draggable="true" className='h-[20rem] cursor-pointer relative   ' >
                    <img className='w-full h-full brightness-[.6]' src={ !url ? userData.image : url } alt="imagen de perfil" />
                    <p className=' text-white text-2xl text-center px-12 absolute top-0 bottom-0 right-0 left-0 m-[auto] h-fit cursor-pointer '>Carga una imagen o arrastra una +</p>
                    <input {...getInputProps()} className='w-0' id='file' type="file" accept="image/png, image/gif, image/jpeg" />
            </div>
            <div className='flex justify-between flex-col sm:flex-row items-center py-10 px-8' >
                <button onClick={() => {
                  setUrl('')
                  setImg(null)
                  dispatch(onProfilePicClose())
                  }} className='sm:w-[40%] bg-[#ffffff] border border-solid rounded-[10px] font-semibold px-2 sm:px-3 sm:py-2  dark:bg-darkmode-black-02 dark:text-[#ffffff] dark:border-pink' > Cancelar </button>
                <button onClick={() => {
                  if(!img){
                    dispatch(setMsg({ msg:'Debe ingresar una imagen para poder guardarla'}))
                    return dispatch(onErrorOpen())
                  }
                  setUrl('')
                  dispatch(changeProfilePicture(B_token, img))
                  }} className='sm:w-[40%] px-2 mt-4 sm:mt-0 bg-pink text-white rounded-[10px] font-semibold sm:px-3 sm:py-2' > Guardar </button>
            </div>
        </div>
    </div>
  )
}
