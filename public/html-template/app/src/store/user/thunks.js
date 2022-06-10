import { onErrorOpen, onProfilePicClose, setChangeOk } from '../modals/modalEditSlice'
import { setUserImg, updateUserData } from './userSlice'

const imgUpdateUrl = 'https://auth.synapse-crm.com/api/user/me/image'
const updateUrl = 'https://auth.synapse-crm.com/api/user/me'



export const changeProfilePicture = (token, image) => {
    
    return async(dispatch) => {
        
        dispatch( onProfilePicClose() )
        console.log('cargando')
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
            console.log('fin de la carga')
            if (!res.error) {
                dispatch( onProfilePicClose() )
                dispatch(setUserImg({image: res.image }))
            }else {
                console.log(res)
                dispatch( onProfilePicClose() )
                dispatch(onErrorOpen())                
            }
        } )
        .catch( err => { 
            console.log(err) 
            dispatch(onErrorOpen()) })
        }
    }
}


export const updateProfileData = ({country, city, address, tlf, email, token, backup_email, state}) => {

    return async(dispatch) => {
        const tester = new RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)

            let body = tester.test(email) ? {
                email,
                phone: tlf,
                address,
                city,
                country,
                state
            } : {
                email: backup_email,
                phone: tlf,
                address,
                city,
                country,
                state
            }

            console.log(body)
            await fetch(updateUrl, {
                method: 'PUT',
                headers : {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            .then( res => res.json() )
            .then( res => {
                if (!res.error) {
                    dispatch( updateUserData({ email: res.data.email, birthDate: res.data.birth_date, address: res.data.address, phone: res.data.phone, ciudad: res.data.city, country: res.data.country_id }) )
                    dispatch( setChangeOk({ok: true}) )
                    
                }else {
                    console.log(res)
                    dispatch(onErrorOpen())                
                }
            } )
            .catch( err => { 
                console.log(err) 
                dispatch(onErrorOpen()) })
    
    }
}