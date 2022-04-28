import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BeerPageComponent } from './beer-page/beer-page.component';
import { WeightPageComponent } from './weight-page/weight-page.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressBarModule,
    MatIconModule
  ],
  declarations: [
    MainPageComponent,
    BeerPageComponent,
    WeightPageComponent
  ],
  providers: [],
})

export class PagesModule {

}
