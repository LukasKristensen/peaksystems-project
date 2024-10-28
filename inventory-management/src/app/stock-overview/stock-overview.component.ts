import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../stock.service';
import { StockItem } from '../models/stock-item.model';

@Component({
  selector: 'app-stock-overview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-overview.component.html',
  styleUrls: ['./stock-overview.component.css']
})
export class StockOverviewComponent implements OnInit {
  stockItems: StockItem[] = [];
  searchTerm: string = '';
  sortOrder: string = 'asc';
  sortField: keyof StockItem = 'itemNumber';

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadStockItems();
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
  }
}
