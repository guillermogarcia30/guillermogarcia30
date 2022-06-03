const url = 'https://auth.synapse-crm.com/api/apps/'

export const deleteApp = (id) => {
    window.cookieStore.get('access_token').then( res => {

        let headersList = {
            "Accept": "application/json",
            "Authorization": `Bearer ${res.value}`
           }

        fetch(`${url}${id}`, {
            method: 'DELETE',
            headers: headersList
        }).then( res => res.json() )
            .then( res => console.log(res) )
    } )
    

}