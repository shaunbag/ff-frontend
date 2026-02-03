import { useCharacterStore } from '../../store'
import { updateCharacterStats } from '../../utils/utilityFunctions';

type StatKey = 'skill' | 'stamina' | 'luck' | 'gold' | 'provisions'

const stats: { label: string; key: StatKey }[] = [
    { label: 'Skill', key: 'skill' },
    { label: 'Stamina', key: 'stamina' },
    { label: 'Luck', key: 'luck' },
    { label: 'Gold', key: 'gold' },
    { label: 'Provisions', key: 'provisions'}
]

export default function CharacterSheet() {

    const { character, setCharacter } = useCharacterStore()

    function updateStat(key: StatKey, value: number) {
        let updatedCharacter;
        if(key === 'provisions'){
            updatedCharacter = {...character, [key]: value, stamina: character.stamina + 4}
        } else {
            updatedCharacter = { ...character, [key]: value }
        }
        
        setCharacter(updatedCharacter)
        updateCharacterStats(updatedCharacter)
    }

    return (
        <>
            <p>Current Character: {character?.name}</p>

            <section className='stat-list'>
                {
                    stats.map(stat => {
                        return <div key={stat.key} className='stat-row'>
                            {stat.label}:
                            <div>
                                <button className='stat-btn' onClick={() => updateStat(stat.key, (character[stat.key] - 1))}>{stat.key === 'provisions' ? 'Use' : '-'}</button>
                                <span style={{margin: '0 10px'}}>{character[stat.key]}</span>
                                <button style={{display: stat.key === 'provisions' ? 'none': 'block'}} onClick={() => updateStat(stat.key, (character[stat.key] + 1))}>+</button>
                            </div>
                        </div>
                    })
                }
            </section>
           
        </>
    )
}