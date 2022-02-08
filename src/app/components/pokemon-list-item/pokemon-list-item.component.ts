import { Component, Input, OnInit } from '@angular/core';
import { PokemonDetails } from 'src/app/models/pokemon.model';
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
    private pokemonTrainerService: PokemonTrainerService
  ) { }

  ngOnInit(): void {  }

  handleAdd2CollectionClick(): void {
    console.log("entered handleAdd2CollectionClick()...");
    console.log(`TrainerId: ${this.pokemonTrainerService.trainerId}`);
    this.pokemonTrainerService.addPokemon2Collection(
      Number(this.pokemonTrainerService.trainerId),   //--- trainerId 
      Number(this.pokemonDetails?.id)
    );

  }

  handleRemoveFromCollectionClick(): void {
    console.log("entered handleRemoveFromCollectionClick()...");
    console.log(`TrainerId: ${this.pokemonTrainerService.trainerId}`);
    this.pokemonTrainerService.removePokemonFromCollection(
      Number(this.pokemonTrainerService.trainerId),   //--- trainerId 
      Number(this.pokemonDetails?.id)
    );

  }

}
