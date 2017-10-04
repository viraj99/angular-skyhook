import { Input, Component, OnInit } from '@angular/core';
import { DndService } from 'angular-hovercraft';
import { ItemTypes } from './item-types';

@Component({
  selector: 'app-nested-targets-dustbin',
  template: `
  <ng-container *ngIf="collected$ | async as c">
    <div [dropTarget]="target" class="box" [style.background-color]="getColor(c)" >

      <p>{{ greedy ? 'greedy' : 'not greedy' }}</p>

      <p *ngIf="hasDroppedOnChild || hasDropped">{{'dropped' + (hasDroppedOnChild ? ' on child' : '')}}</p>

      <ng-content select="app-nested-targets-dustbin"></ng-content>

    </div>
  </ng-container>
  `,
  styles: [
    `
    p {
      margin: 0; padding: 2px;
    }
    .box {
      border: 1px solid rgba(0,0,0,0.2);
      min-height: 8rem;
      min-width: 8rem;
      color: white;
      padding: 2rem;
      padding-top: 1rem;
      margin: 1rem;
      text-align: center;
      float: left;
      font-size: 1rem;
      background-color: rgba(0,0,0,0.5);
    }
    `
  ]
})
export class Dustbin {

  @Input() greedy = false;

  hasDropped = false;
  hasDroppedOnChild = false;

  text() {
    return this.hasDropped && `dropped${ this.hasDroppedOnChild ? ' on child' : ''}` || '';
  }

  lastDroppedColor: string;
  backgroundColor: string;
  target = this.dnd.dropTarget({
    types: ItemTypes.BOX,
    drop: (monitor) => {
      const hasDroppedOnChild = monitor.didDrop();
      if (hasDroppedOnChild && !this.greedy) {
        return;
      }
  
      this.hasDropped = true,
      this.hasDroppedOnChild = hasDroppedOnChild;
      // this.color = monitor.getItemType() as string;
    }
  });
  collected$ = this.target.collect(monitor => ({
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
  }));
  getColor({ isOver, isOverCurrent}) {
    if (isOverCurrent || (isOver && this.greedy)) {
      return 'darkgreen';
    }
  }

  constructor (private dnd: DndService) {}
}

