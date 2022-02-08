import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Pokemon, PokemonDetails, PokemonResponse } from '../models/pokemon.model';

//const URL = "https://pokeapi.co/api/v2/pokemon/?limit=60&offset=120";
const trainerAPIUrl = "https://obe-assignment-api.herokuapp.com/trainers"

@Injectable({
  providedIn: 'root'
})
export class PokemonTrainerService {

  private _isLoading: boolean = false;
  private _pokemons: Pokemon[] = [];
  private _pokemonIdsCollected: number[] = [];

  get isLoading(): boolean {
    return this._isLoading;
  }
  get pokemons(): Pokemon[] {
    return this._pokemons
  }

  get pokemonIdsCollected(): Number[] {
    return this._pokemonIdsCollected;
  }
  constructor(private http: HttpClient) { }

  getAllPokemons(url: string, limit: number, offset: number): void {
    url = `${url}?limit=${limit}&offset=${offset}`;
    this._isLoading = true;
    this.http.get<PokemonResponse>(url)
      .pipe(
        map((response: PokemonResponse) => response.results )
      )
      .subscribe({
        next: (pokemons: Pokemon[]) => {
          this._pokemons = pokemons;
          for (const pokemon of this._pokemons) {
            this.http.get<PokemonDetails>(pokemon.url)
              .subscribe(
                {
                  next: (details: PokemonDetails) => {
                    pokemon.details = details;
                  },
                  error: (error) => {
                    console.log(error.message);
                  }
                }
              )
          }
        },
        error: (error) => {
          console.log(error.message);
        }
      })
  }
  
  /**
   * adds PokemonId to PokemonIdArray in JSON DB
   * @param trainerId id od the trainer
   * @param pokemonId if of the pokemon that is to be added to JSON DB
   */
  addPokemon2Collection(trainerId: number, pokemonId: number): void {
    const pokemonsCollected = this._pokemonIdsCollected;
    this._pokemonIdsCollected.push(pokemonId);
    console.log(`storing this collection to JSON DB: ${pokemonsCollected}`);
    const headers = this.createHttpHeaders();
    const body = {
      pokemon: pokemonsCollected
    }
    console.log(`sending PATCH request: trainerId=${trainerId}, pokemonId=${pokemonId}, pokemonsCollected=${pokemonsCollected}`);
    const url = `${trainerAPIUrl}/${trainerId}`;
    this.http.patch(url, body, { headers })
      .subscribe((response) => console.log("response:", response))
  }

  private createHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': 'xLZ/ENQNQUyhPD0eNtEGYw=='
    })
  }

}
