import './App.css'
import CharacterSelect from './components/CharacterComponents/CharactersSelect';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import BattleSheet from './components/BattleComponents/BattleSheet';

function App() {

  return (
    <>
    <main className='app'>
      
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/select' element={<CharacterSelect />}/>
        <Route path='/battle' element={<BattleSheet />}/>
      </Routes>

    </main>
    </>
  )
}

export default App
