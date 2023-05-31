import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { FuturePosition } from 'src/app/models/futures-position';
import { FuturesPositionService } from '../../services/futures-position.service';


@Component({
  selector: 'app-positons-table',
  templateUrl: './positons-table.component.html',
  styleUrls: ['./positons-table.component.css']
})
export class PositonsTableComponent implements OnInit {
  futuresPosition: FuturePosition[] = [];
  positionToCreate: FuturePosition;
  id: number;
  constructor(private futurePositionService: FuturesPositionService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.futurePositionService.getFuturesPositions().subscribe((result: FuturePosition[]) => (this.futuresPosition = result));
  }

  // public closePosition(id:number) {
  //   this.futurePositionService.closeFuturesPosition(id).subscribe();
  //   this.futurePositionService.getFuturesPositions().subscribe((result: FuturePosition[]) => (this.futuresPosition = result));
  // }
  public closePosition(id: number) {
    this.futurePositionService.closeFuturesPosition(id)
      .pipe(
        switchMap(() => this.futurePositionService.getFuturesPositions())
      )
      .subscribe((result: FuturePosition[]) => {
        this.futuresPosition = result;
      });
  }
  
}
