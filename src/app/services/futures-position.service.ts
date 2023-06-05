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

  getFuturesPositions() : Observable<FuturePosition[]>{
    const options = { withCredentials: true };
    console.log(`${environment.apiUrl}/${this.url}/position/all`);
    return this.http.get<FuturePosition[]>(`${environment.apiUrl}/${this.url}/position/all`, options);
  }
  
  postFuturePosition(position: FuturePosition) : Observable<FuturePosition>{
    const options = { withCredentials: true };
    return this.http.post<FuturePosition>(`${environment.apiUrl}/${this.url}`, position, options);
  }

  closeFuturesPosition(id: number) : Observable<FuturePosition>{
    const options = { withCredentials: true };
    console.log(`${environment.apiUrl}/${this.url}/position/${id}`)
    return this.http.delete<FuturePosition>(`${environment.apiUrl}/${this.url}/position/${id}`, options)
  }
}
