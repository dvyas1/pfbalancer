import {Component, OnInit} from '@angular/core';

import { Stock } from './stock';
import { FinancialService } from './financial.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Portfolio Balancer';

  stocks: Stock[] = [
    {symbol: 'abc', price: 33.2, value: 0.0, quantity:0, currentAllocation: '0%', futureAllocation: '', changesNeeded: 'None' },
    {symbol: 'xyz', price: 33.2, value: 0.0, quantity:0, currentAllocation: '0%', futureAllocation: '', changesNeeded: 'None' }
  ];
  totalPresentValue: number = 0.0;

  constructor(private financialSv: FinancialService) {}

  ngOnInit(): void {
  }


  /**
   * This function removes stock from master stock list
   * @param stkSymble = Stock symbol to be removed
   */
  removeStock( stkSymble: string ): void {
    console.log('Removing Stock: ' + stkSymble);
    let idx = this.stocks.findIndex(stock => stock.symbol ==  stkSymble);
    this.stocks.splice(idx, 1);
  }

  /**
   * This function and empty row for a new stock
   */
  addStock(): void {
    console.log('Adding new stock line');
    let stk: Stock = new Stock();
    this.stocks.push(stk);
  }

  /**
   * Master function to perform calculation and recommand changes
   */
  performCalculations(): void {
    console.log('Performing calculations');
    this.fillStockParameters();
    
  }

  // todo: start here
  private fillStockParameters(): void {
    console.log(this.financialSv.getCurrentPrice("tt"));
    
    //set total present value to 0 as we will be calculating it again below
    this.totalPresentValue = 0.0;

    for (let stock of this.stocks){
      stock.price = this.financialSv.getCurrentPrice(stock.symbol);
      stock.quantity = stock.value == 0 ? 0 : (stock.quantity / stock.price);

      //increase stock value to total present value
      this.totalPresentValue += stock.value;
    }

  }


}
