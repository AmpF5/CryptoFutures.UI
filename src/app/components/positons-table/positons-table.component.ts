import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { switchMap } from 'rxjs';
import { FuturePosition, OrderType } from 'src/app/models/futures-position';
import { FuturesPositionService } from '../../services/futures-position.service';
import { BalanceService } from 'src/app/services/balance.service';
import { Balance } from 'src/app/models/balance';
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
  profit: number = 0;
  id: number;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  clickedRows = new Set<PeriodicElement>();
  @Input() futuresPosition: FuturePosition[] = [];
  @Output() balanceUpdate = new EventEmitter<Balance>();
  constructor(private futurePositionService: FuturesPositionService, private balanceService: BalanceService) { }

  ngOnInit(): void {
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
