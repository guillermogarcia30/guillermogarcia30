

const url = 'https://auth.synapse-crm.com/api/user/me'


export async function getUser() {
  let result = await window.cookieStore.get('access_token').then( res => {
        let headersList = {
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Accept": "application/json",
            "Authorization": `Bearer ${res.value}`
           }
           
      let result = fetch(url, { 
             method: "GET",
             headers: headersList
           }).then( res => res.json())
            .then( res => {
             if (!res.error) {
               return res
             }
             else{
               console.log('Algo salio mal', res)
             }
           })
           .catch( err => console.error(err) )

           return result
    })

    return result
}
