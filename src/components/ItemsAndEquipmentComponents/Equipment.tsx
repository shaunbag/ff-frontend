import { useEffect, useRef, useState } from 'react';
import { useCharacterStore } from '../../store'
import { deleteEquipment, getEquipmentByCharacterId } from '../../utils/api';
import ItemModal from './ItemModal';

export default function Equipment() {

    const { equipment, setEquipment, character } = useCharacterStore();
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
                    </tr>
                </thead>
                <tbody>
                    {
                        equipment.map(item => {
                            return <tr key={item.name + item.id}>
                                <td>{item.name}</td>
                                <td>{item.effect}</td>
                                <td><button onClick={() => deleteEquipmentFromList(item.id)}>DELETE</button></td>
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