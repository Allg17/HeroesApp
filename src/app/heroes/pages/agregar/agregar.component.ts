import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { ConfirmComponent } from '../../Components/confirm/confirm.component';

import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width: 100%;
    border-radius: 5px;
  }`
  ]
})
export class AgregarComponent implements OnInit {
  heroe = <Hero>{};
  constructor(private activatedRoute: ActivatedRoute,
    private heroService: HeroesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    if (this.router.url.includes('editar'))
      this.activatedRoute.params.pipe(
        switchMap(({ id }) =>
          this.heroService.getHeroesById(id)),
        catchError(error => of(error)))
        .subscribe(res => this.heroe = res)
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0)
      return;

    if (this.heroe.id) {
      this.heroService
        .PutHero(this.heroe)
        .subscribe(res => {
          this.heroe = res;
          this.MostrarSnackBar('Registro Actualizado')
        })
    }
    else {
      this.heroService
        .PostHero(this.heroe)
        .subscribe(res => {
          this.router.navigate(['/heroes/editar', res.id]);
          this.MostrarSnackBar('Registro Creado');
        })
    }
  }

  borrarHeroe() {

    const dial = this.dialog.open(ConfirmComponent, ({
      width: '250px',
      data: { ...this.heroe } // esto es para que si se modifica algo, no se modifique esta propiedad, ya que todo se pasa por referencia.
    }));

    dial.afterClosed().subscribe(res => {
      if (res)
        if (this.heroe.id) {
          this.heroService
            .DeleteHero(this.heroe.id)
            .subscribe(res => {
              this.router.navigate(['/heroes']);
              this.MostrarSnackBar('Registro Borrado')
            });
        }
    })
  }

  MostrarSnackBar(msg: string): void {
    this._snackBar.open(msg, 'Ok!', ({
      duration: 2500
    }));
  }
}
