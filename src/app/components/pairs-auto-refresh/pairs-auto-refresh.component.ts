import { Component, OnInit } from '@angular/core';
import { Observable, interval, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-pairs-auto-refresh',
  templateUrl: './pairs-auto-refresh.component.html',
  styleUrls: ['./pairs-auto-refresh.component.css']
})
export class PairsAutoRefreshComponent implements OnInit {
  private refreshInterval = 20000;
  price: number;
  private apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPairPrice();
    this.startAutoRefresh();
  }

  private startAutoRefresh(): void {
    interval(this.refreshInterval)
    .pipe(
      switchMap(() => this.getPair())
    )
    .subscribe(
      (response: any) => {
        this.price = response.bitcoin.usd;
        console.log(this.price)
        console.log('API call successful:', response);
      }
    )
  }

  getPairPrice() : void {
    this.getPair().subscribe((result: any) => this.price = result.bitcoin.usd);
  }

  private getPair() : Observable<number> {
    return this.http.get<number>(this.apiUrl);
  }

}
