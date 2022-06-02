import { useDispatch } from 'react-redux'
import { addApp } from '../store/appsSlice' 

const url = 'https://auth.synapse-crm.com/api/user/me'


export async function getUser() {
    window.cookieStore.get('access_token').then( res => {
        let headersList = {
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Accept": "application/json",
            "Authorization": `Bearer ${res.value}`
           }
           
           fetch(url, { 
             method: "GET",
             headers: headersList
           }).then((res) => {
             return res.json();
           }).then((res) => {
             window.cookieStore.delete('access_token')
             if (!res.error) {
               res.authorized_apps.map( el => {
                 useDispatch(addApp({
                  logo: el.image || '',
                  title: el.name, 
                  token: el.id,
                  secret: el.secret, 
                  status: el.status === 0 ? true : false, 
                  id: el.token
                 }))
               })
             }
           })
    })

    
}
