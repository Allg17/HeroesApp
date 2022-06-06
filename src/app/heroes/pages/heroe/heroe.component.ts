import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
  img{
    width:100%;
    border-radius:5px;
    height:60%;
  }`
  ]
})
export class HeroeComponent implements OnInit {
  heroe!: Hero;
  constructor(private activatedRoute: ActivatedRoute, private heroService: HeroesService, private router:Router) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(({ id }) => {
    //   this.heroService.getHeroesById(id).subscribe(resp => {
    //     this.heroe = resp;
    //   });
    // });

    this.activatedRoute.params.pipe(
      switchMap(({ id }) =>
        this.heroService.getHeroesById(id)
      )
    ).subscribe(resp => {
      this.heroe = resp;
    });
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}
