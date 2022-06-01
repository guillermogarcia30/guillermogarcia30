
let url = 'https://auth.synapse-crm.com/api/apps/'
export const createApp = ({applicationName, appurls, fabricante, secret, website, client_id}) => {
    let appsLinks = ''
    let token = await window.cookieStore.get('access_token').then( res => {return res.value})
    for (let i = 0; i < appurls.length; i++) {
        if (i === 0) {
            
            appsLinks = appurls[i].appurl
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

    console.log(JSON.stringify(body))

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json'
        },
        body: JSON.stringify(body)
    }).then( res => res.json() )
        .then(res => console.log(res))

}