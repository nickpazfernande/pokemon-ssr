import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonsListComponent } from "../../pokemons/components/pokemons-list/pokemons-list.component";
import { PokemonListSkeletonComponent } from "../../pokemons/ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsServices } from '../../pokemons/services/pokemons.services';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from 'rxjs';

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
    console.log(this.currentPage());

    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 1500);

    this.loadPokemonsPage(this.currentPage());
  }

  ngOnDestroy(): void {
    // this.$appState.unsubscribe();
  }

  public loadPokemonsPage(page: number = 1) {

    const nextPage = this.currentPage()! + page;
    console.log('next page: ' + nextPage)
    this.pokemonsServices.loadPage(nextPage).subscribe(pokemons => {
      this.pokemons.set(pokemons);
      this.isLoading.set(false);

    })
  }
}
