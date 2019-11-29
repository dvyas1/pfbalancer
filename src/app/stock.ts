/**
 * This clas represents a stock/asset
 */
export class Stock {

  symbol: string;
  price: number;
  quantity: number;
  value: number;
  currentAllocation: number;
  futureAllocation: number;
  changesNeeded: string;


  static validateRequiredVals(): boolean {
    console.log('Validating Stock required field');
    return true;
  }

}

