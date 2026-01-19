import './App.css'
import CharacterSelect from './components/CharactersSelect';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import BattleSheet from './components/BattleSheet';

function App() {

  return (
    <>
    <main>
      
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/select' element={<CharacterSelect />}/>
        <Route path='battle' element={<BattleSheet />}/>
      </Routes>

    </main>
    </>
  )
}

export default App
