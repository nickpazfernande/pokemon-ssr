import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

@Component({
  selector: 'pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  pokemon = input.required<SimplePokemon>();

  public readonly pokemonImage = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`;
  })

  //Hace algo cada vez que cambia el pokemon
  // logEffect = effect(() => {
  //   console.log('pokemonCard:', { pokemon: this.pokemon() });
  // })

}
