import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';  // Add RouterModule import
import { Routes } from '@angular/router';
import { StockListComponent } from './app/components/stock-list/stock-list.component';
import { StockFormComponent } from './app/components/stock-form/stock-form.component';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';  // Ensure AppComponent is the root

const routes: Routes = [
  { path: '', component: StockListComponent },
  { path: 'add', component: StockFormComponent },
  { path: 'edit/:id', component: StockFormComponent }
];

// Bootstrap with AppComponent and provide RouterModule and HttpClient
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ]
}).catch(err => console.error(err));
