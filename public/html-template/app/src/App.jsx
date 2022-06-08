import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react';



import { getUser } from './helpers/getUser'

import { useDispatch } from 'react-redux'
import { addApp, clearApps, setLoadingFalse } from './store/apps/appsSlice' 
import { seTtoken, setUserData } from './store/user/userSlice'

import { Profile } from './views/Profile';
import { Dashboard } from './views/dashboard';
import { Header } from './components/Header'
import { Copyright } from './components/copyright'
import { ModalPetitionOk } from './components/modalPetitionOk'
import { ModalPetitionWrong } from './components/modalPetitionWrong'

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
      dispatch(setUserData({ email: res.user.email, tenant: res.tenant_id, name: res.user.name, birthDAte: res.user.birth_date, adress: res.user.adress, phone: res.user.phone, position: res.position, image: res.user.image, ciudad: res.user.city, pais: res.user.country_name }))


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
          if (!res.error) {
            res.data.map( el => {
              dispatch( addApp({
                logo: el.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
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
            dispatch( setLoadingFalse() )
          }
          else {
            dispatch( setLoadingFalse() )
          }
        } )
      }
      else {
        console.log(res)
        dispatch( setLoadingFalse() )
      }
    }).catch( dispatch( setLoadingFalse() ) );
  }, [dispatch])

    


  return (
    <div className='bg-white-b dark:bg-darkmode-black-01 relative' >
      <Header/>
      <Routes>
        <Route path='/home' element={<Dashboard/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
      {/* <Copyright/> */}
      <ModalPetitionOk  />
      <ModalPetitionWrong/>
    </div>
  );
}

export default App;