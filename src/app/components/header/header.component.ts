import { Component, OnInit } from '@angular/core';
import { RatesService } from 'src/app/shared/rates.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  eur!: any;
  usd!: any;

  constructor(public rates: RatesService) {}

  ngOnInit(): void {
    this.eur = this.rates.getEurToUah();
    this.usd = this.rates.getUsdToUah();
  }

  
}
