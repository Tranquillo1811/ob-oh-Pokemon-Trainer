import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonTrainerService } from 'src/app/services/pokemon-trainer.service';

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.page.html',
  styleUrls: ['./catalogue-page.page.css']
})
export class CataloguePagePage implements OnInit {

  get pokemons(): Pokemon[] {
    return this.pokemonTrainerService.pokemons;
  }
  constructor(private pokemonTrainerService: PokemonTrainerService) { }

  ngOnInit(): void {
    this.pokemonTrainerService.getAllPokemons();

  }

}
