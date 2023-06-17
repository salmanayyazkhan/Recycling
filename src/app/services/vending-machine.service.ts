import {Injectable} from '@angular/core';
import {LogEntry} from "../transport/models/entry-log";
import {VendingMachineProvider} from "../transport/vending-machine.provider";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VendingMachineService {
  private bottles = 0;
  private cans = 0;
  private totalPrice = 0;
  private totalPriceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPriceSubject.asObservable();

  constructor(private vendingMachineProvider: VendingMachineProvider) {
  }

  acceptBottle(stationId: string, logEntry: LogEntry) {
    this.bottles++;
    logEntry.timestamp = this.getLogDate();
    this.vendingMachineProvider.entryLog(stationId, logEntry);
    this.updateTotalPrice();
    return this.bottles;
  }

  acceptCan(stationId: string, logEntry: LogEntry) {
    this.cans++;
    logEntry.timestamp = this.getLogDate();
    this.vendingMachineProvider.entryLog(stationId, logEntry);
    this.updateTotalPrice();
    return this.cans;
  }

  printVoucher(stationId: string, logEntry: LogEntry) {
    logEntry.timestamp = this.getLogDate();
    this.vendingMachineProvider.entryLog(stationId, logEntry);
  }

  private updateTotalPrice() {
    const bottleValue = this.bottles * 3;
    const canValue = this.cans * 2;
    this.totalPriceSubject.next(bottleValue + canValue);
    return this.totalPrice = bottleValue + canValue
  }

  calculateVoucherValue(): number {
    return this.totalPrice;
  }

  getTotalBottles(): number {
    return this.bottles;
  }

  getTotalCans(): number {
    return this.cans;
  }

  getLogDate(): string {
    return new Date().toLocaleString('en-US', {timeZone: 'UTC'});
  }

  resetValues() {
    this.totalPriceSubject.next(0);
    this.bottles = 0;
    this.cans = 0;
  }

}
