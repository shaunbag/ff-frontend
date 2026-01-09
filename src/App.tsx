import { useEffect } from 'react';
import './App.css'
import CharacterCreationSheet from './components/CharacterCreationSheet';
import { useCharacterStore } from './store';

function App() {

  const { character } = useCharacterStore();

  useEffect(() => {
    console.log("Current Character:", character);
  }, [character]);

  return (
    <>
    <main>
      <h1>Fighting Fantasy Character Tracking</h1>
      <p>Current Character: {character?.name}</p>
      {
        character.name ? (
          <div>
            <p>Skill: {character.skill}</p>
            <p>Stamina: {character.stamina}</p>
            <p>Luck: {character.luck}</p>
            <p>Gold: {character.gold}</p>
          </div>
        ) : (
          <CharacterCreationSheet />
        )
      }

    </main>
    </>
  )
}

export default App
