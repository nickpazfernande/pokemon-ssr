import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonsListComponent } from "../../pokemons/components/pokemons-list/pokemons-list.component";
import { PokemonListSkeletonComponent } from "../../pokemons/ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsServices } from '../../pokemons/services/pokemons.services';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from "@angular/core/rxjs-interop";
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonsListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnDestroy, OnInit {
  private pokemonsServices = inject(PokemonsServices);
  public pokemons = signal<SimplePokemon[]>([]);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title)

  public currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map(params => {
        const page = params.get('page');
        return page ? Number(page) : 1;
      })
    )
  )

  public isLoading = signal(true);
  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log({ isStable })
  // });

  ngOnInit() {
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 1500);

    this.loadPokemonsPage(this.currentPage()!);
  }

  ngOnDestroy(): void {
    // this.$appState.unsubscribe();
  }

  public loadPokemonsPage(page: number = 1) {
    //Solo sumar si es +1 y restar si es -1, no hacer nada si es 0
    let nextPage = this.currentPage()!
    //Sumar uno si es +1 y el query param actual no es 1
    if (page === +1) {
      nextPage++;
    } else if (page === -1) {
      nextPage--;
    }

    nextPage = Math.max(0, nextPage);

    this.pokemonsServices.loadPage(nextPage).pipe(
      tap(() => this.router.navigate([], {
        queryParams: { page: nextPage },
      })),
      tap(() => this.title.setTitle(`Pokemons - Página ${nextPage}`))
    )
      .subscribe(pokemons => {
        this.pokemons.set(pokemons);
        this.isLoading.set(false);
      })
  }
}
