import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`.container{margin:10px;}`
  ]
})
export class HomeComponent implements OnInit {

  constructor(private service:HeroesService) { }

  ngOnInit(): void {
   // this.service.GetTest();
  }

}
