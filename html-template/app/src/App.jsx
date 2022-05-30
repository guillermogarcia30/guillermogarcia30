import './App.css';
import { Header } from './components/Header'
import { Copyright } from './components/copyright'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './views/dashboard';
function App() {
  document.documentElement.classList.add('light')
  return (
    <div className='bg-soft-gray dark:bg-darkmode-black-01 relative' >
      <Header/>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
      </Routes>
      <Copyright/>
    </div>
  );
}

export default App;
