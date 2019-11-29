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
    {symbol: 'abc', price: 33.2, value: 0.0, quantity:0, currentAllocation: 0, futureAllocation: 0, changesNeeded: 'None' },
    {symbol: 'xyz', price: 33.2, value: 0.0, quantity:0, currentAllocation: 0, futureAllocation: 0, changesNeeded: 'None' }
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
      stock.quantity = stock.value == 0 ? 0 : (stock.value / stock.price);

      //increase stock value to total present value
      this.totalPresentValue += stock.value;
    }

    //calculate current allocation of each asset/stock
    for (let stock of this.stocks){
      stock.currentAllocation = (((stock.value * 100) / this.totalPresentValue)) / 100;
    }

    //calculate changes needed based on future allocation
    //todo: add support for additon and substrating of cash from total balance
    for (let stock of this.stocks){
      let futureAllocationPercent = stock.futureAllocation / 100;
      let futureVal = this.totalPresentValue * futureAllocationPercent;
      if (stock.value > futureVal){
        stock.changesNeeded = "-" + (stock.value - futureVal);
      }else if (stock.value < futureVal){
        stock.changesNeeded = "+" + (futureVal - stock.value);
      }else{
        stock.changesNeeded = "None"
      }
    }

  }


}
