import { create } from "zustand";

type Character = {
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
}

export const useCharacterStore = create<CharacterStore>((set) => ({
    character: {
        name: "",
        skill: 0,
        stamina: 0,
        luck: 0,
        gold: 0,
    },
    setCharacter: (character: Character) => set({ character }),
    progress: undefined,
    setProgress: (progress: Progress) => set({ progress }),
}))