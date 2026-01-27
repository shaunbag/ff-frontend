import { useEffect, useState } from 'react';

export type BattleResult = 'wounded' | 'enemy wounded' | 'dead' | 'enemy dead' | 'draw' | '';

type Props = {
    setShowModal: (bool: boolean) => void;
    result: BattleResult;
    fightAgain: () => void;
}

export default function BattleModal({ setShowModal, result, fightAgain }: Props) {

    const [text, setText] = useState('')

    useEffect(() => {
        battleOutcome(result)
    }, [result])

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

    return (
        <div className='modal-background'>
            <div className='modal-container'>
                <h2>{text}</h2>
                {
                    result === 'draw' || result === 'wounded' || result === 'enemy wounded'
                        ?
                        <button onClick={() => fightAgain()}>Fight Another Round</button>
                        :
                        <button onClick={() => setShowModal(false)}>Close</button>
                }
            </div>

        </div>
    )
}