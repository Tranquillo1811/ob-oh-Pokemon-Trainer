import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { map, finalize } from 'rxjs';
import { Pokemon, PokemonDetails, PokemonResponse } from '../models/pokemon.model';

//const URL = "https://pokeapi.co/api/v2/pokemon/?limit=60&offset=120";
const trainerAPIUrl = "https://obe-assignment-api.herokuapp.com/trainers"

@Injectable({
  providedIn: 'root'
})
export class PokemonTrainerService {

  private _isLoading: boolean = false;
  private _pokemons: Pokemon[] = [];
  //private {pokemonSessionKeyUser} = environment;
  private _pokemonSessionKeyUser = 'pokemon-session';

  get isLoading(): boolean {
    return this._isLoading;
  }
  get pokemons(): Pokemon[] {
    return this._pokemons
  }

  get pokemonIdsCollected(): Number[] {
    let result: Number[] = [];
    const data = sessionStorage.getItem(this._pokemonSessionKeyUser);
    if(data !== null && data !== undefined) {
      result = JSON.parse(data);
    }
    console.log(`pokemonIdsCollected: ${result}`);
    return result;
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
  
  addPokemon2Collection(trainerId: number, pokemonId: number): void {
    let pokemonsCollected = this.pokemonIdsCollected;
    if(Array.isArray(pokemonsCollected)) {
      pokemonsCollected.push(pokemonId);
    }
    else {
      pokemonsCollected = [pokemonId];
    }
    console.log(`storing this collection to JSON DB: ${pokemonsCollected}`);
    const body = {
      pokemon: pokemonsCollected
    }
    const headers = this.createHttpHeaders();
    console.log(`sending PATCH request: trainerId=${trainerId}, pokemonId=${pokemonId}, pokemonsCollected=${pokemonsCollected}`);
    const url = `${trainerAPIUrl}/${trainerId}`;
    this.http.patch(url, body, { headers })
      .subscribe((response) => console.log("response:", response))
    //--- update collected pokemons in session storage
    sessionStorage.setItem(this._pokemonSessionKeyUser, JSON.stringify(pokemonsCollected));
  }

  private createHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': 'xLZ/ENQNQUyhPD0eNtEGYw=='
    })
  }

}
