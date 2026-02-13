import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { PokemonsServices } from '../../pokemons/services/pokemons.services';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

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
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    const idOrName = this.route.snapshot.paramMap.get('idOrName') || '';
    this.pokemonsServices.loadPokemon(idOrName)
      .pipe(
        tap(({ name, id }) => {
          this.title.setTitle(`${name} #${id} | Pokédex App`);
          this.meta.updateTag({ name: 'description', content: `Details and information about ${name}, Pokémon #${id}` });
          this.meta.updateTag({ name: 'og:title', content: `${name} #${id} | Pokédex App` });
          this.meta.updateTag({ name: 'og:description', content: `Details and information about ${name}, Pokémon #${id}` });
          this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` });
        })
      )
      .subscribe(pokemon => {
        this.pokemon.set(pokemon);
      });
  }
}
