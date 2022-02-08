import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonTrainerService } from 'src/app/services/pokemon-trainer.service';

import { environment } from '../../../environments/environment'

const {pokemonTrainer: pokemonSessionKeyUser} = environment;

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.page.html',
  styleUrls: ['./trainer-page.page.css']
})
export class TrainerPagePage implements OnInit {

  /**
   * gets all Pokemons collected by the current user from pokemon-trainer-service
   */
  get collectedPokemons() {
    
  }
  constructor(private pokemonTrainerService: PokemonTrainerService) 
  { }

  ngOnInit(): void {
  }

}
