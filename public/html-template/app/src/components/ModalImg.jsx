import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useDropzone } from 'react-dropzone'

import { onProfilePicClose } from '../store/modals/modalEditSlice'
import { changeProfilePicture } from '../store/user/thunks'


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
              
              let url = new URL(reader.result)
              setImg(file)
              setUrl(url)
            }
            reader.readAsDataURL(file)
          })
      }, [])

    const { getRootProps, getInputProps } = useDropzone({onDrop})
      

  return (
    <div className={view ? 'bg-black-transparent w-[100vw] h-[100vh] fixed top-0 bottom-0 right-0 left-0 m-[auto]': 'hidden'} >
        <div className='w-[25rem] h-[27rem] bg-white dark:bg-darkmode-black-02 absolute top-0 bottom-0 right-0 left-0 m-[auto] ' >
            <div {...getRootProps()} draggable="true" className='h-[20rem] relative   ' >
                    <img className='w-full h-full brightness-[.6]' src={ !url ? userData.image : url } alt="imagen de perfil" />
                    <label className=' text-white text-2xl text-center px-12 absolute top-0 bottom-0 right-0 left-0 m-[auto] h-fit cursor-pointer ' htmlFor="file">Carga una imagen o arrastra una +</label>
                    <input {...getInputProps()} className='w-0' id='file' type="file" accept="image/png, image/gif, image/jpeg" />
            </div>
            <div className='flex justify-between items-center py-10 px-8' >
                <button onClick={() => dispatch(onProfilePicClose())} className='w-[40%] bg-[#ffffff] border border-solid rounded-[10px] font-semibold px-3 py-2 dark:bg-darkmode-black-02 dark:text-[#ffffff] dark:border-pink' > Cancelar </button>
                <button onClick={() => {
                  setUrl('')
                  dispatch(changeProfilePicture('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NjgwYWY4Yi1mM2UwLTRkZmItODE4Zi00NmE3ZDEwZjA2ZmEiLCJqdGkiOiI1YmFlYTU4Zjk0MTAxODcwZDUwNGJmZThjZmU1NmQ3MzcwM2M0NDdhZDc1ZGJlOWY2ZDFmMDIxOGZjOWY5NzM1YWU3MGU4NDBkZDA1MjVmMiIsImlhdCI6MTY1NDc5NzE1MC43MzY0MDgsIm5iZiI6MTY1NDc5NzE1MC43MzY0MTIsImV4cCI6MTY1NTQwMTk1MC43MzAxMjgsInN1YiI6Ijk3OTFiNWJiLTNkN2QtNGJhZS1iZGViLTQxOWJhNDg5ZTRlMCIsInNjb3BlcyI6W119.Ihu7zAwSjx88uu4GZVpGHZnvLighWTLnuwX2lLpcY5uv_Gu08KwN1zigQ-9ZRc1kMYsdD37rXC3Cq9Ie7zUniXWwYkBAxFl4MPpd8g0r0fM3-5PaT01bAa98L9I4yE73yaVvP3YZSxHB59FmcULcjcDwA2nkPjhW0NSIYOph5s9ZtWOVzAl9jhs-EE2pkl2kbUXuZJenLd4ROo4GOO19wtEVevnkJ3I22n3XrzPTGg0xABAK1JJHtJ3kxQ5tYL_ZfJ2XW-LbalUdw_LtN7ergqqOFjcyFdMLhSVCNE-f0ud7LX8C1VZ5oWya_OxPe3wdsYlMtbJZ-oZ1S7fBP0lKEpTvBikJupcRo4L3UwZn-fhv2WxWj7n5pnYyuRsI3VdQn4tLs5GLF4xFI5jq9gegEYLqc3_Ij8CFcYRXEwv2CcQtUFwLlvPEzNDTdcgYFrjtgyt6yGuZ3r_AkugmwfQgewbEO_EJDh0zKPHQeheg329RCtAuMaakvsKyKn-AmfNMIEZrUzBQbB7h_VhcOIa-bjiCFadR0QMYKm2cNM1bRkXqnOeQsn1ciNDoDfATK7b7Mv-e9pING6zj7xK3Uytng_AH3xzrIlUFmXj3PtEi985fIkeCLC6AVVRkufriwQ1nGV6dz4b9qloYYUXhhrjUp8pkGGE4XSPqzJL3V0LAwEE', img))
                  }} className='w-[40%] bg-pink text-white rounded-[10px] font-semibold px-3 py-2' > Guardar </button>
            </div>
        </div>
    </div>
  )
}
