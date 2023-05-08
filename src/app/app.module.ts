import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import {FormFieldOverviewExample} from "./FormFieldOverviewExmaple";


@NgModule({
  declarations: [
    AppComponent,
    VehicleComponent,
    FormFieldOverviewExample
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
