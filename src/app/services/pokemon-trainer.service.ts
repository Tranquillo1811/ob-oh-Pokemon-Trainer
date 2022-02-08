import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from "../../environments/environment";
import { Pokemon, PokemonDetails, PokemonResponse, Trainer } from '../models/pokemon.model';
import { LoginService } from './login.service';

const trainerAPIUrl = "https://obe-assignment-api.herokuapp.com/trainers";
const { pokemonList } = environment;
const { pokemonTrainer } = environment;
const { pokemonApiBaseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonTrainerService {

  private _isLoading: boolean = false;  

  get isLoading(): boolean {
    return this._isLoading;
  }

  get trainerId(): number {
    let result = 0;
    if(this.loginService !== undefined) {
      if(this.loginService.trainer !== undefined) {
        if(this.loginService.trainer?.id != undefined) {
          result = this.loginService.trainer.id;
        }
      }
    }
    return result;
  }

  get trainer(): Trainer | undefined {
    console.log("Trainer:",this.loginService?.trainer);
    return this.loginService?.trainer;
  }

  get pokemonIdsCollected(): number[] {
    console.log(`pokemonIdsCollected: ${this.trainer}`);
    return this.trainer === undefined ? [] : this.trainer.pokemon;
  }

  /**
   * gets data of collected Pokemons of current trainer from sessionStorage if available there
   * or loads from API if not available in sessionStorage
   */
  get pokemonsCollected(): Pokemon[] {
    let result: Pokemon[] = [];
    //console.log(`[pokemonsCollected getter] this._pokemonIdsCollected: ${this.pokemonIdsCollected}`);
    const storage = sessionStorage.getItem(pokemonList);
    //console.log(`sessionStorage: ${storage}`);
    if(storage != null) {
      const pokemonArray = JSON.parse(storage);
      //console.log(`[pokemonsCollected getter] pokemonArray: ${pokemonArray[0].details.height}`);
      for (const pokemonId of this.pokemonIdsCollected) {
        //--- check whether pokemon with current id is available in sessionStorage
        const foundPokemon = pokemonArray.filter((pokemon: Pokemon) => pokemon.details?.id == pokemonId);
        console.log(`[pokemonsCollected getter] foundPokemon for id ${pokemonId}: ${foundPokemon[0].details}`);
        if(foundPokemon) {
          result.push(foundPokemon[0]);
        }
        else {
          //--- Pokemon is not in sessionStorage
          const url = `${pokemonApiBaseUrl}pokemon/${pokemonId}`;
          this.http.get(url)
            .pipe(
              map((response: any) => {
                const { id, name, height, weight, sprites } = response;
                return { id, name, height, weight, sprites };
              }
            ))
            .subscribe({
              next: (pokemonDetails: PokemonDetails) => {
                result.push({name: pokemonDetails.name, url: url, details: pokemonDetails});
              }
            })
        }
      }
    }
    else {
      //--- sessionStorage is empty
      //--- all data from collected Pokemons of current trainer must be fetched from API
      console.log(`[GETTER pokemonsCollected] pokemonIdsCollected: ${this.pokemonIdsCollected}`);
      for (const pokemonId of this.pokemonIdsCollected) {
        const url = `${pokemonApiBaseUrl}pokemon/${pokemonId}`;
          this.http.get(url)
            .pipe(
              map((response: any) => {
                const { id, name, height, weight, sprites } = response;
                return { id, name, height, weight, sprites };
              }
            ))
            .subscribe({
              next: (pokemonDetails: PokemonDetails) => {
                result.push({name: pokemonDetails.name, url: url, details: pokemonDetails});
              }
            })
      }
    }
    console.log(`[pokemonsCollected getter] result: ${result.length}`);
    return result;
  }

  constructor(private http: HttpClient, private loginService: LoginService) {  }

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
            this.http.get(pokemon.url)
              .pipe(
                map((response: any) => { 
                  const { id, name, height, weight, sprites } = response;
                  return { id, name, height, weight, sprites }; 
                })
              )
              .subscribe(
                {
                  next: (details: PokemonDetails) => {
                    pokemon.details = details;
                    //console.log(`[loadPokemons] pokemons: ${JSON.stringify(pokemons)}`);
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
    //--- update collected pokemons in localStorage
    const storage = localStorage.getItem(pokemonTrainer);
    console.log(`localStorage: ${storage}`);
    let trainer: Trainer | null = null;
    if(storage !== null) {
      trainer = JSON.parse(storage);
    }
    console.log(`[addPokemon2Collection] trainer.pokemon: ${trainer?.pokemon}`);
    trainer?.pokemon.push(pokemonId);
    localStorage.setItem(pokemonTrainer, JSON.stringify(trainer));
    const headers = this.createHttpHeaders();
    const body = {
      pokemon: this.pokemonIdsCollected
    }
    console.log(`sending PATCH request: trainerId=${trainerId}, pokemonId=${pokemonId}, pokemonsCollected=${this.pokemonIdsCollected}`);
    const url = `${trainerAPIUrl}/${trainerId}`;
    this.http.patch(url, body, { headers })
      .subscribe((response) => console.log("response:", response))
  }

  /**
   * removes PokemonId from PokemonIdArray in JSON DB
   * @param trainerId id od the trainer
   * @param pokemonId id of the pokemon that is to be removed from JSON DB
   */
   removePokemonFromCollection(trainerId: number, pokemonId: number): void {
    const trainer = this.loginService.trainer;
    console.log(`[addPokemon2Collection] trainer.pokemon: ${trainer?.pokemon}`);
    trainer?.pokemon.splice(trainer?.pokemon.indexOf(pokemonId), 1);
    console.log(`[addPokemon2Collection] trainer.pokemon after splice: ${trainer?.pokemon}`);
    localStorage.setItem(pokemonTrainer, JSON.stringify(trainer));
    const headers = this.createHttpHeaders();
    const body = {
      pokemon: trainer?.pokemon
    }
    console.log(`sending PATCH request: trainerId=${trainerId}, pokemonId=${pokemonId}, pokemonsCollected=${this.pokemonIdsCollected}`);
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
