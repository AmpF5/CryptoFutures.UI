import { Component, OnInit, Input } from '@angular/core';
import { switchMap } from 'rxjs';
import { FuturePosition } from 'src/app/models/futures-position';
import { FuturesPositionService } from '../../services/futures-position.service';

@Component({
  selector: 'app-positons-table',
  templateUrl: './positons-table.component.html',
  styleUrls: ['./positons-table.component.css']
})
export class PositonsTableComponent implements OnInit {
  positionToCreate: FuturePosition;
  id: number;
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
  
}
