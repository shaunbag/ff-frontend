import type { Character, CharacterDto, Item, ItemDto, Progress, ProgressDto } from '../store';

async function apiPost<T>(endpoint: string, body: string) {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: body
    })

    if(!res.ok){
        throw new Error(`POST ${endpoint} Failed (${res.status})`)
    }

    return res.json() as Promise<T>
}

async function apiGet<T>(endpoint: string) {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/${endpoint}`, {
        method: 'GET'
    })

    if(!res.ok) {
        throw new Error(`GET ${endpoint} Failed (${res.status})`)
    }

    return res.json() as Promise<T>
}

async function apiDelete(endpoint: string, id: number) {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/${endpoint}/${id}`, {
        method: 'DELETE'
    })

    if(!res.ok) {
        throw new Error(`DELETE ${endpoint} id ${id} Failed (${res.status})`)
    }

}

// Character Api Methods
export async function getAllCharacters(): Promise<Character[]> {
    return apiGet<Character[]>('api/character')
}

export async function createCharacter(character: CharacterDto): Promise<Character> {
    return apiPost('api/character', JSON.stringify(character))
}

export async function deleteCharacter(id: number): Promise<void> {
    return apiDelete('api/character', id)
}

export async function updateCharacter(character: CharacterDto, id: number): Promise<Character> {
    return apiPost(`api/character/${id}`, JSON.stringify(character))
}

//Potions Api Methods
export async function getPotionsByCharacterId(id: number): Promise<Item[]> {
    return apiGet<Item[]>(`api/potions/${id}`)
}

export async function addPotion(item: ItemDto): Promise<Item>{
    return apiPost(`api/potions`, JSON.stringify(item))
}

export async function deletePotion(id: number): Promise<void>{
    return apiDelete('api/equipment', id)
}

// Equipment Api Methods
export async function getEquipmentByCharacterId(id: number): Promise<Item[]> {
    return apiGet<Item[]>(`api/equipment/${id}`)
}

export async function addEquipment(item: ItemDto): Promise<Item>{
    return apiPost(`api/equipment`, JSON.stringify(item))
}

export async function deleteEquipment(id: number): Promise<void>{
    return apiDelete('api/equipment', id)
}

// Progress Api Methods
export async function getProgressByCharacterId(id: number): Promise<Progress[]> {
    return apiGet<Progress[]>(`api/progress/${id}`)
}

export async function addProgress(progressDto: ProgressDto): Promise<Progress> {
    return apiPost('api/progress', JSON.stringify(progressDto))
}

export async function deleteProgressById(id: number): Promise<void> {
    return apiDelete('api/progress', id)
}

export async function updateProgressById(id: number, progressDto: ProgressDto): Promise<Progress> {
    return apiPost(`api/progress/${id}`,JSON.stringify(progressDto))
}