export interface StockItem {
    id?: number; // Make `id` non-optional if it’s always required
    itemNumber: string;
    quantity: number;
    location: string;
  }
  