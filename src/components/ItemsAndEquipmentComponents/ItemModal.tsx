import { useState, type FormEvent } from 'react'
import { addEquipment, addPotion } from '../../utils/api';
import { useCharacterStore } from '../../store';
import type { ItemDto } from '../../utils/Types';

type Props = {
    ItemType: 'equipment' | 'potion' | 'treasure';
    setShowItemModal: (value: boolean) => void;
    updateItems: () => void;
}

export default function ItemModal({ ItemType, setShowItemModal, updateItems }: Props) {

    const { character } = useCharacterStore();
    const [name, setName] = useState<string>('');
    const [effect, setEffect] = useState<string>('');
    const [givesBonus, setGivesBonus] = useState<boolean>(false);
    const [bonus, setBonus] = useState<number>(0);
    const [skill, setSkill] = useState<"Skill" | "Stamina" | "Luck">("Skill");

    function handleSubmit(e: FormEvent<HTMLFormElement>, id: number) {
        e.preventDefault();
        const item: ItemDto = {
            name: name,
            effect: effect,
            givesBonus: givesBonus,
            bonus: bonus,
            skill: skill,
            characterId: id,
            inUse: false,
        };
        switch (ItemType) {
            case 'equipment':
                addEquipment(item).then(res => {
                    console.log(res)
                    updateItems();
                }).catch((error: Error) => {
                    console.log(error)
                });
                break;
            case 'potion':
                addPotion(item).then(res => {
                    console.log(res)
                    updateItems();
                }).catch((error: Error) => {
                    console.log(error)
                });
                break;
            default:
                console.log(ItemType + " Not Found")
                break;
        }

        setShowItemModal(false);
    }

    return (
        <div className='modal-background'>
            <div className='modal-container'>
                <h3>Create Item</h3>
                <form onSubmit={(e) => handleSubmit(e, character.id)} style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor='item-name'>Item Name: </label>
                    <input id='item-name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor='item-effect'>Item Effect: </label>
                    <input id='item-effect' type='text' value={effect} onChange={(e) => setEffect(e.target.value)} />
                    <label htmlFor='gives-bonus'>Gives Bonus: </label>
                    <input id='gives-bonus' type='checkbox' checked={givesBonus} onChange={(e) => setGivesBonus(e.target.checked)} />
                    {givesBonus && <>
                        <label htmlFor='bonus'>Bonus: </label>
                        <input id='bonus' type='number' value={bonus} onChange={(e) => setBonus(Number(e.target.value))} />
                        <label htmlFor='skill'>Skill: </label>
                        <select id='skill' value={skill} onChange={(e) => setSkill(e.target.value as "Skill" | "Stamina" | "Luck")}>
                            <option value={""}>Select a skill</option>
                            <option value="Skill">Skill</option>
                            <option value="Stamina">Stamina</option>
                            <option value="Luck">Luck</option>
                        </select>
                    </>}
                    <button type='submit'>Submit</button>
                </form>
                <button onClick={() => setShowItemModal(false)}>Close</button>
            </div>
        </div>
    )
}