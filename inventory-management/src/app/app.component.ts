import { Component } from '@angular/core';
import { StockOverviewComponent } from './stock-overview/stock-overview.component';
import { StockItemFormComponent } from './stock-item-form/stock-item-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="container">
      <h1>Inventory Management</h1>
      <app-stock-item-form></app-stock-item-form>
      <hr>
      <app-stock-overview></app-stock-overview>
    </div>
  `,
  imports: [StockItemFormComponent, StockOverviewComponent], // Import both components here
})
export class AppComponent {}
