import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http:HttpClient) { }

  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>('http://localhost:3000/heroes');
  }
  getHeroesById(id:string):Observable<Hero>
  {
    return this.http.get<Hero>(`http://localhost:3000/heroes/${id}`);
  }
}
