import {Component} from '@angular/core';
import {VendingMachineService} from "../../services/vending-machine.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.sass']
})
export class VoucherComponent {
  totalBottles: number = 0;
  totalCans: number = 0;
  totalPrice: number = 0;
  voucherData!: string;
  voucherDate?: string;

  constructor(private vendingMachineService: VendingMachineService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.calculateVoucherData();
    if (this.totalPrice == 0) {
      this.backToHome();
    }

    this.voucherDate = new Date().toLocaleString('nb-NO', { timeZone: 'Europe/Oslo' });


  }

  calculateVoucherData() {
    this.totalBottles = this.vendingMachineService.getTotalBottles();
    this.totalCans = this.vendingMachineService.getTotalCans();
    this.totalPrice = this.vendingMachineService.calculateVoucherValue();
    this.voucherData = `Total Bottles: ${this.totalBottles}\nTotal Cans: ${this.totalCans}\nTotal Price: ${this.totalPrice}`;
  }

  backToHome() {
    this.vendingMachineService.resetValues();
    this.router.navigate(['home']);
  }

}
