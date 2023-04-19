import { Component } from '@angular/core';
import { FuturePosition } from './models/futures-position';
import { FuturesPositionService } from './services/futures-position.service';
import { BalanceService } from './services/balance.service';
import { Balance } from './models/balance';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  template:`
  <h1> Balance {{balance}}</h1>

  `,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CryptoFutures.UI';
  futuresPosition: FuturePosition[] = [];
  balance: Balance;
  private dataSubscription: Subscription;

  constructor(private futurePositionService: FuturesPositionService, private balanceService: BalanceService) {}

  ngOnInit()  {
    this.futurePositionService.getFuturesPositions().subscribe((result: FuturePosition[]) => (this.futuresPosition = result));
    this.balanceService.postBalance().subscribe((result: Balance) => (this.balance = result));
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
  
  public refreshData() {
    this.balanceService.postBalance().subscribe((result: Balance) => (this.balance = result));
    
  }
  // onAddData() {
  //   this.balanceService.addData().subscribe(
  //     (response: any) => console.log(response),
  //     (error: any) => console.log(error)
  //   );
  // }
  
}
