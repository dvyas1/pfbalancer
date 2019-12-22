import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { Stock } from './stock';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        FormsModule
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Portfolio Balancer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Portfolio Balancer');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Portfolio Balancer');
  });

  it('#addStock() should add stock to master list', () => {
    const app = TestBed.createComponent(AppComponent).debugElement.componentInstance;
    expect(app.stocks.length).toBe(2, "only two elements at first");
    app.addStock();
    expect(app.stocks.length).toBe(3, "three element after addStock() call");
  });

  it(' #removeStock should remove stock from master list', () => {
    const app = TestBed.createComponent(AppComponent).debugElement.componentInstance;
    expect(app.stocks.length).toBe(2, "only two stocks at first");
    let stk:Stock = new Stock();
    stk.symbol = 'ABCD';
    app.stocks.push(stk);
    expect(app.stocks.length).toBe(3, "added a stock in order to remove it later using #removeStock method");
    app.removeStock('ABCD');
    expect(app.stocks.length).toBe(2, "only two stocks after removal of stock");
  });

});
