import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`.container{margin:10px;}`
  ]
})
export class HomeComponent implements OnInit {

  constructor(private service: HeroesService, private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
    // this.service.GetTest();
  }


  logout() {
   this.auth.logout();
    this.router.navigate(['./auth/login'])
  }

}
