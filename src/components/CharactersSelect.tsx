import { useEffect } from "react"
import { useCharacterStore } from "../store"
import { getAllCharacters, deleteCharacter } from "../utils/api"
import { useNavigate } from "react-router-dom"

export default function CharacterSelect() {

    const { allCharacters, setAllCharacters, setCharacter, character } = useCharacterStore()
    const history = useNavigate()

    useEffect(() => {
        getAllCharactersFromServer()
    }, [setAllCharacters])

    function getAllCharactersFromServer() {
        getAllCharacters().then(res => {
            if (res.length > 0) {
                setAllCharacters(res)
            }
        })
    }

    function selectCharacter(id: number) {
        const selected = allCharacters.find(c => c.id === id)
        if (selected) setCharacter(selected)
    }

    function deleteCharacterFromSavedCharacters(id: number) {
        deleteCharacter(id).then(() => {
            getAllCharactersFromServer()
        })
    }

    return (
        <>
        <h2>Selected Character: {character.name}</h2>
        <button onClick={() => history('/')}>BACK</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Select</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allCharacters.map(character => {
                            return <tr key={character.id}>
                                <td>{character.name}</td>
                                <td><button onClick={() => selectCharacter(character.id)}>SELECT</button></td>
                                <td><button onClick={() => deleteCharacterFromSavedCharacters(character.id)}>DELETE</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}