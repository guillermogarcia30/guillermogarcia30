const url = 'https://auth.synapse-crm.com/api/user/me'

export async function getUser() {
    let token = await window.cookieStore.get('access_token').then( res => {return res.value})
    console.log(`${token}`)
    // fetch(url, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Accept':'application/json'
    //     }
    // })
    //     .then(res => res.json())
    //     .then( res => console.log(res) )

    let headersList = {
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Accept": "application/json",
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NjcyNGExMy01ZjdiLTQ1OTAtYjNiNi1hZmM2ZjkxZjEwYzEiLCJqdGkiOiI2MTdiNjk0MDQwYmJjZDllMzI1YjM2Y2M3M2VjZWFmZTcwNWQ3N2MwYTAxY2NkOTI1MmUyOTY0MjE5NzM3YjQ3MjI0YjU5ODg1YmY4Y2FiNSIsImlhdCI6MTY1NDE3NzQzMy41NzEyNDMsIm5iZiI6MTY1NDE3NzQzMy41NzEyNDUsImV4cCI6MTY2OTk4ODYzMy41NjQzMDksInN1YiI6IjY5ZTUyYmRjLTRlY2YtNDI3MC1hM2ZiLTZkNGVjZDJlNTVkMCIsInNjb3BlcyI6W119.OOQv_alY945kjyXcdijC2npZczTJ1CeZHTOJ9UkYzJey2xcKBAHfDv850iFZsvuJIoUKf3lu8A7x1UuWt2sjb1jtS8aOHKnj8xzP079S_CHb0AdSlyyjdkKgcvo5LJD4eI220VN1ujFYc69gKo4Bv2nIBATLJpL0HUtfzbLanOkH78PtGwbZlf3ge-nmpaZj1vATJsa47K-oOLBt1qh2MPT4OX0B41Stif1PtEJ0iRD7xO2NO47wRV_sjE1c7vQdTag9gydT7T9QukAgQpaWzNDVquF8ZfM6LN8erVpKp1PQ8j_mNoWyrfFSOZ5n1pxD4HNMJb_39mU7YGs2VqQ6tcD7e40mNpdJe77ZYSaiZPQgXVvPvkvjAs-Hic49fm5qkSJ5BcTxfsuQLUqdlaw6Gxbtggj9_KdjeA2BeUVPXHRxX1UzNiyYxMvuVtY5XdEP5a4y-RJcNgu4QVjtxUpAzdxm-34pZwwwsDryaIab1rvmci0vKkqYX-U9r3_ISB1s8p701n2PajvY95dlDGGVaqH6LXgG6FuT_epzYHUJMTbwHp_gyw1p_QVklM40N8ZHO0A_UMyI9ECOoMfLww8wSBPbBxysJMxYqevv2zNvwMkF9yGC1tVKo17Vc33vWmFAf1pm6DEm_UFRNwUUJXL_cCTZ4Hu1HCxXGfHUXChZtpo"
       }
       
       fetch("https://auth.synapse-crm.com/api/user/me", { 
         method: "GET",
         headers: headersList
       }).then(function(response) {
         return response.text();
       }).then(function(data) {
         console.log(data);
       })
}
