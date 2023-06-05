import { Component } from '@angular/core';
import { FuturePosition } from './models/futures-position';
import { FuturesPositionService } from './services/futures-position.service';
import { BalanceService } from './services/balance.service';
import { Balance } from './models/balance';
import { Subscription, switchMap } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template:`
  <!-- <h1> TST </h1> -->
  <!-- <h1> Balance {{balance}}</h1> -->
  <!-- <app-positons-table  [futuresPosition]="futuresPosition" ></app-positons-table>
  <app-post-position (positionsUpdated)="updatePositionList($event)"></app-post-position> -->
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
  
   refreshData() {
    this.balanceService.postBalance().subscribe((result: Balance) => (this.balance = result));
  }

   updateBalance() {
    this.balanceService.putBalance(1000).subscribe((result: Balance) => (this.balance = result))
  }

   initNewPosition() {
    this.positionToCreate = new FuturePosition();
  }

  updatePositionList(positions: FuturePosition[] | FuturePosition) {
    if (Array.isArray(positions)) {
      this.futuresPosition = positions;
    } else {
      this.futuresPosition.push(positions);
    }
    console.log('futuresPosition updated:', this.futuresPosition);
  }

  getFuturesPositions() {
    this.futurePositionService.getFuturesPositions().subscribe((result: FuturePosition[]) => {
      this.futuresPosition = result;
    });
  }
}
