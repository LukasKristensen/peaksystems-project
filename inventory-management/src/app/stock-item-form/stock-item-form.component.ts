import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class StockItemFormComponent implements OnInit {
  @Input() stockItem: StockItem | null = null;
  @Output() itemSaved = new EventEmitter<void>(); // Emit when the item is saved
  isEditMode: boolean = false;

  // Initialize stockItemForm to hold form data
  stockItemForm: StockItem = { id: 0, quantity: 0, itemNumber: '', location: '' };

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    if (this.stockItem) {
      this.isEditMode = true; // Set to true if editing
      this.stockItemForm = { ...this.stockItem }; // Copy the stockItem for editing
    }
  }

  saveStockItem(): void {
    if (this.isEditMode) {
      this.stockService.updateStockItem(this.stockItemForm.id, this.stockItemForm).subscribe(() => {
        this.itemSaved.emit(); // Emit after saving
      });
    } else {
      this.stockService.addStockItem(this.stockItemForm).subscribe(() => {
        this.itemSaved.emit(); // Emit after saving
      });
    }
  }

  hideForm(): void {
    this.itemSaved.emit(); // Emit to hide the form
  }
}
