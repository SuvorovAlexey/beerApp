import { Component, OnInit } from '@angular/core';
import { BeerChangeService } from '../../services/beer-change-service/beer-change.service';
import { Router } from '@angular/router';

export interface Beer {
  abv: number,
  attenuation_level: number,
  boil_volume: ValueUnit,
  brewers_tips: string,
  contributed_by: string,
  description: string,
  ebc: number,
  first_brewed: string,
  food_pairing: string[],
  ibu: number,
  id: number,
  image_url: string,
  ingredients: Ingredients,
  method: Method,
  name: string,
  ph: number,
  srm: number,
  tagline: string,
  target_fg: number,
  target_og: number,
  volume: ValueUnit
}

export interface Method {
  fermentation : {
    temp: ValueUnit
  },
  mash_temp: [
    {
      duration: number,
      temp: ValueUnit
    }
  ]
}

export interface Ingredients {
  hops: IngredientParams[];
  malt: IngredientParams[];
}

export interface IngredientParams {
  name: string,
  amount: ValueUnit,
  add?: string,
  attribute?: string,
  wasWeight?: boolean,
}

export interface ValueUnit {
  unit: string,
  value: number,
}

interface PaginationItem {
  number: number,
  isPushed: boolean,
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public beers: Beer[] = [];
  public paginationArray: PaginationItem[] = [];
  public currentPaginationPage: number = 1;

  constructor(
    private router: Router,
    private beerChangeService: BeerChangeService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  private async loadData(): Promise<void> {
    this.fillPaginationArray();

    if (this.beerChangeService.state.length === 0) {
      await this.beerChangeService.getBeers(this.currentPaginationPage);
      this.beers = [...this.beerChangeService.state];
      this.paginationArray[0].isPushed = true;
    }
    else {
      this.beers = [...this.beerChangeService.state];
    }
  }

  private fillPaginationArray(): void {
    for (let i = 1; i <= 11; i++) {
      this.paginationArray.push(
        {
          number: i,
          isPushed: false,
        }
      );
    }
  }

  public async openBeerInfo(beer: Beer): Promise<void> {
    this.beerChangeService.setCurrentBeer(beer);
    await this.router.navigate(['/beer-page']);
  }

  public async pushPaginationButton(numberOfButton: number): Promise<void> {
    this.currentPaginationPage = numberOfButton;
    await this.beerChangeService.getBeers(numberOfButton);
    this.beers = [...this.beerChangeService.state];

    this.paginationArray.forEach(item => {
      item.isPushed = false;
    });

    this.paginationArray[this.currentPaginationPage - 1].isPushed = true;
  }

}
