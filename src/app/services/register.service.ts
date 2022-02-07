import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment'

const {pokemonApiBaseUrl} = environment;

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
}