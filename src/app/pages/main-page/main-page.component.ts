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
  public paginationArray: PaginationItem[] = [
    {
      number: 1,
      isPushed: false
    },
    {
      number: 2,
      isPushed: false
    },
    {
      number: 3,
      isPushed: false
    },
    {
      number: 4,
      isPushed: false
    },
    {
      number: 5,
      isPushed: false
    },
    {
      number: 6,
      isPushed: false
    },
    {
      number: 7,
      isPushed: false
    },
    {
      number: 8,
      isPushed: false
    },
    {
      number: 9,
      isPushed: false
    },
    {
      number: 10,
      isPushed: false
    },
    {
      number: 11,
      isPushed: false
    },
  ]

  constructor(
    private router: Router,
    private beerChangeService: BeerChangeService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  private async loadData() {
    if (this.beerChangeService.state.length === 0) {
      await this.pushPaginationButton(1);
      this.beers = [...this.beerChangeService.state];
    }
    else {
      this.beers = [...this.beerChangeService.state];
    }
  }

  public async openBeerInfo(beer: Beer): Promise<void> {
    this.beerChangeService.setCurrentBeer(beer);
    await this.router.navigate(['/beer-page']);
  }

  public async pushPaginationButton(numberOfButton: number): Promise<void> {
    await this.beerChangeService.getBeers(numberOfButton);
    this.beers = [...this.beerChangeService.state];

    this.paginationArray.forEach(item => {
      if (numberOfButton === item.number) {
        item.isPushed = true;
      }
      else {
        item.isPushed = false;
      }
    });
  }

}
