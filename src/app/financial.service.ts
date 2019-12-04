import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  constructor() { }

  /**
   * todo: fill the logic
   * This method returns current price of the stock
   */
  getCurrentPrice(stockSymbol: string): number {
    return 10.0;
  }
}
