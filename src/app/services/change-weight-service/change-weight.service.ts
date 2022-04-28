import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeWeightService {

  public userWeightsMock: number[] = [];

  constructor() { }

  public fillWeightsMock() {
    this.userWeightsMock = [];
    let weightCount: number = 0;

    //50 is max value for my mock data
    while (weightCount <= 50) {
      //
      weightCount = weightCount + Math.random() * (0.05 - 0.005) + 0.05;
      this.userWeightsMock.push(weightCount);
    }
  }

}
