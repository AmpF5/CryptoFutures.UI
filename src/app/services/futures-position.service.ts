import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuturePosition } from '../models/futures-position';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FuturesPositionService {
  private url = "FuturesPosition";

  constructor(private http: HttpClient ) { }

  public getFuturesPositions() : Observable<FuturePosition[]>{
    return this.http.get<FuturePosition[]>(`${environment.apiUrl}/${this.url}`);

  } 
}
