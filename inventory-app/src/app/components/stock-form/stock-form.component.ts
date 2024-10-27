import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockItem } from '../../models/stock-item.model';
import { CommonModule } from '@angular/common'; // Import CommonModule if needed

@Component({
  selector: 'app-stock-form',
  standalone: true, // Mark as standalone
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css'],
  imports: [CommonModule] // Include necessary modules
})
export class StockFormComponent implements OnInit {
  stockItem: StockItem | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.stockItem = navigation.extras.state['stockItem'] as StockItem;
      console.log('Editing stock item:', this.stockItem);
    } else {
      console.log('No stock item to edit');
    }
  }

  saveStockItem(): void {
    console.log('Saving stock item:', this.stockItem);
    // Implement saving logic here
  }
}
