import { Injectable } from '@angular/core';

import { Stock} from './stock';

@Injectable({
  providedIn: 'root'
})
export class FinancialsService {

  constructor() { }

  /**
   * todo: fill the logic
   * This method returns current price of the stock
   * @param stockSymbol
   */
  getCurrentPrice(stockSymbol: string): number {
    return 10.0;
  }

}
