import { TestBed } from '@angular/core/testing';

import { FinancialService } from './financial.service';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {StkQuote} from './stk-quote';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('FinancialService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule
    ]
  }));

  it('should be created', () => {
    const service: FinancialService = TestBed.inject(FinancialService);
    expect(service).toBeTruthy();
  });

  it('should return observable stock quotes from web service', (done) => {
    const service: FinancialService = TestBed.inject(FinancialService);
    const tempInput: Array<string> = ['aapl', 'msft', 'mmm'];
    service.getStockQuotes(tempInput).subscribe((data: StkQuote[]) => {
        expect(data.length).toBe(3);
        expect(data[0].price).toBeGreaterThan(1);
        expect(data[1].price).toBeGreaterThan(1);
        expect(data[2].price).toBeGreaterThan(1);
        done();
      });

  });
});
