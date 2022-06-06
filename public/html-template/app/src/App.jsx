import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react';

import { Dashboard } from './views/dashboard';
import { Header } from './components/Header'
import { Copyright } from './components/copyright'

import { getUser } from './helpers/getUser'

import { useDispatch } from 'react-redux'
import { addApp, clearApps } from './store/apps/appsSlice' 
import { seTtoken } from './store/user/userSlice'

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
      if(res){
        
      dispatch(clearApps())
      console.log(res)
      window.cookieStore.get('access_token').then( res => {
        console.log(res)
        dispatch(seTtoken({ token: res.value }))

      } )

      res?.authorized_apps.map( (el) => {
          dispatch(addApp({
            logo: el.extra.image || 'https://www.worldartfoundations.com/wp-content/uploads/2022/04/placeholder-image.png',
            title: el.name, 
            token: el.id,
            secret: el.extra.secret, 
            status: el.extra.status === 0 ? true : false, 
            fabricante: el.extra.maker || 'Desconocido',
            appurls: el.extra.redirect || "https://" ,
            website: el.website || 'No posee un sito web',
            id: el.id
           }))
        } )
      }
    });
  }, [dispatch])

    


  return (
    <div className='bg-soft-gray dark:bg-darkmode-black-01 relative' >
      <Header/>
      <Routes>
        <Route path='/home' element={<Dashboard/>} />
      </Routes>
      <Copyright/>
    </div>
  );
}

export default App;