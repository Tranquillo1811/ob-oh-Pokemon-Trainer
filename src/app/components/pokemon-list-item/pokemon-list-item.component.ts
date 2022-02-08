import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
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
  @Output()
  remove: EventEmitter<number> = new EventEmitter();

  private _isCollected: boolean = false;

  get isCollected(): boolean {
    return this._isCollected;
  }

  constructor(
    private pokemonTrainerService: PokemonTrainerService
  ) { }

  ngOnInit(): void { 
    this._isCollected = 
      this.pokemonTrainerService.pokemonIdsCollected.indexOf(Number(this.pokemonDetails?.id)) > -1
  }

  handleAdd2CollectionClick(): void {
    console.log("entered handleAdd2CollectionClick()...");
    console.log(`TrainerId: ${this.pokemonTrainerService.trainer?.id}`);
    this.pokemonTrainerService.addPokemon2Collection(
      Number(this.pokemonTrainerService.trainer?.id),   //--- trainerId 
      Number(this.pokemonDetails?.id)
    );

  }

  handleRemoveFromCollectionClick(): void {
    console.log("entered handleRemoveFromCollectionClick()...");
    console.log(`TrainerId: ${this.pokemonTrainerService.trainer?.id}`);
    this.pokemonTrainerService.removePokemonFromCollection(
      Number(this.pokemonTrainerService.trainer?.id),   //--- trainerId 
      Number(this.pokemonDetails?.id)
    );
    this.remove.emit(this.pokemonDetails?.id);
  }

}
