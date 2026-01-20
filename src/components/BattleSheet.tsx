import { useState } from "react";
import { useCharacterStore } from "../store";
import CharacterSheet from "./CharacterSheet";
import { useNavigate } from "react-router-dom";
import type { BattleResult } from "./BattleComponents/BattleModal";
import BattleModal from "./BattleComponents/BattleModal";
import { updateCharacterFromBattle } from "../utils/utilityFunctions";

export type Enemy = {
    skill: number;
    stamina: number;
}

export default function BattleSheet() {

    const { character, setCharacter } = useCharacterStore()
    const [enemy, setEnemy] = useState<Enemy>({skill: 0, stamina: 0})
    const [result, setResult] = useState<BattleResult | "">("")
    const [showModal, setShowModal] = useState(false)
    const history = useNavigate()

    function fightABattle(){
        let enemiesRoll = Math.floor(Math.random() * 12) + 1 + enemy.skill
        let playersRoll = Math.floor(Math.random() * 12) + 1 + character.skill

        if(playersRoll > enemiesRoll){
            let enemyUpdate = {...enemy, stamina: enemy.stamina - 2}
            setEnemy(enemyUpdate)

            if(enemyUpdate.stamina <= 0){
                setResult("enemy dead")
            } else {
                setResult("enemy wounded")
            }
            setShowModal(true)
            return
        }
        if(playersRoll < enemiesRoll){
            let playerUpdate = {...character, stamina: character.stamina - 2}
            setCharacter(playerUpdate)

            if(playerUpdate.stamina <= 0){
                setResult("dead")
            } else {
                setResult("wounded")
            }
            updateCharacterFromBattle(playerUpdate)
            setShowModal(true)
            return
        }
        if(playersRoll === enemiesRoll){
            setResult("draw")
            setShowModal(true)
            return
        }
    }

    return (
        <div>
            <header className="page-header">
                <h1>Battle</h1>
                <div className="toolbar">
                    <button onClick={() => history('/')}>Back</button>
                    <button onClick={() => fightABattle()}>Fight!</button>
                </div>
            </header>

            <div className="two-col">
                <section className="panel">
                    <CharacterSheet />
                </section>

                <section className="panel">
                    <h2>Enemy</h2>
                    <div className="form-grid">
                        <label>Skill</label>
                        <input type="number" placeholder="Skill" value={enemy.skill} onChange={(e) => setEnemy({...enemy, skill: Number(e.target.value)})} />
                        <label>Stamina</label>
                        <input type="number" placeholder="Stamina" value={enemy.stamina} onChange={(e) => setEnemy({...enemy, stamina: Number(e.target.value)})} />
                    </div>
                </section>
            </div>
            {
                showModal && (
                    <BattleModal result={result} setShowModal={setShowModal} fightAgain={fightABattle}/>
                )
            }
        </div>
    )
}