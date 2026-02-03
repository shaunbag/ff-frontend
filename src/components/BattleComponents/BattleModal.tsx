import { useEffect, useState } from 'react';
import { useCharacterStore } from '../../store';
import type { Enemy } from './BattleSheet';

export type BattleResult = 'wounded' | 'enemy wounded' | 'dead' | 'enemy dead' | 'draw' | '';

type Props = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    result: BattleResult;
    fightAgain: () => void;
    setEnemy: React.Dispatch<React.SetStateAction<Enemy>>;
    enemy: Enemy;
}

export default function BattleModal({ setShowModal, result, fightAgain, setEnemy, enemy }: Props) {

    const [text, setText] = useState('');
    const [luck, setLuck] = useState('');
    const { character, setCharacter } = useCharacterStore();

    useEffect(() => {
        battleOutcome(result)
    }, [result])

    useEffect(() => {
        if(enemy.stamina <= 0){
            setText('⚔️ You Destroyed the Enemy ⚔️')
        }
    },[enemy])

    function battleOutcome(result: BattleResult) {
        switch (result) {
            case 'wounded':
                setText('⚔️ You have been Wounded ⚔️')
                break;
            case 'enemy wounded':
                setText('⚔️ You scored a hit ⚔️')
                break;
            case 'dead':
                setText('💀 You have been Killed R.I.P 💀')
                break;
            case 'enemy dead':
                setText('⚔️ You Destroyed the Enemy ⚔️')
                break;
            case 'draw':
                setText('⚔️ It Was A Draw ⚔️')
                break;
            case '':
                setShowModal(false)
                break;
            default:
                setShowModal(false)
                break;
        }
    }

    function testLuck() {
        console.log('Testing Luck')
        if (character.luck <= 0) {
            setText('You have run out of Luck');
            return;
        }
        const dieRoll = Math.floor(Math.random() * 12) + 1;
        const luckResult = dieRoll <= character.luck;
        console.log('Luck Result',luckResult)
        setLuck(luckResult ? 'You have been lucky' : 'You have been Unlucky');
        
        setTimeout(() => {
            setLuck('');
        }, 2000)

        setEnemy(prev => ({
            ...prev,
            stamina: result === 'enemy wounded' ? (luckResult ? prev.stamina - 2: prev.stamina + 1) : prev.stamina
        }))
        const playerUpdate = {
            ...character,
            luck: character.luck - 1,
            stamina: result === 'wounded' ? (luckResult ? character.stamina + 1: character.stamina - 1) : character.stamina
        }
        setCharacter(playerUpdate)
    }

    return (
        <div className='modal-background'>
            <div className='modal-container'>
                <h2>{text}</h2>
                <p>Your Stamina: {character.stamina} | Enemy Stamina: {enemy.stamina} </p>
                {
                    result === 'draw' || result === 'wounded' || result === 'enemy wounded'
                        ?
                        <button onClick={() => fightAgain()}>Fight Another Round</button>
                        :
                        <button onClick={() => setShowModal(false)}>Close</button>
                }
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <button name='luck-btn' onClick={() => testLuck()}>Use Luck</button>
                    <button onClick={() => setShowModal(false)}>Close</button>
                </div>
                <p>{luck}</p>
            </div>

        </div>
    )
}