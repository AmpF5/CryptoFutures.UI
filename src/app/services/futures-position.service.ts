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
    const options = { withCredentials: true };
    return this.http.get<FuturePosition[]>(`${environment.apiUrl}/${this.url}/position/all`, options);
  }
  
  public postFuturePosition(position: FuturePosition) : Observable<FuturePosition[]>{
    const options = { withCredentials: true };
    return this.http.post<FuturePosition[]>(`${environment.apiUrl}/${this.url}`, position, options);
  }
}
