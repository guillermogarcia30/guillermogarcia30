import { onErrorOpen, onProfilePicClose } from '../modals/modalEditSlice'
import { setUserImg } from './userSlice'

const imgUpdateUrl = 'https://auth.synapse-crm.com/api/user/me/image'



export const changeProfilePicture = (token, image) => {
    
    return async(dispatch) => {
        dispatch( onProfilePicClose() )
        console.log(image)
        if(image)
        {
            let formData = new FormData()
        formData.append("profile_image", image)
        await fetch(imgUpdateUrl, {
            method: 'POST',
            headers : {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: formData
        })
        .then( res => res.json() )
        .then( res => {

            if (!res.error) {
                console.log(res)
                dispatch( onProfilePicClose() )
                dispatch(setUserImg({image: res.image }))
            }else {
                console.log(res)
                dispatch( onProfilePicClose() )
                dispatch(onErrorOpen())                
            }
        } )
        }
    }
}