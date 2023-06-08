import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { interval, switchMap } from 'rxjs';
import { FuturePosition, OrderType } from 'src/app/models/futures-position';
import { FuturesPositionService } from '../../services/futures-position.service';
import { Balance } from 'src/app/models/balance';
import { PairsService } from 'src/app/services/pairs.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-positons-table',
  templateUrl: './positons-table.component.html',
  styleUrls: ['./positons-table.component.css'],
  
})

export class PositonsTableComponent implements OnInit {
  positionToCreate: FuturePosition;
  pairPrice: number = 0;
  profit: number = 0;
  refreshInterval = 20000;
  id: number;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  clickedRows = new Set<PeriodicElement>();
  @Input() futuresPosition: FuturePosition[] = [];
  @Output() balanceUpdate = new EventEmitter<Balance>();
  constructor(private futurePositionService: FuturesPositionService, private pairsService: PairsService) { }

  ngOnInit(): void {
    this.getPairPrice();
    this.getPairPriceAutoRefresh();
    this.futurePositionService.getFuturesPositions().subscribe((result: FuturePosition[]) => (this.futuresPosition = result));
  }

  closePosition(id: number) {
    this.futurePositionService.closeFuturesPosition(id)
    .pipe(
      switchMap(() => this.futurePositionService.getFuturesPositions()),
      )
      .subscribe((result: FuturePosition[]) => {
        this.futuresPosition = result;
        console.log(result)
        
      });  
  }

  getProfitFromPosition(id: number | undefined): number {
    if(id !== undefined) {
      const position = this.futuresPosition.find(position => position.id === id);
      if(position) {
        return position.total;
      }
    }
    return 0;
  }

  getPairPrice() {
    this.pairsService.getPair().subscribe((result: any) => this.pairPrice = result.bitcoin.usd);
  }
  

  getPairPriceAutoRefresh() {
    interval(this.refreshInterval)
    .pipe(
      switchMap(() => this.pairsService.getPair())
    )
    .subscribe(
      (response: any) => {
        console.log("getPairPriceAutoRefresh")
        this.pairPrice = response.bitcoin.usd;
      }
    )
  }

  getProfitFromPair(position: FuturePosition) {
    const entryPrice = position.price;
    const currentPrice = this.pairPrice;
    return this.profit = (currentPrice - entryPrice) * position.leverage;
  }

  getPositionType(position: FuturePosition) {
    if (position.orderType === OrderType.Short) {
      return "SHORT";
    }
    return "LONG";
  }

  isLong(position: any): boolean {
    return position.orderType === OrderType.Long;
  }
  
  isShort(position: any): boolean {
    return position.orderType === OrderType.Short;
  }
  
}
