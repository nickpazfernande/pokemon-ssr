import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { PokemonsServices } from '../../pokemons/services/pokemons.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export default class PokemonPageComponent implements OnInit {
  private pokemonsServices = inject(PokemonsServices);
  private route = inject(ActivatedRoute);
  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.pokemonsServices.loadPokemon(id).subscribe(pokemon => {
      this.pokemon.set(pokemon);
    });
  }
}
