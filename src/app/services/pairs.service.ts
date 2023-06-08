import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class PairsService {
    private apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';

    constructor(private http: HttpClient) {}

     getPair() : Observable<any> {
        return this.http.get<any>(this.apiUrl);
    } 
  }