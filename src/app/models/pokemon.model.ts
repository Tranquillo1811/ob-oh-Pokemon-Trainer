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
    sprites: object[]
}