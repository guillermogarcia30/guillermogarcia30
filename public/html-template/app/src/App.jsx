import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react';

import { Dashboard } from './views/dashboard';
import { Header } from './components/Header'
import { Copyright } from './components/copyright'

import { getUser } from './helpers/getUser'

import { useDispatch } from 'react-redux'
import { addApp } from './store/appsSlice' 

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
      console.log(res.authorized_apps)
      console.log(res?.authorized_apps)

    res?.authorized_apps.map( el => {
          dispatch(addApp({
            logo: el.image || '',
            title: el.name, 
            token: el.id,
            secret: el.secret, 
            status: el.status === 0 ? true : false, 
            id: el.id
           }))
        } )
    })
    
    
  }, [])

    


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