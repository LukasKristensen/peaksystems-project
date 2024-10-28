import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockItem } from './models/stock-item.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StockService {
  private apiUrl = 'http://localhost:5258/api/StockItems';
  private stockItemsSource = new BehaviorSubject<StockItem[]>([]);
  stockItems$ = this.stockItemsSource.asObservable(); // Expose the observable

  constructor(private http: HttpClient) {
    this.loadStockItems(); // Load items when service is initialized
  }


  private loadStockItems() {
    this.getStockItems().subscribe(items => this.stockItemsSource.next(items));
  }

  getStockItems(): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(this.apiUrl);
  }

  getStockItem(id: number): Observable<StockItem> {
    return this.http.get<StockItem>(`${this.apiUrl}/${id}`);
  }

  addStockItem(stockItem: StockItem): Observable<StockItem> {
    return this.http.post<StockItem>(this.apiUrl, stockItem).pipe(
      tap((newItem) => {
        const currentItems = this.stockItemsSource.value;
        this.stockItemsSource.next([...currentItems, newItem]);
      })
    );
  }

  updateStockItem(id: number, stockItem: StockItem): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, stockItem);
  }

  deleteStockItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentItems = this.stockItemsSource.value;
        this.stockItemsSource.next(currentItems.filter(item => item.id !== id)); // Remove from local state
      })
    );
  }
}
