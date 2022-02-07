export interface Pokemon {
    name: string,
    url: string
    details: PokemonDetails | null
} 

export interface PokemonResponse {
    count: number,
    next: string,
    previous: string,
    results: Pokemon[]
}

export interface PokemonDetails {
    id: number,
    name: string,
    height: number,
    weight: number,
    sprites: PokemonSprite
}

export interface PokemonSprite {
    back_default: string | null,
    back_female: string | null,
    back_shiny: string | null,
    back_shiny_female: string | null,
    front_default: string | null,
    front_female: string | null,
    front_shiny: string | null,
    front_shiny_female: string | null
}

export interface Trainer {
    id: number;
    username: string;
    pokemon: number[];
}

