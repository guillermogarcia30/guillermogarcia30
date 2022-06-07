import { onErrorOpen, onProfilePicClose } from '../modals/modalEditSlice'

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
                dispatch( onProfilePicClose() )
                dispatch({image: res.image })
            }else {
                dispatch( onProfilePicClose() )
                dispatch(onErrorOpen())                
            }
        } )
        }
    }
}