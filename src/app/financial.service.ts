import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as _ from 'lodash';

import {StkQuote} from './stk-quote';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  stkQuoteUrl = 'https://financialmodelingprep.com/api/v3/quote/';

  constructor(private http: HttpClient) { }

  /**
   * This method returns current price of the stock
   */
  getStockQuotes(stockSymbolList: Array<string>): Observable<Array<StkQuote>> {
//    let ret = this.http.get(this.stkUrl).subscribe(data => console.log(data.profile.price));
//    console.log(ret);
    const url = this.stkQuoteUrl + stockSymbolList.join(',').toUpperCase();
    return this.http.get<Array<StkQuote>>(url);
  }
}
