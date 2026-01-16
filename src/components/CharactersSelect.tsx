import { useEffect } from "react"
import { useCharacterStore, type Character } from "../store"
import { getAllCharacters } from "../utils/api"

export default function CharacterSelect(){

    const { allCharacters, setAllCharacters, setCharacter, character } = useCharacterStore()

    useEffect(() => {
        getAllCharacters().then(res => {
            if(res.length > 0){
                setAllCharacters(res)
            }
        })
    },[setAllCharacters])


    return(
        <>
            <select value={character?.id ?? ""} onChange={(e) => { 
                const id = Number(e.target.value)
                const selected = allCharacters.find(c => c.id === id)
                if(selected) setCharacter(selected)
            }}>
                {
                    allCharacters.map(character => {
                        return <option key={character.id} value={character.id}>{character.name}</option>
                    })
                }
            </select>
        </>
    )
}