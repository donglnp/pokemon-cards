import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';

import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { Parameter } from 'pokemon-tcg-sdk-typescript/dist/interfaces/parameter';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public data!: Observable<Card[]>;

  ngOnInit(): void {
    let params: Parameter = {
      q: `name:"*gren*"`,
      orderBy: `-set.releaseDate`,
      page: 1,
      pageSize: 250,
    };
    this.data = from(PokemonTCG.findCardsByQueries(params));
  }
}
