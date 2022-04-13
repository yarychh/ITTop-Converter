import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RatesService } from 'src/app/shared/rates.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  first: string ='';
  second: string = '';
  form!: FormGroup;
  EurToUah!: number;
  UsdToUah!: number;


  
  constructor( private rates: RatesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.rates.getEurToUah().subscribe(res => this.EurToUah = parseInt(res));
    this.rates.getUsdToUah().subscribe(res => this.UsdToUah = res);

    this.form = this.fb.group({
      first: new FormControl(this.first),
      firstCurr: new FormControl("EUR"),
      second: new FormControl(this.second),
      secondCurr: new FormControl("UAH"),
    })
  }


  public firstConv(base: string, ammount:string, aim: string ){
    let quantity = parseInt(ammount, 10);
    const res = this.convert(base, quantity, this.form.value.secondCurr);
    this.second = res.toString();
  }
  public secondConv(base: string, ammount:string, aim: string ){
    let quantity = parseInt(ammount, 10);
    const res = this.convert(base, quantity, this.form.value.firstCurr);
    this.first = res.toString();
  }

  private toUAH(base: string, ammount: number): number{
    let res = 0;
    if(base == "UAH"){
      res = ammount * 1;
    }else if (base == "USD"){
      res = ammount * this.UsdToUah;
    }else if (base == "EUR"){
      res = ammount * this.EurToUah;
    }
    
    return res
  }

  private convert(base: string, ammount: number, aim: string){
    const UAH = this.toUAH(base,ammount);
    let res = 0;
    
    if (aim == "USD"){
      res = UAH/this.UsdToUah
    }else if( aim == "EUR"){
     res = UAH/this.EurToUah
    }else{
      res = UAH
    }

    return res
  }

}
