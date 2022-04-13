import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  //FIRST API 
  // private accessKey: string = 'bfc2a380dc38d66c4b09d7a9';
  // private getEndPoint(cur: string): string{
  //   return `https://v6.exchangerate-api.com/v6/${this.accessKey}/latest/${cur}`
  // }

  // public getEurToUah(){
  //   return this.http.get(this.getEndPoint('EUR'))
  //     .pipe(
  //       map((res: any)=>res.conversion_rates.UAH)
  //     )
  // }

  // public getUsdToUah(){
  //   return this.http.get(this.getEndPoint('USD'))
  //   .pipe(
  //     map((res: any)=> res.conversion_rates.UAH)
  //   )
  // }

 
  constructor(private http: HttpClient) {
  }

  private accessKey: string = '8e677e06fde6847190a22e5582c7ad2e';

  private endpoint: string =`http://api.currencylayer.com/live?access_key=${this.accessKey}&currencies=EUR,UAH&format=1`

  public getUsdToUah(){
    return this.http.get(this.endpoint)
    .pipe(
      map((res: any)=> res.quotes.USDUAH.toPrecision(4))
    )
  }

  public getEurToUah(){
    return this.http.get(this.endpoint)
    .pipe(
      map((res: any)=> (res.quotes.USDUAH/res.quotes.USDEUR).toPrecision(4))
    )
  }
}
