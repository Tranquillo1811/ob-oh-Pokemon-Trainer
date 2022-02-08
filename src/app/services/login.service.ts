import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { finalize, map} from 'rxjs/operators';
import { catchError, Observable, of, tap, throwError  } from 'rxjs';

import { environment } from '../../environments/environment'
import { Trainer } from '../models/pokemon.model';

import { RegisterService } from "./register.service";

const { pokemonApiBaseUrl } = environment;
const { pokemonSessionKeyUser } = environment;

@Injectable({
    providedIn: 'root'
  })

export class LoginService {
    private _trainer: Trainer | undefined;
    private _error: string = '';
    private registerError: string = ""

    private createHeaders(): HttpHeaders {
      return new HttpHeaders({
          'Content-Type': 'application/json',
          'x-api-key': 'xLZ/ENQNQUyhPD0eNtEGYw=='
      })
    }

    constructor(private readonly http: HttpClient, 
      private router: Router,
      private registerService: RegisterService) { 
    }

    // Login User
    public login(username: string): void {
        this._error = '';
        
        this.http.get<Trainer[]>(`${pokemonApiBaseUrl}?username=${username}`)
          .pipe(
            map((response: Trainer[]) => {
              if (response.length === 0) {
                throw new Error(`User ${username} was not found.`);
              }
              return response.pop();
            }),
            finalize(() => {
            })
          )
          .subscribe({
            next: (response) => {
                this._trainer = response;
                localStorage.setItem(pokemonSessionKeyUser, JSON.stringify(this._trainer));
                console.log(this._trainer);

                this.router.navigateByUrl("/catalogue");
            },
            error: (error) => {
                // User does not exists. Register user
                // this._error = error.message;
                this.registerService.newRegister(username).subscribe({
                  next: (response: boolean) => {
                    // Assume it was successful
                    console.log('REGISTER:', response);

                    // Try login again after user registered.
                    // New http request
                    this.login(username);
                  },
                  error: (error) => {
                    this.registerError = error;
                    this._error = error.message;
                  }
                });
            }
          }), (error: HttpErrorResponse) => {
          };
      }    

    get Trainer(): Trainer | undefined {
        return this._trainer;
    } 
    
    public setError(error: string): void {
      this._error = error;
    }

    public getError(): string {
        return this._error;
    }
}