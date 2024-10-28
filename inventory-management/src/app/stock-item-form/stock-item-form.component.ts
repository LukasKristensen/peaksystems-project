import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StockService } from '../stock.service';
import { StockItem } from '../models/stock-item.model';

@Component({
  selector: 'app-stock-item-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './stock-item-form.component.html',
  styleUrls: ['./stock-item-form.component.css']
})
export class StockItemFormComponent {
  stockItem: StockItem = { id: 0, quantity: 0, itemNumber: '', location: '' };
  isEditMode: boolean = false;

  constructor(private stockService: StockService) {}

  saveStockItem(): void {
    if (this.isEditMode) {
      this.stockService.updateStockItem(this.stockItem.id, this.stockItem).subscribe();
    } else {
      this.stockService.addStockItem(this.stockItem).subscribe();
    }
  }
}
