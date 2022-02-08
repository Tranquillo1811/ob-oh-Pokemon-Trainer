import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonTrainerService } from 'src/app/services/pokemon-trainer.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.page.html',
  styleUrls: ['./trainer-page.page.css']
})
export class TrainerPagePage implements OnInit {

  /**
   * gets all Pokemons collected by the current user from localStorage
   */
  get collectedPokemons() {
    const result: Pokemon[] = this.pokemonTrainerService.pokemonsCollected;
    console.log(`[GETTER collectedPokemons] result: ${result[0].url}`)
    return result;
  }

  constructor(private pokemonTrainerService: PokemonTrainerService) 
  { }

  ngOnInit(): void {
  }

}
