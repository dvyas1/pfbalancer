import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  stkUrl = 'https://financialmodelingprep.com/api/v3/company/profile/vti';

  constructor(private http: HttpClient) { }

  /**
   * todo: start here
   * This method returns current price of the stock
   */
  getCurrentPrice(stockSymbol: string): number {
    let ret = this.http.get(this.stkUrl).subscribe(data => console.log(data.profile.price));
    console.log('--------------');
    console.log(ret);
    return 20.0;
  }
}
