import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { PokemonsListComponent } from "../../pokemons/components/pokemons-list/pokemons-list.component";
import { PokemonListSkeletonComponent } from "../../pokemons/ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsServices } from '../../pokemons/services/pokemons.services';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonsListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {
  private pokemonsServices = inject(PokemonsServices);
  public pokemons = signal<SimplePokemon[]>([]);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title)

  public currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map(params => {
        const queryPage = Number(params.get('page') ?? '1');
        if (Number.isNaN(queryPage)) return 1;
        return Math.max(1, queryPage);
      })
    ),
    { initialValue: 1 }
  )

  public isLoading = signal(true);
  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log({ isStable })
  // });

  constructor() {
    effect(() => {
      const page = this.currentPage();
      this.fetchPokemons(page);
    });
  }

  public loadPokemonsPage(delta: number) {
    const nextPage = Math.max(1, this.currentPage() + delta);
    this.router.navigate([], {
      queryParams: { page: nextPage },
      queryParamsHandling: 'merge',
    });
  }

  private fetchPokemons(page: number) {
    this.isLoading.set(true);
    this.pokemonsServices.loadPage(page).subscribe(pokemons => {
      this.pokemons.set(pokemons);
      this.title.setTitle(`Pokemons - Página ${page}`);
      this.isLoading.set(false);
    });
  }
}
