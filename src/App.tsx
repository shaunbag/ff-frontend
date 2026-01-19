import './App.css'
import CharacterSelect from './components/CharactersSelect';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';

function App() {

  return (
    <>
    <main>
      
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/select' element={<CharacterSelect />}/>
      </Routes>

    </main>
    </>
  )
}

export default App
