import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';

import { Dashboard } from './views/dashboard';
import { Header } from './components/Header'
import { Copyright } from './components/copyright'

import { getUser } from './helpers/getUser'

import { useDispatch } from 'react-redux'
import { addApp } from './store/appsSlice' 

function App() {
  var apps;
  const appTheme = () => {
    const theme = localStorage.getItem('theme')
    if (!theme) {
      return document.documentElement.classList.add('light')
    }
    else {
      return document.documentElement.classList.add(theme.toString())
    }
  }
  const [userApps, setUserApss] = useState([])
  useEffect(function(){
    appTheme();
    apps = getUser();
    setUserApss(apps)
  }, [])
  if (userApps.length) {
    useDispatch(addApp(userApps))
  }

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