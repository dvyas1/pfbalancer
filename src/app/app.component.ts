import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';

import { Stock } from './stock';
import { FinancialService } from './financial.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // start here.
  @ViewChild('futureAllocationinput', {static: false}) futureAllocationinput: ElementRef;


  title = 'Portfolio Balancer';

  stocks: Stock[] = [
    {symbol: 'abc', price: 33.2, value: 0.0, quantity: 0, currentAllocation: 0, futureAllocation: 0, changesNeeded: '0.0' },
    {symbol: 'xyz', price: 33.2, value: 0.0, quantity: 0, currentAllocation: 0, futureAllocation: 0, changesNeeded: '0.0' }
  ];
  totalPresentValue = 0.0;
  totalFutureValue = 0.0;
  newAddition = 0.0;
  cashTakeout = 0.0;
  validationErrors = '';

  constructor(private financialSv: FinancialService) {}

  ngOnInit(): void {
  }


  /**
   * This function removes stock from master stock list
   * @param stkSymble = Stock symbol to be removed
   */
  removeStock( stkSymble: string ): void {
    console.log('Removing Stock: ' + stkSymble);
    const idx = this.stocks.findIndex(stock => stock.symbol ===  stkSymble);
    this.stocks.splice(idx, 1);
  }

  /**
   * This function and empty row for a new stock
   */
  addStock(): void {
    console.log('Adding new stock line');
    const stk: Stock = new Stock();
    this.stocks.push(stk);
  }

  /**
   * Master function to perform calculation and recommand changes
   */
  performCalculations(): void {
    console.log('Performing calculations');
    const validationResult = this.validateUserInput();
    if (validationResult) {
      this.fillStockParameters();
    }

  }

  /**
   * todo: start here
   * This method valids user input.
   * It will only perform validation of the things that are not validate by Angular and HTML automatically.
   */
  validateUserInput(): boolean {
    // ensure total percent is not over 100%
    console.log('Validating user input');
    let tempTotal = 0;
    for (const stk of this.stocks) {
      tempTotal += stk.futureAllocation;
    }
    if (tempTotal > 100) {
      this.validationErrors = 'Total of the Future Allocation cannot be more than 100%.';
      this.futureAllocationinput.nativeElement.focus();
      return false;
    }
    return true;
  }

  // todo: start here
  /**
   * This function fills all of the stock variable parameters.
   * It will also perform other calcualtions as a part of the fillign stock parameters
   */
  private fillStockParameters(): void {
    console.log(this.financialSv.getCurrentPrice('tt'));

    // set total present value to 0 as we will be calculating it again below
    this.totalPresentValue = 0.0;

    for (const stock of this.stocks) {
      stock.price = this.financialSv.getCurrentPrice(stock.symbol);
      stock.quantity = stock.value === 0 ? 0 : (stock.value / stock.price);

      // increase stock value to total present value
      this.totalPresentValue += stock.value;
    }

    // calculate current allocation of each asset/stock
    for (const stock of this.stocks) {
      stock.currentAllocation = (((stock.value * 100) / this.totalPresentValue)) / 100;
    }

    // calculate changes needed based on future allocation
    this.totalFutureValue = ( this.totalPresentValue + this.newAddition - this.cashTakeout );
    for (const stock of this.stocks) {
      const futureAllocationPercent = stock.futureAllocation / 100;
      const futureVal = this.totalFutureValue * futureAllocationPercent;
      if (stock.value > futureVal) {
        stock.changesNeeded = '-' + (stock.value - futureVal);
      } else if (stock.value < futureVal) {
        stock.changesNeeded = '+' + (futureVal - stock.value);
      } else {
        stock.changesNeeded = 'None';
      }
    }

  }


}
