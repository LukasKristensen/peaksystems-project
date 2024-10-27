// src/app/services/stock.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockItem } from '../models/stock-item.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:5258/api/StockItems';

  constructor(private http: HttpClient) {}

  getStockItems(): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(this.apiUrl);
  }

  getStockItem(id: number): Observable<StockItem> {
    return this.http.get<StockItem>(`${this.apiUrl}/${id}`);
  }

  addStockItem(stockItem: StockItem): Observable<StockItem> {
    return this.http.post<StockItem>(this.apiUrl, stockItem);
  }

  updateStockItem(stockItem: StockItem): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${stockItem.id}`, stockItem);
  }

  deleteStockItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
