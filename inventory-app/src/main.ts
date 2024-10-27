import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { StockListComponent } from './app/components/stock-list/stock-list.component';
import { StockFormComponent } from './app/components/stock-form/stock-form.component';
import { provideHttpClient } from '@angular/common/http'; // Make sure this is imported

const routes: Routes = [
  { path: '', component: StockListComponent },
  { path: 'add', component: StockFormComponent },
  { path: 'edit/:id', component: StockFormComponent }
];

bootstrapApplication(StockListComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient() // Ensure provideHttpClient is included here
  ]
}).catch(err => console.error(err));
