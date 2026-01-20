import { useCharacterStore } from "../store"
import { updateCharacterFromBattle } from "../utils/utilityFunctions";

type StatKey = "skill" | "stamina" | "luck" | "gold"

const stats: { label: string; key: StatKey }[] = [
    { label: "Skill", key: "skill" },
    { label: "Stamina", key: "stamina" },
    { label: "Luck", key: "luck" },
    { label: "Gold", key: "gold" },
]

export default function CharacterSheet() {

    const { character, setCharacter } = useCharacterStore()

    function updateStat(key: StatKey, value: number) {
        const updatedCharacter = { ...character, [key]: value }
        setCharacter(updatedCharacter)
        updateCharacterFromBattle(updatedCharacter)
    }

    return (
        <>
            <p>Current Character: {character?.name}</p>

            <div className="stat-list">
                {
                    stats.map(stat => {
                        return <div key={stat.key} className="stat-row">
                            {stat.label}:
                            <div>
                                <button className="stat-btn" onClick={() => updateStat(stat.key, (character[stat.key] - 1))}>-</button>
                                <span style={{margin: '0 10px'}}>{character[stat.key]}</span>
                                <button onClick={() => updateStat(stat.key, (character[stat.key] + 1))}>+</button>
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}