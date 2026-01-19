import { useCharacterStore } from "../store";
import CharacterCreationSheet from "./CharacterCreationSheet";
import CharacterSheet from "./CharacterSheet";
import { useNavigate } from "react-router-dom";

export default function MainPage() {

    const { character, setCharacter } = useCharacterStore()
    const history = useNavigate()

    function createNewCharacter() {
        setCharacter({
            id: 0,
            name: "",
            skill: 0,
            stamina: 0,
            luck: 0,
            gold: 0,
        })
    }

    return (
        <>
            <h1>Fighting Fantasy Character Tracking</h1>
            <button onClick={() => history('/select')}>SELECT A CHARACTER</button><button onClick={createNewCharacter}>CREATE NEW CHARACTER</button>
            {
                character.name ? (
                    <CharacterSheet />
                ) : (
                    <CharacterCreationSheet />
                )
            }
        </>
    )
}