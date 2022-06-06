import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react';



import { getUser } from './helpers/getUser'

import { useDispatch } from 'react-redux'
import { addApp, clearApps } from './store/apps/appsSlice' 
import { seTtoken, setUserData } from './store/user/userSlice'

import { Profile } from './views/Profile';
import { Dashboard } from './views/dashboard';
import { Header } from './components/Header'
import { Copyright } from './components/copyright'

function App() {
  const appTheme = () => {
    const theme = localStorage.getItem('theme')
    if (!theme) {
      return document.documentElement.classList.add('light')
    }
    else {
      return document.documentElement.classList.add(theme.toString())
    }
  }
  const dispatch = useDispatch()

  useEffect(function(){
    appTheme();
    getUser().then( res => {

      if(!res.error){
        
      dispatch(clearApps())
      
      dispatch(seTtoken({ token: res.token }))
      dispatch(setUserData({ email: res.email, tenant: res.tenant_id, name: res.name, birthDAte: res.birth_date, adress: res.adress, phone: res.phone, position: res.position, image: res.image, ciudad: res.city, pais: res.country_name }))


      let headersList = {
        "Accept": "application/json",
        "Authorization": `Bearer ${res.token}`,
        "Content-Type":"application/json"
       }

      fetch('https://auth.synapse-crm.com/api/apps', {
       method: 'GET',
       headers: headersList
      }).then( res => res.json() )
        .then( res => {
          res.data.map( el => {
            dispatch( addApp({
              logo: el.image || 'https://www.worldartfoundations.com/wp-content/uploads/2022/04/placeholder-image.png',
              title: el.name, 
              token: el.id,
              secret: el.secret, 
              status: el.revoked === 0 ? true : false, 
              fabricante: el.maker || 'Desconocido',
              appurls: el.redirect || "https://" ,
              website: el.website || 'No posee un sito web',
              id: el.id
            }) )
          })
        } )
      }
      else console.log(res)
    });
  }, [dispatch])

    


  return (
    <div className='bg-soft-gray dark:bg-darkmode-black-01 relative' >
      <Header/>
      <Routes>
        <Route path='/home' element={<Dashboard/>} />
        <Route path='/' element={<Profile/>} />
      </Routes>
      <Copyright/>
    </div>
  );
}

export default App;