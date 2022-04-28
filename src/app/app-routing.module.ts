import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BeerPageComponent } from './pages/beer-page/beer-page.component';
import { WeightPageComponent } from './pages/weight-page/weight-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'main-page', pathMatch: 'full'},
  {path: 'main-page', component: MainPageComponent},
  {path: 'beer-page', component: BeerPageComponent},
  {path: 'weight-page', component: WeightPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
