import { onErrorOpen, onProfilePicClose, setMsg, setChangeOk } from '../modals/modalEditSlice'
import { setUserImg, updateUserData, setPicLoandig } from './userSlice'

const imgUpdateUrl = 'https://auth.synapse-crm.com/api/user/me/image'
const updateUrl = 'https://auth.synapse-crm.com/api/user/me'



export const changeProfilePicture = (token, image) => {
    
    return async(dispatch) => {
        dispatch( setPicLoandig({ok: true}) )
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
            dispatch( setPicLoandig({ok: false}) )
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
            dispatch( setPicLoandig({ok: false}) )
            dispatch(onErrorOpen()) })
        }
    }
}


export const updateProfileData = ({country, city, address, phoneNumber, email, token, backup_email, state, position}) => {

    return async(dispatch) => {

            const tester = new RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
            // const phoneTester = new RegExp(/[0-9]/)
            if( email && !tester.test(email) ){
               dispatch(setMsg({ msg: 'Debe ingresar una dirección de correo valida' }))
               return dispatch(onErrorOpen())
            }
            let body = tester.test(email) ? {
                email,
                phone: phoneNumber,
                address,
                city,
                country,
                state,
                position
            } : {
                email: backup_email,
                phone: phoneNumber,
                address,
                city,
                country,
                state,
                position
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
                    if(res.type === 'already_email'){
                        dispatch(setMsg({ msg: 'Ya existe un correo con esa direccion, por favor intente otro' }))
                    }           
                }
            } )
            .catch( (err) => { 
                console.log(err) 
                dispatch(onErrorOpen()) 
            })
    
    }
}