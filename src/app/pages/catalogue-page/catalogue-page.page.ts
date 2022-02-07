import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonTrainerService } from 'src/app/services/pokemon-trainer.service';


@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.page.html',
  styleUrls: ['./catalogue-page.page.css']
})
export class CataloguePagePage implements OnInit {

  private _url: string = "https://pokeapi.co/api/v2/pokemon/";

  get pokemons(): Pokemon[] {
    return this.pokemonTrainerService.pokemons;
  }
  
  constructor(private pokemonTrainerService: PokemonTrainerService) { }

  ngOnInit(): void {
    this.pokemonTrainerService.getAllPokemons(this._url, 20, 0);
  }
}
