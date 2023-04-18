import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Balance } from '../models/balance';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
  })
  export class BalanceService {
    private url = "Balance";
    constructor(private http: HttpClient) {}
    
    postBalance() : Observable<Balance> {
        const options = { withCredentials: true };
        // const headers = new HttpHeaders({
            //     'Content-Type' : 'application/json'
        // });
        const balance: Balance = {value: 100};
        return this.http.post<Balance>(`${environment.apiUrl}/${this.url}`, balance);
    }

    putBalance(value: number) : Observable<Balance> {
        const options = { withCredentials: true };
        return this.http.put<Balance>(`${environment.apiUrl}/${this.url}?amount=${value}`, value, options);
    }
  }