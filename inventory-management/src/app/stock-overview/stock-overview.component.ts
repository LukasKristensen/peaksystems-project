import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../stock.service';
import { StockItem } from '../models/stock-item.model';
import { StockItemFormComponent } from '../stock-item-form/stock-item-form.component'; // Import your form component

@Component({
  selector: 'app-stock-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, StockItemFormComponent],
  templateUrl: './stock-overview.component.html',
  styleUrls: ['./stock-overview.component.css']
})

export class StockOverviewComponent implements OnInit {
  stockItems: StockItem[] = [];
  searchTerm: string = '';
  sortOrder: string = 'asc';
  sortField: keyof StockItem = 'itemNumber';
  selectedStockItem: StockItem | null = null; // Track the currently selected item for editing
  showForm: boolean = false; // To control form visibility

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadStockItems(); // Load stock items initially
    this.stockService.stockItems$.subscribe(items => {
      this.stockItems = items; // Update stock items whenever there's a change
    });
  }

  loadStockItems(): void {
    this.stockService.getStockItems().subscribe(items => {
      this.stockItems = items;
    });
  }

  filteredStockItems(): StockItem[] {
    return this.stockItems
      .filter(item => item.itemNumber.includes(this.searchTerm))
      .sort((a, b) => this.compare(a, b));
  }

  compare(a: StockItem, b: StockItem): number {
    const fieldA = a[this.sortField];
    const fieldB = b[this.sortField];
    if (fieldA < fieldB) return this.sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return this.sortOrder === 'asc' ? 1 : -1;
    return 0;
  }

  toggleSort(field: keyof StockItem): void {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
  }

  deleteStockItem(id: number): void {
    this.stockService.deleteStockItem(id).subscribe(() => {
      this.loadStockItems();
    });
    this.showForm = false; // Hide the form after saving
  }

  editStockItem(stockItem: StockItem): void {
    console.log('Editing stock item:', stockItem);
    this.selectedStockItem = stockItem; // Set the selected stock item for editing
    this.showForm = true; // Show the form when editing
  }

  onItemSaved(): void {
    this.selectedStockItem = null; // Clear selection after saving
    this.loadStockItems(); // Reload stock items to show changes
    this.showForm = false; // Hide the form after saving
  }

  sortItems(): void {
    this.stockItems.sort((a, b) => {
      const valueA = a[this.sortField];
      const valueB = b[this.sortField];

      if (this.sortOrder === 'asc') {
        return (valueA < valueB ? -1 : 1) * (typeof valueA === 'number' && typeof valueB === 'number' ? 1 : 0);
      } else {
        return (valueA > valueB ? -1 : 1) * (typeof valueA === 'number' && typeof valueB === 'number' ? 1 : 0);
      }
    });
  }

  changeSort(value: string): void {
    // Convert string to keyof StockItem
    const newField = value as keyof StockItem;
    
    if (this.sortField === newField) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle sort order
    } else {
      this.sortField = newField; // Change sort field
      this.sortOrder = 'asc'; // Reset to ascending order
    }
    this.sortItems(); // Sort after changing criteria
  }

  hideForm(): void {
    this.showForm = false; // Hide the form
    this.selectedStockItem = null; // Clear the selected item
  }
}

