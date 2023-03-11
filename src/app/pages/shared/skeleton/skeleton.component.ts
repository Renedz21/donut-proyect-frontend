import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent {

  @Input() lines?: number;

  get linesArray() {
    return new Array(this.lines || 0);
  }
}
