import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListDonutComponent from './components/ListDonutComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ListDonutComponent />
    </>
  )
}

export default App
