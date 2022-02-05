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

  get isLoading(): boolean {
    return this._isLoading;
  }
  get pokemons(): Pokemon[] {
    return this._pokemons
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
    const body = {
      pokemon: [1, 2 ,3]
    }
    const headers = this.createHttpHeaders();
    console.log(`sending POST request: trainerId=${trainerId}, pokemonId=${pokemonId}`);
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
