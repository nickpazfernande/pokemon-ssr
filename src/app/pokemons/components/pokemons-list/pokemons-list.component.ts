import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

@Component({
  selector: 'app-pokemons-list',
  imports: [PokemonCardComponent],
  templateUrl: './pokemons-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsListComponent {
  public pokemons = input.required<SimplePokemon[]>();



}
