import { useState, type FormEvent } from "react";
import { useCharacterStore } from "../../store";
import { addTreasure } from "../../utils/api";
import type { TreasureDto } from "../../utils/Types";


type Props = {
    setShowTreasureModal: (value: boolean) => void;
    updateTreasure: () => void;
}

export default function TreasureModal({ setShowTreasureModal, updateTreasure }: Props) {

    const { character } = useCharacterStore();
    const [name, setName] = useState<string>('');
    const [value, setValue] = useState<number>(0);

    function handleSubmit(e: FormEvent<HTMLFormElement>, id: number) {
        e.preventDefault();
        const treasureDto: TreasureDto = {
            name: name,
            value: value,
            characterId: id
        };

        addTreasure(treasureDto).then(res => {
            console.log(res);
        }).finally(() => {
            updateTreasure();
        });
        

        setShowTreasureModal(false);
    }

    return (
        <div className='modal-background'>
            <div className='modal-container'>
                <h3>Create Treasure</h3>
                <form onSubmit={(e) => handleSubmit(e, character.id)} style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor='treasure-name'>Treasure Name: </label>
                    <input id='treasure-name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor='treasure-value'>Treasure Value: </label>
                    <input id='treasure-value' type='text' value={value} onChange={(e) => setValue(Number(e.target.value))} />
                    <button type='submit'>Submit</button>
                </form>
                <button onClick={() => setShowTreasureModal(false)}>Close</button>
            </div>
        </div>
    )
}