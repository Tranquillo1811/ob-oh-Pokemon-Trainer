import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  @Input() 
  pokemons: Pokemon[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  handleRemove(pokemonId: number) {
    console.log(`You just removed Pokemon with id ${pokemonId} from your collection...`);
    //--- get Pokemon with this ID
    const removedPokemon = this.pokemons.filter(pokemon => pokemon.details?.id == pokemonId)[0];
    this.pokemons.splice(this.pokemons.indexOf(removedPokemon), 1);
  }

}
