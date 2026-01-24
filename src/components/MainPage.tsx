import { useState } from "react";
import { useCharacterStore } from "../store";
import CharacterCreationSheet from "./CharacterCreationSheet";
import CharacterSheet from "./CharacterSheet";
import { useNavigate } from "react-router-dom";
import LuckCheckModal from "./CheckComponents/LuckCheckModal";

export default function MainPage() {

    const { character, setCharacter } = useCharacterStore();
    const history = useNavigate();
    const [showLuckModal, setShowLuckModal] = useState(false);

    function createNewCharacter() {
        setCharacter({
            id: 0,
            name: "",
            skill: 0,
            stamina: 0,
            luck: 0,
            gold: 0,
        });
    }

    return (
        <>
            <header className="page-header">
                <h1>Fighting Fantasy Character Tracking</h1>
                <div className="toolbar">
                    <button onClick={() => history('/select')}>SELECT A CHARACTER</button>
                    <button onClick={createNewCharacter}>CREATE NEW CHARACTER</button>
                    <button style={{backgroundColor: 'red'}} onClick={() => history('/battle')}>FIGHT A BATTLE</button>
                    <button style={{backgroundColor: 'green'}}onClick={() => setShowLuckModal(true)}>CHECK LUCK</button>
                </div>
            </header>
            {
                character.name ? (
                    <section className="panel">
                        <CharacterSheet />
                    </section>
                ) : (
                    <section className="panel">
                        <CharacterCreationSheet />
                    </section>
                )
            }
            {
                showLuckModal && (
                    <LuckCheckModal setShowLuckModal={setShowLuckModal}/>
                )
            }
        </>
    )
}