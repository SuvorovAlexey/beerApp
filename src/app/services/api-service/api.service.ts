import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  public async getBeers(pageNumber: number): Promise<any> {
    const response = await fetch(`https://api.punkapi.com/v2/beers?page=${pageNumber}&per_page=30`);
    if (response.ok) {
      return response.json();
    }
    else {
      alert(`Something went wrong.`)
    }
  }
}
