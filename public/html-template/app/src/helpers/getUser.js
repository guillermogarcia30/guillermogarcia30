const url = 'https://auth.synapse-crm.com/api/user/me'

export async function getUser() {
    window.cookieStore.get('access_token').then( res => {
        let headersList = {
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Accept": "application/json",
            "Authorization": `Bearer ${res.value}`
           }
           
           fetch("https://auth.synapse-crm.com/api/user/me", { 
             method: "GET",
             headers: headersList
           }).then(function(response) {
             return response.json();
           }).then(function(data) {
             window.cookieStore.delete('access_token')
             console.log(data);
           })
    })

    
}
