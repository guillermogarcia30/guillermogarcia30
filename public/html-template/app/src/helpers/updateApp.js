const url = 'https://auth.synapse-crm.com/api/apps/'
const imgurl = 'https://auth.synapse-crm.com/apps/image/'

export const updateApp = async({applicationName, appurls, fabricanteEdit, secretEdit, websiteEdit, client_id, image}) => {

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


   await window.cookieStore.get('access_token').then( res => {

        let headersList = {
            "Accept": "application/json",
            "Authorization": `Bearer ${res.value}`,
            "Content-Type": "application/json"
           }
           console.log(JSON.stringify(body))
        fetch(`${url}${client_id}`, {
            method: 'PUT',
            headers: headersList,
            body: JSON.stringify(body)
        }).then( res => res.json() )
            .then( res => console.log(res) )

        if (image) {
            const formData = new FormData()
            formData.append("image", image)
            fetch(`${imgurl}${client_id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${res.value}`,
                    'Accept':'application/json'
                },
                body: formData
            }).then( res => res.json() )
              .then(res => console.log(res))
        }
    } )
}