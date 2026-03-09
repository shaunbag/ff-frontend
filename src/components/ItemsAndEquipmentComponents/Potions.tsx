import { useState, useRef, useEffect } from 'react';
import { useCharacterStore } from '../../store';
import { deletePotion, getPotionsByCharacterId } from '../../utils/api';
import ItemModal from './ItemModal';
import type { Item } from '../../utils/Types';
import { updateCharacterStats } from '../../utils/utilityFunctions';

export default function Potions() {

    const { potions, setPotions, character, setCharacter } = useCharacterStore();
    const [showItemModal, setShowItemModal] = useState<boolean>(false);
    const characterRef = useRef(character);

    useEffect(() => {
        getPotions()
        characterRef.current = character
    }, [character])

    function deletePotionFromList(id: number) {
        deletePotion(id).then(res => {
            console.log(res)
        }).finally(() => {
            getPotions()
        })
    }

    function getPotions() {
        console.log('Getting Equipment For Character: ', characterRef.current.id)
        getPotionsByCharacterId(characterRef.current.id).then(res => {
            setPotions(res)
        })
    }

    async function usePotion(item: Item) {
            await deletePotion(item.id)
            switch (item.skill) {
            case 'Skill':
                const updateSkill = { ...character, skill: character.skill + (item.bonus ?? 0) }
                setCharacter(updateSkill)
                break;
            case 'Stamina':
                const updateStamina = { ...character, stamina: character.stamina + (item.bonus ?? 0) }
                setCharacter(updateStamina)
                break;
            case 'Luck':
                const updateLuck = { ...character, luck: character.luck + (item.bonus ?? 0) }
                setCharacter(updateLuck)
                break;
        }
    }

    return (
        <div>
            <h3>Potions</h3>
            <div>
                <button onClick={() => setShowItemModal(true)} style={{ margin: 10 }}>Add Item</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Effect</td>
                        <td>DELETE</td>
                        <td>USE</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        potions.map(item => {
                            return <tr key={item.name + item.id}>
                                <td>{item.name}</td>
                                <td>{item.effect}</td>
                                <td><button onClick={() => deletePotionFromList(item.id)}>DELETE</button></td>
                                {
                                    item.givesBonus && <td><button onClick={() => {
                                        usePotion(item).then(() => {
                                            updateCharacterStats(characterRef.current)
                                        })
                                    }}>
                                        USE
                                    </button></td>
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
            {
                showItemModal && (
                    <ItemModal ItemType='potion' setShowItemModal={setShowItemModal} updateItems={getPotions} />
                )
            }
        </div>
    )
}