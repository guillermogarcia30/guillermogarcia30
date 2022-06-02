const url = 'https://auth.synapse-crm.com/api/user/me'

export async function getUser() {
    window.cookieStore.get('access_token').then( res => {
        let headersList = {
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Accept": "application/json",
            "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NjcyNTc1OS03M2M0LTQ1YmUtYjFiYi0xNzk4M2ZlOTA1ODAiLCJqdGkiOiJiMjBiNWY5YzA0YzUzMDAxZmI5MjI4NDUzZmNjZDNlYWVhM2M4OWNmN2YzOWIyYWEyMTBmYTI1YWY2MDRjNTFlMzI3MDA0OTMzMTI0MDE5MiIsImlhdCI6MTY1NDE3OTI5Ny40NTQ3MzUsIm5iZiI6MTY1NDE3OTI5Ny40NTQ3MzgsImV4cCI6MTY2OTk5MDQ5Ny40NTE1MzEsInN1YiI6ImUzNWY2NmI4LWUyZTQtNDQyNy05OGZiLTdmNjI3MDViN2Q4NCIsInNjb3BlcyI6W119.GGGDD7xC7og43LEwVe0yuuLPP5PZNfRSqp3JntivEy9lqUU1O1kTX_3P5lMKbbK6-BIQvgZ3HSFnFWzdY_Q99ZEGT1qBgl_p57UYclwRKcE5dfSDGS2v54nftJotDpB865slEB_DyujIC_3_4PtOT7gi_yb6iaqIfk3SI7F4H7nrrkYetPRL3HGI_shfYggLg-qEVfXNJeNTXRnT9oVH-MfMN0l4oO3mteqLOytV-Nar_ZbLWbM4zKq1yaF2_Z6NP9we89GBRl6LLL5iVCKz85Qu41Kxl1KMeNYztCxmIri9eWHZNEHvTAoiv4B_-Z1c0bRsVcghT-lEoS2VGask3LQ7tlNEWqgWzBaI0Of8SRrGeT8BurVz10JhsEH29BLpDV9IYqF-AA-rKm9v2E4nU3dB80691JipoowJesn2JuKaDsSWnH6gjKL7Kd1ma6_px681xXxqbP13OaGShl1MOlOarMMgx3adFh6jZ6qawZ7X6fcbKF_lraeaqMoVA-AyZai8q8o1FzMTVpdxNZmxPluI1KXjGSFrd4EJygukHtpr0sRmaFDGwj7mI1CCar__3dommsTdifnVBW8gNvdJINJFQPmWW31qoGIlvM7d-a7x1_IC-gbm-U663wGRSRqCDy1nvKPcI7YkQ1rrlel9lhZsaFzvoTTD03bNE846aZM`
           }
           
           fetch("https://auth.synapse-crm.com/api/user/me", { 
             method: "GET",
             headers: headersList
           }).then(function(response) {
             return response.text();
           }).then(function(data) {
            //  window.cookieStore.delete('access_token')
             console.log(data);
           })
    })
    // 
    // fetch(url, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Accept':'application/json'
    //     }
    // })
    //     .then(res => res.json())
    //     .then( res => console.log(res) )

    
}
