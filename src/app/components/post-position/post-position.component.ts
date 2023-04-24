import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FuturePosition } from 'src/app/models/futures-position';
import { FuturesPositionService } from 'src/app/services/futures-position.service';

@Component({
  selector: 'app-post-position',
  templateUrl: './post-position.component.html',
  styleUrls: ['./post-position.component.css']
})
export class PostPositionComponent implements OnInit {
  @Input() position?: FuturePosition;
  @Output() positionsUpdated = new EventEmitter<FuturePosition[]>();


  constructor(private futuresPositionService: FuturesPositionService) { }

  ngOnInit(): void {

  }

  postPosition(position: FuturePosition) {
    this.futuresPositionService.postFuturePosition(position).subscribe((positions: FuturePosition[]) => this.positionsUpdated.emit(positions));
  }
}
