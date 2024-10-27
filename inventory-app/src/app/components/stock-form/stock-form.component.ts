import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StockItem } from '../models/stock-item.model';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css'],
})
export class StockFormComponent {
  stockItem: StockItem = {
    id: 0, // Make sure your StockItem interface has an id property
    itemNumber: '',
    location: '',
    quantity: 0,
  };

  constructor(private http: HttpClient, private router: Router) {}

  saveStockItem() {
    // Log the stockItem to ensure it's being populated correctly
    console.log('Saving stock item:', this.stockItem);
    
    this.http.post('/api/StockItems', this.stockItem).subscribe(
      (response) => {
        console.log('Item saved:', response);
        this.router.navigate(['/stocks']); // Redirect to stock list after saving
      },
      (error) => {
        console.error('Error saving item:', error);
      }
    );
  }
}
