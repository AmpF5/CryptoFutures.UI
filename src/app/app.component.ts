import { Component } from '@angular/core';
import { FuturePosition } from './models/futures-position';
import { FuturesPositionService } from './services/futures-position.service';
import { BalanceService } from './services/balance.service';
import { Balance } from './models/balance';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template:`
  <h1> Balance {{balance}}</h1>
  <app-post-position (positionsUpdated)="handlePositionsUpdated($event)"></app-post-position>

  `,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CryptoFutures.UI';
  futuresPosition: FuturePosition[] = [];
  balance: Balance;
  private dataSubscription: Subscription;
  positionToCreate: FuturePosition;
  id: number;

  constructor(private futurePositionService: FuturesPositionService, private balanceService: BalanceService, private cdr: ChangeDetectorRef) {}

  ngOnInit()  {
    // this.futurePositionService.getFuturesPositions().subscribe((result: FuturePosition[]) => (this.futuresPosition = result));
    this.getFuturesPositions();
    this.balanceService.postBalance().subscribe((result: Balance) => (this.balance = result));
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
  
  public refreshData() {
    this.balanceService.postBalance().subscribe((result: Balance) => (this.balance = result));
  }

  public updateBalance() {
    this.balanceService.putBalance(1000).subscribe((result: Balance) => (this.balance = result))
  }

  public initNewPosition() {
    let p = this.positionToCreate = new FuturePosition();
  }

  getFuturesPositions() {
    this.futurePositionService.getFuturesPositions().subscribe((result: FuturePosition[]) => (this.futuresPosition = result));
  }

  // public async closePosition(id:number) {
  //   this.futurePositionService.closeFuturesPosition(id).subscribe();
  // }
  
}
