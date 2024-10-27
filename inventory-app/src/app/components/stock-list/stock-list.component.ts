import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { StockItem } from '../../models/stock-item.model';
import { CommonModule } from '@angular/common'; // Import CommonModule if needed

@Component({
  selector: 'app-stock-list',
  standalone: true, // Mark as standalone
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
  imports: [CommonModule] // Include necessary modules
})
export class StockListComponent implements OnInit {
  stockItems: StockItem[] = [];

  constructor(private stockService: StockService, private router: Router) {}

  ngOnInit(): void {
    this.loadStockItems();
  }

  loadStockItems(): void {
    this.stockService.getStockItems().subscribe(
      (data) => {
        this.stockItems = data;
        console.log('Stock items loaded:', this.stockItems);
      },
      (error) => {
        console.error('Error loading stock items:', error);
      }
    );
  }

  editStockItem(item: StockItem): void {
    this.router.navigate(['/stock-form'], { state: { stockItem: item } });
  }

  deleteStockItem(itemId: number): void {
    // Implement deletion logic here
    console.log('Delete item with ID:', itemId);
  }
}
