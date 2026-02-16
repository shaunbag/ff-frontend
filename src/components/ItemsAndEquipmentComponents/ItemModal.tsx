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

    function handleSubmit(e: FormEvent<HTMLFormElement>, id: number) {
        e.preventDefault();
        const item: ItemDto = {
            name: name,
            effect: effect,
            characterId: id
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
                    <button type='submit'>Submit</button>
                </form>
                <button onClick={() => setShowItemModal(false)}>Close</button>
            </div>
        </div>
    )
}