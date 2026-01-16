import { create } from "zustand";

export type Character = {
    id: number;
    name: string;
    skill: number;
    stamina: number;
    luck: number;
    gold: number;
}
export type CharacterToCreate = {
    name: string;
    skill: number;
    stamina: number;
    luck: number;
    gold: number;
}

type Progress = {
    book: string;
    section: number;
}

type CharacterStore = {
    character: Character;
    setCharacter: (character: Character) => void;
    progress?: Progress;
    setProgress?: (progress: Progress) => void;
    allCharacters: Character[];
    setAllCharacters: (allCharacters: Character[]) => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
    character: {
        id: 0,
        name: "",
        skill: 0,
        stamina: 0,
        luck: 0,
        gold: 0,
    },
    setCharacter: (character: Character) => set({ character }),
    progress: undefined,
    setProgress: (progress: Progress) => set({ progress }),
    allCharacters: [],
    setAllCharacters: (allCharacters:  Character[]) => set({allCharacters})
}))