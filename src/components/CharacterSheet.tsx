import { useCharacterStore } from "../store"

type StatKey = "skill" | "stamina" | "luck" | "gold"

const stats: { label: string; key: StatKey }[] = [
    { label: "Skill", key: "skill" },
    { label: "Stamina", key: "stamina" },
    { label: "Luck", key: "luck" },
    { label: "Gold", key: "gold" },
]
    
export default function CharacterSheet() {

    const { character } = useCharacterStore()
    
    return(
        <>
          <p>Current Character: {character?.name}</p>
        
            <div style={{textAlign: 'left'}}>
                {
                    stats.map(stat => {
                        return <div>
                            {stat.label}: 
                            <button>-</button>
                            {character[stat.key]}
                            <button>+</button>
                        </div>
                    })
                }
            </div>
        </>
    )
}