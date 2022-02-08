import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from "../../environments/environment";
import { Pokemon, PokemonDetails, PokemonResponse } from '../models/pokemon.model';

const trainerAPIUrl = "https://obe-assignment-api.herokuapp.com/trainers";
const { pokemonList } = environment;
const { pokemonTrainer } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonTrainerService {

  private _isLoading: boolean = false;
  private _pokemonIdsCollected: number[] = [];

  get isLoading(): boolean {
    return this._isLoading;
  }
  get pokemonIdsCollected(): Number[] {
    return this._pokemonIdsCollected;
  }

  get pokemonsCollected(): Pokemon[] {
    let result: Pokemon[] = [];
    for (const pokemonId of this._pokemonIdsCollected) {
      //--- check whether pokemon with current id is available in sessionStorage
      const storage = sessionStorage.getItem(pokemonList);
      if(storage != null) {
        const pokemonArray = JSON.parse(storage);
        const foundPokemon = pokemonArray.filter((pokemon: Pokemon) => pokemon.details?.id == pokemonId);
        if(foundPokemon) {
          result.push(foundPokemon);
        }
      }
    }
    return result;
  }

  constructor(private http: HttpClient) { }

  /**
   * receives Pokemon data through API and 
   * stores it in sessionStorage
   * @param url url of Pokemon API
   * @param limit number of pokemons to be fetched
   * @param offset index of first pokemon to fetch
   */
  loadPokemons(url: string, limit: number, offset: number): void {
    url = `${url}?limit=${limit}&offset=${offset}`;
    this._isLoading = true;
    this.http.get<PokemonResponse>(url)
      .pipe(
        map((response: PokemonResponse) => response.results )
      )
      .subscribe({
        next: (pokemons: Pokemon[]) => {
          for (const pokemon of pokemons) {
            this.http.get<PokemonDetails>(pokemon.url)
              .subscribe(
                {
                  next: (details: PokemonDetails) => {
                    pokemon.details = details;
                    sessionStorage.setItem(pokemonList, JSON.stringify(pokemons));
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
    localStorage.setItem(pokemonTrainer, JSON.stringify(this._pokemonIdsCollected));
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
