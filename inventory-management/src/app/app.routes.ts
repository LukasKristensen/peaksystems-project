import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { StockOverviewComponent } from './stock-overview/stock-overview.component';
import { StockItemFormComponent } from './stock-item-form/stock-item-form.component';

export const appRoutes: Routes = [
  { path: '', component: StockOverviewComponent },
  { path: 'create', component: StockItemFormComponent },
  { path: 'edit/:id', component: StockItemFormComponent }
];

export const appRoutingProviders = [
  provideRouter(appRoutes)
];
