import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { LoginService } from 'src/app/services/login.service';
import { PokemonTrainerService } from 'src/app/services/pokemon-trainer.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.page.html',
  styleUrls: ['./trainer-page.page.css']
})
export class TrainerPagePage implements OnInit {

  private _collectedPokemons: Pokemon[] = [];
  /**
   * gets all Pokemons collected by the current user from localStorage
   */
  get collectedPokemons() {
    return this._collectedPokemons;
  }

  constructor(private loginService: LoginService, private pokemonTrainerService: PokemonTrainerService) 
  { }

  ngOnInit(): void {
    //--- get Pokemons that the user has collected so far
    //--- either from sessionStorage or via API if not yet in sessionStoage
    this._collectedPokemons = this.pokemonTrainerService.pokemonsCollected;    
    console.log(`ngOnInit: ${this.pokemonTrainerService.pokemonsCollected}`)
  }

}
