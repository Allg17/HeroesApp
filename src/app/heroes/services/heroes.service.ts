import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { forkJoin, map, mergeMap } from 'rxjs';
// import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;
  // private baseUrl1: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }
  getHeroesById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`);
  }

  getSuggestionsId(id: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${id}&_limit=6`);
  }

  PostHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  PutHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  DeleteHero(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`);
  }














  hero: Hero[] = [];
  GetTest() {
    this.http.get<Hero[]>(`${this.baseUrl}/heroes`).pipe(
      map(user => {
        this.hero = user;
        return user[0];
      }),
      mergeMap(users => {
        console.log(users);
        const userid = this.http.get<Hero>(`${this.baseUrl}/heroes/dc-arrow`);
        const herolimit = this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=bat&_limit=6`)
        return forkJoin(userid, herolimit);
      })
    ).subscribe(res => {
      console.log("posr 0 " + res[0]);
      console.log("posr 1 " + res[1]);
    })
  }
}
