

const url = 'https://auth.synapse-crm.com/api/user/me'


export async function getUser() {
  //  await window.cookieStore.get('access_token').then( res => {
        let headersList = {
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Accept": "application/json",
            "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NjcyZTBjMS02ODdmLTQ3OGEtYmZmMy01NDFmMTA2ZDMwZTIiLCJqdGkiOiI5ZGRhYjY2YzA2OGMyY2ZlOWI1YmQxNDBlNTc3MWI1ODY3YTg0MGQ4OWIzZTk2ZDY3MTdiMDdmNTU4Y2U4NzUwMjExYTI4MjJlODFlNmY5MyIsImlhdCI6MTY1NDIwMTUwMS43Mzc3MDcsIm5iZiI6MTY1NDIwMTUwMS43Mzc3MSwiZXhwIjoxNjcwMDEyNzAxLjczNDQ0LCJzdWIiOiIyNWYxZGJkYS1mZDVhLTQyZTYtOWM0Mi04MTFhYmZiNDMwYmMiLCJzY29wZXMiOltdfQ.GDtSl2tz6z8EooiAPfp3gnvyshjzItKLm-gx0D04CE_jpnzseFd51giEymqPbcvF7xgiujrhZNiZ9ivwlZ7eUp_WhCfg_MacBvU4aVWCNpJxJVKNMOzgJ_avJvcsj2MAqQUeYKZzq_2afeTH4StJqF2X3h_tK5T7a28uJpioBgotCATwoAvhoxK_UaljcZfWug2i7i3-peaSFH_fKVbhEdTPIENkexwsOSM4cTZE-4DDRBKOWuBnc5IlZgMX7b0--YpUNcgxT_b8KjCkUp_Z0cRycrLtE6JNAkBJqeuOoVK914LU7z_Pp4gUtSNv-Rw_9w_RjgCNhw2m3jo5Qhmjoz2ReN_xUceCq4mcqApXE50r9cwviOPbz6HD3YDIjoobQvuBAGFiOQ7h2g_VagmrzWzdZ8HfcrakxvByzLPmpJsvV_NsRc8LMMkApoSBRhhj9aqGPVDFeE8yvk9BsVm2t7FVts5tDoUnHeitAYN6AS-PNu5VxHIdnyRZEcgjm3L8QqGuVOYCtEWYWm6hkbcAYtG0xPSny0AxFW6jP4jsEVISr9-YWDDGN_WyB5WWmZ7c_zL52gA1_wGGI7aSdIgqNG42T0W1o2gHudQvexXIL2fNXJjW3p0TMvkCjmkZY-11M_43QGl6b5Dt3OUIEarIOOd62cqXSsBVlJuvDAmq41k`
           }
           
      let result = await fetch(url, { 
             method: "GET",
             headers: headersList
           }).then( res => res.json())
            .then( res => {
             window.cookieStore.delete('access_token')
             if (!res.error) {
               console.log('pasa la prueba')
               return res
             }
             else{
               console.log('Algo salio mal', res)
             }
           })
           .catch( err => console.error(err) )

           return result
    // })

    
}
