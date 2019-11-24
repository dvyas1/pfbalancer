export class Stock {

  symbol: string;
  price: number;
  quantity: number;
  value: number;
  currentAllocation: string;
  futureAllocation: string;
  changesNeeded: string;


  static validateRequiredVals(): boolean {
    console.log('Validating Stock required field');
    return true;
  }

}

