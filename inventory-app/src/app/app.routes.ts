import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockFormComponent } from './components/stock-form/stock-form.component';

const routes: Routes = [
    { path: '', component: StockListComponent }, // Set default to StockListComponent directly
    { path: 'stocks', component: StockListComponent },
    { path: 'add-stock', component: StockFormComponent }, // Add Item route
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutesModule {} // Or whatever name you prefer
