const url = 'https://auth.synapse-crm.com/api/user/me'

export async function getUser() {
    let token = await window.cookieStore.get('access_token').then( res => {return res.value})

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json'
        }
    })
        .then(res => res.json())
        .then( res => console.log(res) )
}
