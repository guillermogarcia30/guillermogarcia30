import './App.css';
import { Header } from './components/Header'
import { Copyright } from './components/copyright'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './views/dashboard';
import {Helmet} from "react-helmet"
import { useEffect } from 'react';


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

  useEffect(()=>{
    appTheme()
  }, [])
  return (
    <div className='bg-soft-gray dark:bg-darkmode-black-01 relative' >
      <Helmet>
                <meta charSet="utf-8" />
                <title>Synapse</title>
      </Helmet>
      <Header/>
      <Routes>
        <Route path='/home' element={<Dashboard/>} />
      </Routes>
      <Copyright/>
    </div>
  );
}

export default App;