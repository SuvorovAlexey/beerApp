import { Component } from '@angular/core';
import { BeerChangeService } from '../../services/beer-change-service/beer-change.service';
import { Beer, IngredientParams } from '../main-page/main-page.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beer-page',
  templateUrl: './beer-page.component.html',
  styleUrls: ['./beer-page.component.scss'],
})
export class BeerPageComponent {

  public beer: Beer;
  public isOpenWeightScreen: boolean = false;
  public currentWeightItem: IngredientParams;
  public currentIngredientType: string = '';

  public wasWeightIngredient: boolean = false;

  constructor(
    private beerChangeService: BeerChangeService,
    private router: Router,
  ) {
    this.beer = this.beerChangeService.getCurrentBeer();
  }

  public async openWeightScreen(ingredientItem: IngredientParams, typeOfIngredient: string) {
    this.isOpenWeightScreen = true;
    this.currentWeightItem = ingredientItem;
    this.currentIngredientType = typeOfIngredient;
  }

  public updateData(ingredient: IngredientParams) {
    this.wasWeightIngredient = true;

    //I prefer to use ID but there is none, so I use NAME
    if (this.currentIngredientType === 'hops') {
      const result = this.beer.ingredients.hops.find((hops: IngredientParams) => {
        return ingredient.name === hops.name;
      })

      if (result) {
        result.wasWeight = true;
      }
    }

    if (this.currentIngredientType === 'malt') {
      const result = this.beer.ingredients.malt.find((malt: IngredientParams) => {
        return ingredient.name === malt.name;
      })

      if (result) {
        result.wasWeight = true;
      }
    }

    this.beerChangeService.setWeightIngredientForBeer(ingredient, this.currentIngredientType);
  }

  public async goHome(): Promise<void> {
    await this.router.navigate(['/main-page']);
  }

}
