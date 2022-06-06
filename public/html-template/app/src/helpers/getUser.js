

const url = 'https://auth.synapse-crm.com/api/user/me'


export async function getUser() {
  let result = await window.cookieStore.get('access_token').then( res => {
    const auth = res.value
        let headersList = {
            "Accept": "application/json",
            "Authorization": `Bearer ${res.value}`
           }
           
      let result = fetch(url, { 
             method: "GET",
             headers: headersList
           }).then( res => res.json())
            .then( res => {
             if (!res.error) {
               res.token = auth
               return res
             }
             else{
               console.log('Algo salio mal', res)
               return res
             }
           })
           .catch( err => console.error(err) )

           return result
    })

    return result
}
