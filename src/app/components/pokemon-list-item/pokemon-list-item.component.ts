import { Component, Input, OnInit } from '@angular/core';
import { Pokemon, PokemonDetails } from 'src/app/models/pokemon.model';
import { LoginService } from 'src/app/services/login.service';
import { PokemonTrainerService } from 'src/app/services/pokemon-trainer.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {

  @Input()
  pokemonDetails: PokemonDetails | null = null;

  get isCollected(): boolean {
    let result: boolean = false;
    if(Array.isArray(this.pokemonTrainerService.pokemonIdsCollected)) {
      result = this.pokemonTrainerService.pokemonIdsCollected.indexOf(Number(this.pokemonDetails?.id)) > -1
    }
    return result;
  }

  constructor(
    private pokemonTrainerService: PokemonTrainerService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {  }

  handleAdd2CollectionClick(): void {
    console.log("entered handleAdd2CollectionClick()...");
    this.pokemonTrainerService.addPokemon2Collection(
      Number(this.loginService.Trainer?.id),   //--- trainerId 
      Number(this.pokemonDetails?.id)
    );

  }

}
