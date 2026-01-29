import { TextField, Button } from '@mui/material'
import React from 'react'
import { createCharacter } from '../../utils/api';
import { useCharacterStore } from '../../store';

export default function CharacterCreationSheet() {

    const { setCharacter } = useCharacterStore();
    const [name, setName] = React.useState<string>('');
    const [skill, setSkill] = React.useState<number>(0);
    const [stamina, setStamina] = React.useState<number>(0);
    const [luck, setLuck] = React.useState<number>(0);
    const [gold, setGold] = React.useState<number>(0);

    function handleCreateCharacter() {
        console.log('Character Created:', { name, skill, stamina, luck, gold });
        const Character = {
            name: name,
            skill: skill,
            luck: luck,
            stamina: stamina,
            gold: gold,
            provisions: 10
        }

        try {
            createCharacter(Character).then(res => {
                if(res.id){
                    setCharacter(res)
                }
            })
        } catch (error) {
            console.error('Error creating character:', error);
        }
    }

    return (
        <section>
            <h1>Character Creation Sheet</h1>
            <TextField label='Name' variant='outlined' value={name} onChange={(e) => setName(e.target.value)} />
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Skill</label>
                <input type='number' placeholder='Skill' value={skill} onChange={(e) => setSkill(Number(e.target.value))} />
                <label>Stamina</label>
                <input type='number' placeholder='Stamina' value={stamina} onChange={(e) => setStamina(Number(e.target.value))} />
                <label>Luck</label>
                <input type='number' placeholder='Luck' value={luck} onChange={(e) => setLuck(Number(e.target.value))} />
                <label>Gold</label>
                <input type='number' placeholder='Gold' value={gold} onChange={(e) => setGold(Number(e.target.value))} />
            </div>
            
            <Button variant='contained' color='primary' onClick={handleCreateCharacter}>Create Character</Button>
        </section>
    )
}