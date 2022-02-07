import { Component, Input, OnInit } from '@angular/core';
import { Pokemon, PokemonDetails } from 'src/app/models/pokemon.model';
import { PokemonTrainerService } from 'src/app/services/pokemon-trainer.service';
import { environment } from '../../../environments/environment'

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
    //private loginService: LoginService
  ) { }

  ngOnInit(): void {  }

  handleAdd2CollectionClick(): void {
    console.log("entered handleAdd2CollectionClick()...");
    this.pokemonTrainerService.addPokemon2Collection(
      2,   //--- trainerId 
      Number(this.pokemonDetails?.id)
    );
    //[1, 2, 3].push(Number(this.pokemonDetails?.id));

  }

}
