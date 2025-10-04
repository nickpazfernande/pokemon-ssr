import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonsListComponent } from "../../pokemons/components/pokemons-list/pokemons-list.component";

@Component({
  selector: 'pokemons-page',
  imports: [PokemonsListComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent { }
