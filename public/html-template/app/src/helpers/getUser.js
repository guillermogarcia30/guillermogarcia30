

const url = 'https://auth.synapse-crm.com/api/user/me'


export async function getUser() {
   await window.cookieStore.get('access_token').then( res => {
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
               return res.authorized_apps
             }
             else{
               console.log('Algo salio mal', res)
             }
           })
           .catch( err => console.error(err) )
    })

    
}
