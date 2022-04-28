import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { ChangeWeightService } from '../../services/change-weight-service/change-weight.service';
import { interval, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IngredientParams } from '../main-page/main-page.component';

@Component({
  selector: 'app-weight-page',
  templateUrl: './weight-page.component.html',
  styleUrls: ['./weight-page.component.scss'],
})
export class WeightPageComponent implements OnChanges {

  @Input() currentWeightItem: IngredientParams;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  public item: IngredientParams;
  public currentWeight: number | string = 0;
  public currentWeightInPercent: number = 0;

  public subscription: Subscription;

  public isWeightButtonPushed: boolean = false;
  public isDoneWeight: boolean = false;

  constructor(
    public weightService: ChangeWeightService,
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentWeightItem.currentValue) {

      console.log(this.currentWeightItem)

      this.item = {...changes.currentWeightItem.currentValue};
      this.resetPreviousData();
    }
  }

  public startWeight(): void {
    this.isWeightButtonPushed = true;

    this.weightService.fillWeightsMock();

    this.subscription = interval(20)
      .pipe(
        take(this.weightService.userWeightsMock.length),
        map(i => this.weightService.userWeightsMock[i])
      ).subscribe(data => {
        this.currentWeight = data.toFixed(2);
        this.currentWeightInPercent = (data * 100)/this.currentWeightItem.amount.value;

        if (this.currentWeightInPercent >= 99.999) {
          this.applyDoneWeight();
        }
      })
  }

  public applyDoneWeight(): void {
    this.isDoneWeight = true;
    this.subscription.unsubscribe();
  }

  public saveResult() {
    this.change.emit(this.currentWeightItem);
  }

  private resetPreviousData() {
    this.isWeightButtonPushed = false;
    this.isDoneWeight = false;
    this.currentWeight = 0;
    this.currentWeightInPercent = 0;
  }

}
