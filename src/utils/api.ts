import type { Character, CharacterToCreate } from "../store";

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

export async function getAllCharacters(): Promise<Character[]> {
    return apiGet<Character[]>('api/all')
}

export async function createCharacter(character: CharacterToCreate): Promise<Character> {
    return apiPost('api/createcharacter', JSON.stringify(character))
}