import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map} from 'rxjs/operators';
import { catchError, of, tap, throwError  } from 'rxjs';

import { environment } from '../../environments/environment'
import { TrainerPagePage } from '../pages/trainer-page/trainer-page.page';
import { Trainer, TrainerResponse } from '../models/pokemon.model';

const {pokemonApiBaseUrl} = environment;
const { pokemonSessionKeyUser } = environment;

@Injectable({
    providedIn: 'root'
})

export class RegisterService {

    constructor(private http: HttpClient) {}

    private createHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': 'xLZ/ENQNQUyhPD0eNtEGYw=='
        })
    }

    // Create a new user
    register(username: string): Observable<any> {
        const user = {
            username, pokemon: []
        }

        const headers = this.createHeaders();

        return this.http.post(`${pokemonApiBaseUrl}`, user, {
            headers
        })
    }

    // Register new user
    newRegister(username: string): Observable<boolean>{
        const user = {
            username, pokemon: []
        }

        const headers = this.createHeaders();

        return this.http
        .post<TrainerResponse<Trainer>>(`${pokemonApiBaseUrl}`, user, {
          headers,
        })
        .pipe(
  
          tap((response) => {
  
            if (response.success === false) {
              // Throw a new error to be handled in the catchError()
              throwError(() => new Error(response.error));
            }
            // Cause side effects in a tap. (like saving to storage).
            const user: Trainer = response.data;
            // localStorage.setItem(pokemonSessionKeyUser, JSON.stringify(user));
  
            // Note: Tap can not change the response, so no return is allowed.
          }),
  
          map((response: TrainerResponse<Trainer>) => {
            // Skips if there was an error thrown
            return response.success
          }),
          
          // Catch the error and use the "of" operator 
          // Throw the message we want to display in the component.
          catchError((error) => {
            throw error.error.error;
          })
        );           
    }
}

