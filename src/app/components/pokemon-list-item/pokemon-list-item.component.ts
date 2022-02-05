import { Component, Input, OnInit } from '@angular/core';
import { Pokemon, PokemonDetails } from 'src/app/models/pokemon.model';
import { PokemonTrainerService } from 'src/app/services/pokemon-trainer.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {

  @Input()
  pokemonDetails: PokemonDetails | null = null;

  constructor(private pokemonTrainerService: PokemonTrainerService) { }

  ngOnInit(): void {  }

  handleAdd2CollectionClick(): void {
    console.log("entered handleAdd2CollectionClick()...");
    this.pokemonTrainerService.addPokemon2Collection(3, Number(this.pokemonDetails?.id));
  }

}
