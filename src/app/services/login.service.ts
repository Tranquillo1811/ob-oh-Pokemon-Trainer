import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {finalize, map} from 'rxjs/operators';

import { environment } from '../../environments/environment'
import { Trainer } from '../models/pokemon.model';

const { pokemonTrainerApiBaseUrl: pokemonApiBaseUrl } = environment;
const { pokemonTrainer } = environment;

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private _trainer: Trainer | undefined;
    private _error: string = '';
    private _test: string = "";

    constructor(private readonly http: HttpClient) { }

    // Login User
    public login(username: string): void {
        this._test = "Singleton";
        this._error = '';
        
        this.http.get<Trainer[]>(`${pokemonApiBaseUrl}?username=${username}`)
          .pipe(
            map((response: Trainer[]) => {
              if (response.length === 0) {
                throw Error(`User ${username} was not found.`);
              }
              const trainer = response.pop();
              console.log(`Trainer: ${trainer}`);
              return trainer;
            }),
            finalize(() => {
              console.log('Finish loading');
            })
          )
          .subscribe({
            next: (response) => {
                this._trainer = response;
                localStorage.setItem(pokemonTrainer, JSON.stringify(this.trainer));
                console.log(`current trainer: ${this.trainer}`);
            },
            error: (error) => {
                this._error = error.message;
            }
          }), (error: HttpErrorResponse) => {
            
          };
      }    

    get test(): string {
      return this._test;
    }
    get trainer(): Trainer | undefined {
      //console.log(`current trainer: ${this._trainer}`);
      return this._trainer;
    }  

    public getError(): string {
        return this._error;
    }
}