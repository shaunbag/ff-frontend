import { useState } from 'react';
import { useCharacterStore } from '../store';
import CharacterCreationSheet from './CharacterComponents/CharacterCreationSheet';
import CharacterSheet from './CharacterComponents/CharacterSheet';
import { useNavigate } from 'react-router-dom';
import LuckCheckModal from './CheckComponents/LuckCheckModal';
import Equipment from './ItemsAndEquipmentComponents/Equipment';
import Potions from './ItemsAndEquipmentComponents/Potions';
import ProgressTracker from './ProgressComponents/ProgressTracker';

export default function MainPage() {

    const { character, setCharacter } = useCharacterStore();
    const history = useNavigate();
    const [showLuckModal, setShowLuckModal] = useState(false);

    function createNewCharacter() {
        setCharacter({
            id: 0,
            name: '',
            skill: 0,
            stamina: 0,
            luck: 0,
            gold: 0,
        });
    }

    return (
        <>
            <header className='page-header'>
                <h1>Fighting Fantasy Character Tracking</h1>
                <nav className='toolbar'>
                    <button onClick={() => history('/select')}>SELECT A CHARACTER</button>
                    <button onClick={createNewCharacter}>CREATE NEW CHARACTER</button>
                    <button style={{ backgroundColor: 'red' }} onClick={() => history('/battle')}>FIGHT A BATTLE</button>
                    <button style={{ backgroundColor: 'green' }} onClick={() => setShowLuckModal(true)}>CHECK LUCK</button>
                </nav>
            </header>
            {
                character.name ? (
                    <>
                        <section className='panel'>
                            <CharacterSheet />
                        </section>
                        <section className='panel'>
                            <Equipment />
                        </section>
                        <section className='panel'>
                            <Potions />
                        </section>
                        <section className='panel'>
                            <ProgressTracker />
                        </section>
                    </>
                ) : (
                    <section className='panel'>
                        <CharacterCreationSheet />
                    </section>
                )
            }
            {
                showLuckModal && (
                    <LuckCheckModal setShowLuckModal={setShowLuckModal} />
                )
            }
        </>
    )
}