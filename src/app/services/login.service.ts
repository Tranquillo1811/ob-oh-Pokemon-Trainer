import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {finalize, map} from 'rxjs/operators';

import { environment } from '../../environments/environment'
import { Trainer } from '../models/pokemon.model';

const {pokemonApiBaseUrl} = environment;

@Injectable({
    providedIn: 'root'
  })

export class LoginService {
    private _trainer: Trainer | undefined;
    private _error: string = '';

    constructor(private readonly http: HttpClient) { }

    public login(username: string): void {
        this._error = '';
        
        this.http.get<Trainer[]>(`${pokemonApiBaseUrl}?username=${username}`)
          .pipe(
            map((response: Trainer[]) => {
              if (response.length === 0) {
                throw Error(`User ${username} was not found.`);
              }
              return response.pop();
            }),
            finalize(() => {
              console.log('Finish loading');
            })
          )
          .subscribe({
            next: (response) => {
                this._trainer = response;

                console.log(this._trainer);
            },
            error: (error) => {
                this._error = error.message;
            }
          }), (error: HttpErrorResponse) => {
            
          };
      }    

    public getTrainer(): any {
        return this._trainer;
    }  

    public getError(): string {
        return this._error;
    }
}