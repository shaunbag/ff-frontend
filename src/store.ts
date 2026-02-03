import { create } from 'zustand';

export type Character = {
    id: number;
    name: string;
    skill: number;
    stamina: number;
    luck: number;
    gold: number;
    provisions: number;
}
export type CharacterDto = {
    name: string;
    skill: number;
    stamina: number;
    luck: number;
    gold: number;
    provisions: number;
}
export type Item = {
    id: number;
    name: string;
    effect: string;
    characterId: number;
}

export type ItemDto = {
    name: string;
    effect: string;
    characterId: number;
}
export type Progress = {
    id: number;
    book: string;
    section: number;
    characterId: number;
}

export type ProgressDto = {
    book: string;
    section: number;
    characterId: number;
}

type CharacterStore = {
    character: Character;
    setCharacter: (character: Character) => void;
    progress: Progress[];
    setProgress: (progress: Progress[]) => void;
    allCharacters: Character[];
    setAllCharacters: (allCharacters: Character[]) => void;
    potions: Item[];
    setPotions: (potions: Item[]) => void;
    equipment: Item[];
    setEquipment: (equipment: Item[]) => void;
    currentBook: Progress;
    setCurrentBook: (currentBook: Progress) => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
    character: {
        id: 0,
        name: '',
        skill: 0,
        stamina: 0,
        luck: 0,
        gold: 0,
        provisions: 0
    },
    setCharacter: (character: Character) => set({ character }),
    progress: [],
    setProgress: (progress: Progress[]) => set({ progress }),
    allCharacters: [],
    setAllCharacters: (allCharacters:  Character[]) => set({allCharacters}),
    potions: [],
    setPotions: (potions: Item[]) => set({potions}),
    equipment: [],
    setEquipment: (equipment: Item[]) => set({equipment}),
    currentBook: {id: 0, book: "", section: 0, characterId: 0},
    setCurrentBook: (currentBook: Progress) => set({currentBook})
}))