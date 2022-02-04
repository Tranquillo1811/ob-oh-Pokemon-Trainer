import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, finalize } from 'rxjs';
import { Pokemon, PokemonDetails, PokemonResponse } from '../models/pokemon.model';

//const URL = "https://pokeapi.co/api/v2/pokemon/?limit=60&offset=120";

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
  
}
