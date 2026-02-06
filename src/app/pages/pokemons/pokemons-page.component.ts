import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonsListComponent } from "../../pokemons/components/pokemons-list/pokemons-list.component";
import { PokemonListSkeletonComponent } from "../../pokemons/ui/pokemon-list-skeleton/pokemon-list-skeleton.component";

@Component({
  selector: 'pokemons-page',
  imports: [PokemonsListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnDestroy, OnInit {

  public isLoading = signal(true);

  private appRef = inject(ApplicationRef);

  private $appState = this.appRef.isStable.subscribe((isStable) => {
    console.log({ isStable })
  });

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }

  ngOnDestroy(): void {
    this.$appState.unsubscribe();
  }
}
