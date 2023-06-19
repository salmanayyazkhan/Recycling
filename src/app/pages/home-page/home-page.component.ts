import {Component} from '@angular/core';
import {VendingMachineService} from "../../services/vending-machine.service";
import {Router} from "@angular/router";
import {LogEntry} from "../../transport/models/entry-log";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent {
  totalPrice: number = 0;
  totalBottles: number = 0;
  totalCans: number = 0;
  logEntry: LogEntry = {
    action: '',
    timestamp: ''
  };
  isButtonDisabled = false;
  stationId = '1234567'

  constructor(private vendingMachineService: VendingMachineService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.vendingMachineService.totalPrice$.subscribe((price) => {
      this.totalPrice = price;
    });
  }

  acceptBottle() {
    if (this.isButtonDisabled) {
      return
    }

    this.isButtonDisabled = true;
    this.logEntry.action = 'Bottle Turned In';
    this.totalBottles = this.vendingMachineService.acceptBottle(this.stationId, this.logEntry!);

    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 1000);

  }

  acceptCan() {
    if (this.isButtonDisabled) {
      return
    }

    this.isButtonDisabled = true;
    this.logEntry.action = 'Can Turned In';
    this.totalCans = this.vendingMachineService.acceptCan(this.stationId, this.logEntry!);

    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 500);

  }

  getVoucher() {
    this.logEntry.action = 'Voucher printed';
    this.vendingMachineService.printVoucher(this.stationId, this.logEntry!);
    this.router.navigate(['home/voucher']);
  }

}
