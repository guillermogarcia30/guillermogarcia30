import { removeApp } from "./appsSlice"
import { onSuccesOpen, onErrorOpen } from '../modals/modalEditSlice'
import { addApp, clearApps } from '../apps/appsSlice'


const urlDelete = 'https://auth.synapse-crm.com/api/apps/'
const urlUpdate = 'https://auth.synapse-crm.com/api/apps/'
const urlCreate = 'https://auth.synapse-crm.com/api/apps/'
const imgurl = 'https://auth.synapse-crm.com/api/apps/image/'


// Eliminar aplicacion
export const deleteAppAsync = (id, token) => {
    return async(dispatch) => {
        fetch(`${urlDelete}${id}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${ token}`,
                "Content-Type": "application/json"
            }
        })
        .then( res => res.json() )
        .then( res => { 
            console.log(res)
            dispatch(removeApp({ id }))
        } )
        .catch( err => console.log(err))       
    }
}

// Actualizar aplicacion
export const updateAppAsync = ({applicationName, appurls, fabricanteEdit, secretEdit, websiteEdit, client_id, image, token}) => {
    return async(dispatch) => {
        let appsLinks = ''
    for (let i = 0; i < appurls.length; i++) {
        if (i === 0) {
            
            appsLinks = `${appurls[i].appurl}`
        }
        else{
            appsLinks = appsLinks.concat(`,${appurls[i].appurl}`)
        }
        
    }

    const body = {
        name: applicationName,
        maker: fabricanteEdit,
        website: websiteEdit,
        secret: secretEdit,
        redirect: appsLinks
    }


        let headersList = {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
           }
        fetch(`${urlUpdate}${client_id}`, {
            method: 'PUT',
            headers: headersList,
            body: JSON.stringify(body)
        })
        .then( res => res.json() )
        .then( res => {
                
                if(!res.error){
                    if(!image){
                        dispatch( clearApps() )
                        res.data.map( el => {
                            
                            dispatch( addApp({
                              logo: el.image || 'https://www.worldartfoundations.com/wp-content/uploads/2022/04/placeholder-image.png',
                              title: el.name, 
                              token: el.id,
                              secret: el.secret, 
                              status: el.revoked === 0 ? true : false, 
                              fabricante: el.maker || 'Desconocido',
                              appurls: el.redirect || "https://" ,
                              website: el.website || 'No posee un sito web',
                              id: el.id
                            }) )
                          })
                    dispatch(onSuccesOpen())
                }
                }
                else {
                    if(!image){
                    dispatch(onErrorOpen())
                }
                }
            });

        if (image) {
            const formData = new FormData()
            formData.append("image", image)
            fetch(`${imgurl}${client_id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept':'application/json',
                    "Content-Type": "application/json"
                },
                body: formData
            }).then( res => res.json() )
              .then(res => { 
                   console.log(res)
                  if(!res.error){
                      dispatch( clearApps() )
                    res.data.map( el => {
                        dispatch( addApp({
                          logo: el.image || 'https://www.worldartfoundations.com/wp-content/uploads/2022/04/placeholder-image.png',
                          title: el.name, 
                          token: el.id,
                          secret: el.secret, 
                          status: el.revoked === 0 ? true : false, 
                          fabricante: el.maker || 'Desconocido',
                          appurls: el.redirect || "https://" ,
                          website: el.website || 'No posee un sito web',
                          id: el.id
                        }) )
                      })
                      dispatch(onSuccesOpen())
                  }
                  else {
                      console.log(res)
                      dispatch(onErrorOpen())
                  }
                });
        }
    }
}

// Crear aplicacion
export const createAppAsync = ({applicationName, appurls, fabricante, secret, website, client_id, image, token}) => {
    return async(dispatch) => {
        let appsLinks = ''
    for (let i = 0; i < appurls.length; i++) {
        if (i === 0) {
            
            appsLinks = `${appurls[i].appurl}`
        }
        else{
            appsLinks = appsLinks.concat(`,${appurls[i].appurl}`)
        }
        
    }

    const body = {
        name: applicationName,
        maker: fabricante,
        website,
        client_id,
        secret,
        redirect: appsLinks
    }


        let headersList = {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
           }
        fetch(urlCreate, {
            method: 'POST',
            headers: headersList,
            body: JSON.stringify(body)
        }).then( res => res.json() )
            .then( res => {
                
                if(!res.error){
                    if(!image){
                        dispatch( clearApps() )
                        res.data.map( el => {
                            
                            dispatch( addApp({
                              logo: el.image || 'https://www.worldartfoundations.com/wp-content/uploads/2022/04/placeholder-image.png',
                              title: el.name, 
                              token: el.id,
                              secret: el.secret, 
                              status: el.revoked === 0 ? true : false, 
                              fabricante: el.maker || 'Desconocido',
                              appurls: el.redirect || "https://" ,
                              website: el.website || 'No posee un sito web',
                              id: el.id
                            }) )
                          })
                    dispatch(onSuccesOpen())
                }
                }
                else {
                    if(!image){
                    dispatch(onErrorOpen())
                }
                }
            });

        if (image) {
            const formData = new FormData()
            formData.append("image", image)
            fetch(`${imgurl}${client_id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept':'application/json',
                    "Content-Type": "application/json"
                },
                body: formData
            }).then( res => res.json() )
              .then(res => { 
                console.log(res)
                if(!res.error){
                    dispatch( clearApps() )
                    res.data.map( el => {
                        
                        dispatch( addApp({
                          logo: el.image || 'https://www.worldartfoundations.com/wp-content/uploads/2022/04/placeholder-image.png',
                          title: el.name, 
                          token: el.id,
                          secret: el.secret, 
                          status: el.revoked === 0 ? true : false, 
                          fabricante: el.maker || 'Desconocido',
                          appurls: el.redirect || "https://" ,
                          website: el.website || 'No posee un sito web',
                          id: el.id
                        }) )
                      })
                    dispatch(onSuccesOpen())
                }
                else {
                    console.log(res)
                    dispatch(onErrorOpen())
                }
              });
        }
    }
}