import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { PokeApiResponse } from '../interfaces/pokemon-api-response';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonsServices {
  private httpClient = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page != 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.httpClient.get<PokeApiResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`
    ).pipe(
      // Transformamos la respuesta para obtener solo lo que necesitamos
      map(response => response.results.map(pokemon => {
        const id = pokemon.url.split('/').filter(Boolean).pop() || '';
        return {
          name: pokemon.name,
          id
        } as SimplePokemon;
      }),
        tap(pokemons => console.log({ pokemons }))


      ))
  }

  public loadPokemon(id: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      tap(pokemon => console.log({ pokemon }))
    );
  }
}
