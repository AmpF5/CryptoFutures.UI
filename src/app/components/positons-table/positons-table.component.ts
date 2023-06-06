import { Component, OnInit, Input } from '@angular/core';
import { switchMap } from 'rxjs';
import { FuturePosition, OrderType } from 'src/app/models/futures-position';
import { FuturesPositionService } from '../../services/futures-position.service';
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
  id: number;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  clickedRows = new Set<PeriodicElement>();
  @Input() futuresPosition: FuturePosition[] = [];
  constructor(private futurePositionService: FuturesPositionService) { }

  ngOnInit(): void {
    this.futurePositionService.getFuturesPositions().subscribe((result: FuturePosition[]) => (this.futuresPosition = result));
  }

  closePosition(id: number) {
    this.futurePositionService.closeFuturesPosition(id)
      .pipe(
        switchMap(() => this.futurePositionService.getFuturesPositions())
      )
      .subscribe((result: FuturePosition[]) => {
        this.futuresPosition = result;
      });
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
