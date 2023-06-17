import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VoucherComponent} from "./components/voucher/voucher.component";
import {HomePageComponent} from "./components/home-page/home-page.component";

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'home/voucher', component: VoucherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
