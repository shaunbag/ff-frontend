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
    givesBonus: boolean;
    bonus?: number | null;
    skill?: string | null;
    characterId: number;
    inUse: boolean;
}

export type ItemDto = {
    name: string;
    effect: string;
    characterId: number;
    givesBonus: boolean;
    bonus?: number | null;
    skill?: string | null;
    inUse: boolean;
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

export type Treasure = {
    id: number;
    name: string;
    value: number;
    characterId: number;
}

export type TreasureDto = {
    name: string;
    value: number;
    characterId: number;
}