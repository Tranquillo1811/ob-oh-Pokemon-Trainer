import { Component, OnInit } from '@angular/core';
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

    return this.pokemonTrainerService.pokemonsCollected;
  }

  constructor(private pokemonTrainerService: PokemonTrainerService) 
  { }

  ngOnInit(): void {
  }

}
