import type { Character, CharacterDto } from './Types'
import { updateCharacter } from './api'

export function updateCharacterStats(player: Character){
        const characterDto: CharacterDto = {
            name: player.name,
            skill: player.skill,
            luck: player.luck,
            stamina: player.stamina,
            gold: player.gold,
            provisions: player.provisions
        }
        updateCharacter(characterDto, player.id)
    }