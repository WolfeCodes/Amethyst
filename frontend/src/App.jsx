import './App.css'
import ListDonutComponent from './components/ListDonutComponent'
import HeaderComponent from './components/HeaderComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeComponent from './components/HomeComponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<HomeComponent />}></Route>
          <Route path='/menu' element={<ListDonutComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
