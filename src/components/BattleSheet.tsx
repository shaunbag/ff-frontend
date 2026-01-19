import { useEffect, useState } from "react";
import { useCharacterStore, type Character, type CharacterDto } from "../store";
import CharacterSheet from "./CharacterSheet";
import { updateCharacter } from "../utils/api";
import { useNavigate } from "react-router-dom";

export type Enemy = {
    skill: number;
    stamina: number;
}

export default function BattleSheet() {

    const { character, setCharacter } = useCharacterStore()
    const [enemy, setEnemy] = useState<Enemy>({skill: 0, stamina: 0})
    const history = useNavigate()

    function fightABattle(){
        let enemiesRoll = Math.floor(Math.random() * 12) + 1 + enemy.skill
        let playersRoll = Math.floor(Math.random() * 12) + 1 + character.skill

        if(playersRoll > enemiesRoll){
            let enemyUpdate = {...enemy, stamina: enemy.stamina - 2}
            setEnemy(enemyUpdate)

            if(enemyUpdate.stamina <= 0){
                alert("⚔️ You Destroyed the Enemy ⚔️")
            } else {
                alert("⚔️ You scored a hit ⚔️")
            }
            return
        }
        if(playersRoll < enemiesRoll){
            let playerUpdate = {...character, stamina: character.stamina - 2}
            setCharacter(playerUpdate)

            if(playerUpdate.stamina <= 0){
                alert("💀 You have been Killed R.I.P 💀")
            } else {
                alert("⚔️ You have been Wounded ⚔️")
            }
            updateCharacterFromBattle(playerUpdate)
            return
        }
        if(playersRoll === enemiesRoll){
            alert("It was a Draw Fight again")
            return
        }
    }

    function updateCharacterFromBattle(player: Character){
        const characterDto: CharacterDto = {
            name: player.name,
            skill: player.skill,
            luck: player.luck,
            stamina: player.stamina,
            gold: player.gold
        }
        updateCharacter(characterDto, player.id)
    }

    return (
        <div>
            <h1>Battle</h1>
            <button onClick={() => history('/')}>Back</button>
            <div>
                <div>
                    <CharacterSheet />
                </div>
                <div>
                    <h2>Enemy</h2>
                    <label>Skill</label>
                    <input type="number" placeholder="Skill" value={enemy.skill} onChange={(e) => setEnemy({...enemy, skill: Number(e.target.value)})} />
                    
                    <label>Stamina</label>
                    <input type="number" placeholder="Stamina" value={enemy.stamina} onChange={(e) => setEnemy({...enemy, stamina: Number(e.target.value)})} />
                </div>
            </div>
            <button onClick={() => fightABattle()}>Fight!</button>
        </div>
    )
}