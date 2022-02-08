import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonTrainerService } from 'src/app/services/pokemon-trainer.service';
import { environment } from 'src/environments/environment';

const { pokemonList } = environment

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.page.html',
  styleUrls: ['./catalogue-page.page.css']
})
export class CataloguePagePage implements OnInit {

  private _url: string = "https://pokeapi.co/api/v2/pokemon/";

  /**
   * gets PokemonList from sessionStorage 
   */
  get pokemons(): Pokemon[] {
    let result: Pokemon[] = [];
    const storage = sessionStorage.getItem(pokemonList);
    if(storage !== null) {
      result = JSON.parse(storage);
    }
    return result;
  }
  
  constructor(private pokemonTrainerService: PokemonTrainerService) { }

  ngOnInit(): void {
    this.pokemonTrainerService.loadPokemons(this._url, 20, 0);
  }
}
