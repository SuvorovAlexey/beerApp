import { Injectable } from '@angular/core';
import { Beer } from '../../pages/main-page/main-page.component';
import { ApiService } from '../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class BeerChangeService {

  public state: Beer[] = [];
  public currentBeer: Beer;

  constructor(
    private apiService: ApiService,
  ) {}

  public async getBeers(numberPage: number) {
    this.state = await this.apiService.getBeers(numberPage);
  }

  public setCurrentBeer(beer: Beer) {
    const chosenBeer: Beer | undefined =  this.state.find(item => {
      return beer.id === item.id;
    });

    if (chosenBeer) {
      this.currentBeer = chosenBeer;
    }
  }

  public getCurrentBeer(): Beer {
    return this.currentBeer;
  }

  // it`s simplest example of saving data without state controller(for example Redux) or backend;
  // Saved data will reset if user will fetch new beer pages;
  setWeightIngredientForBeer(ingredient: any, ingredientType: string) {
    const index: number = this.state.findIndex(beer => {
      return beer.id === this.currentBeer.id;
    })

    if (ingredientType === 'hops') {
      this.state[index].ingredients.hops.forEach((hops: any) => {
        //we need to use ID without NAME, but we don`t have this property
        if (hops.name === ingredient.name) {
          hops.wasWeight = true;
        }
      })
    }

    if (ingredientType === 'malt') {
      this.state[index].ingredients.malt.forEach((malt: any) => {
        //we need to use ID without NAME, but we don`t have this property
        if (malt.name === ingredient.name) {
          malt.wasWeight = true;
        }
      })
    }

  }

}
