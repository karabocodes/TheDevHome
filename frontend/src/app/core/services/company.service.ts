import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, catchError, of } from 'rxjs';
import { CompanyInfo } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly http = inject(HttpClient);
  private company$!: Observable<CompanyInfo | null>;

  constructor() {
    this.company$ = this.http.get<CompanyInfo>('/data/company.json').pipe(
      shareReplay(1),
      catchError(err => {
        console.error('Failed to load company metadata:', err);
        return of(null);
      })
    );
  }

  getCompanyInfo(): Observable<CompanyInfo | null> {
    return this.company$;
  }
}
