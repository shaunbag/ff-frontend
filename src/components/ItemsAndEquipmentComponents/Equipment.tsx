import { useEffect, useRef, useState } from 'react';
import { useCharacterStore } from '../../store'
import { deleteEquipment, getEquipmentByCharacterId, updateEquipment } from '../../utils/api';
import ItemModal from './ItemModal';
import type { Item } from '../../utils/Types';
import { updateCharacterStats } from '../../utils/utilityFunctions';

export default function Equipment() {

    const { equipment, setEquipment, character, setCharacter } = useCharacterStore();
    const [showItemModal, setShowItemModal] = useState<boolean>(false);
    const characterRef = useRef(character);

    useEffect(() => {
        getEquipment()
        characterRef.current = character
    }, [character])

    function deleteEquipmentFromList(id: number) {
        deleteEquipment(id).then(res => {
            console.log(res)
        }).finally(() => {
            getEquipment()
        })
    }

    function getEquipment() {
        console.log('Getting Equipment For Character: ', characterRef.current.id)
        getEquipmentByCharacterId(characterRef.current.id).then(res => {
            setEquipment(res)
        })
    }

    async function useEquipment(item: Item) {
        const updatedItem = { ...item, inUse: true }
        await updateEquipment(item.id,updatedItem)
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

    async function unEquipItem(item: Item) {
        const updatedItem = { ...item, inUse: false }
        await updateEquipment(item.id,updatedItem)
        switch (item.skill) {
            case 'Skill':
                const updateSkill = { ...character, skill: character.skill - (item.bonus ?? 0) }
                setCharacter(updateSkill)
                break;
            case 'Stamina':
                const updateStamina = { ...character, stamina: character.stamina - (item.bonus ?? 0) }
                setCharacter(updateStamina)
                break;
            case 'Luck':
                const updateLuck = { ...character, luck: character.luck - (item.bonus ?? 0) }
                setCharacter(updateLuck)
                break;
        }
    }

    return (
        <div>
            <h3>Equipment</h3>
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
                        equipment.map(item => {
                            return <tr key={item.name + item.id}>
                                <td>{item.name}</td>
                                <td>{item.effect}</td>
                                <td><button onClick={() => deleteEquipmentFromList(item.id)}>DELETE</button></td>
                                {
                                    item.givesBonus && (
                                    
                                    !item.inUse ? <td><button onClick={() => {
                                        useEquipment(item).then(() => {
                                            console.log('Updating Character Stats After Using Equipment: ', character)
                                            updateCharacterStats(characterRef.current)
                                        })
                                    }}>USE</button></td> : <td><button onClick={() => {
                                        unEquipItem(item).then(() => {
                                            console.log('Updating Character Stats After Unequipping Equipment: ', character)
                                            updateCharacterStats(characterRef.current)
                                        })
                                    }}>UNEQUIP</button></td>)
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
            {
                showItemModal && (
                    <ItemModal ItemType='equipment' setShowItemModal={setShowItemModal} updateItems={getEquipment}/>
                )
            }
        </div>
    )
}