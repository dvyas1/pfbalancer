import {Component, OnInit} from '@angular/core';

import { Stock } from './stock';
import { FinancialsService} from './financials.service';

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

  constructor( private financialService: FinancialsService) {}

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

  addStock(): void {
    console.log('Adding new stock line');
    let stk: Stock = new Stock();
    this.stocks.push(stk);
  }

  performCalculations(): void {
    console.log('Performing calculations');
    this.fillStockParameters();
    this.stocks.forEach( (stk) => console.log(stk));
  }

  // todo: start here
  private fillStockParameters(): void {

    this.stocks.forEach(function(stk) {
      stk.price = this.financialService.getCurrentPrice(stk.symbol);
      stk.quantity = stk.value == 0 ? 0 : (stk.quantity / stk.price);
    });

  }


}
