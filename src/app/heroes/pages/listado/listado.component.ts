import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {
  Heroes: Hero[] = [];
  constructor(private heroesServices: HeroesService) { }

  ngOnInit(): void {
    this.heroesServices.getHeroes()
      .subscribe(heroes => this.Heroes = heroes);
  }

}
