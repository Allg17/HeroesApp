import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  termino: string = "";
  heroes: Hero[] = [];
  heroSelected!: Hero | undefined;
  constructor(private heroService: HeroesService) { }

  ngOnInit(): void {
  }

  Buscando() {
    if (this.termino != "") {
      this.heroService.getSuggestionsId(this.termino.trim()).subscribe(heroes => {
        if (heroes.length > 0)
          this.heroes = heroes;
        else
          this.heroes = [];
      });
    }
    else
      this.heroes = [];
  }
  OpcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroSelected = undefined;
      return;
    }
    const heroe: Hero = event.option.value;
    this.termino = heroe.superhero;
    this.heroService
      .getHeroesById(heroe.id!)
      .subscribe(heroes => { this.heroSelected = heroes });
  }
}
