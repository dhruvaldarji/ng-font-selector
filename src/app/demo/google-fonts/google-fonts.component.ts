import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

import { PageEvent } from '@angular/material/paginator';

import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, concatMap, take, takeUntil, tap, filter } from 'rxjs/operators';

interface FontSize {
  value: number;
  label: string;
  show: boolean;
}

interface Pageable {
  page: number,
  size: number,
}

interface GoogleFont {
  category: string;
  family: string;
  files: {
    regular: string;
  },
  kind: string;
  lastModified: string;
  subsets: string[],
  variants: string[],
  version: string;
};

interface GoogleWebFontApi { items: GoogleFont[] }

@Component({
  selector: 'app-google-fonts',
  templateUrl: './google-fonts.component.html',
  styleUrls: ['./google-fonts.component.scss'],
})
export class GoogleFontsComponent implements OnInit {

  readonly apiKey$ = new BehaviorSubject('');

  readonly formatFontSizeLabel = (value: number) => `${value}px`;
  readonly fontSizes = {
    min: 8,
    max: 120,
    step: 1
  };
  readonly fontSizesList = this.getFontSizeList(this.fontSizes.max);

  readonly fontForm = new FormGroup({
    search: new FormControl(''),
    phrase: new FormControl('Almost before we knew it, we had left the ground.'),
    size: new FormControl(this.fontSizesList[24])
  });

  readonly sizeControl = this.fontForm.get('size');
  readonly phraseControl = this.fontForm.get('phrase');

  readonly query$ = new BehaviorSubject(null);
  readonly pagination$ = new BehaviorSubject<Pageable>({page: 0, size: 10})
  readonly total$ = new BehaviorSubject(0);
  readonly filterdData$ = new BehaviorSubject<GoogleFont[]>([]);
  readonly pageOptions$ = new BehaviorSubject([]);

  private readonly destroy$ = new Subject();

  constructor(private readonly httpClient: HttpClient) {}

  ngOnInit() {
    this.getFonts().pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setApiKey(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.apiKey$.next(value);
  }

  setPage(event: PageEvent) {
    this.pagination$.next({ page: event.pageIndex, size: event.pageSize });
  }

  getFontUrl(font: GoogleFont) {
    if (!font) return '';
    return `https://fonts.googleapis.com/css?family=${font.family}`;
  }

  private getFonts() {
    return this.apiKey$.pipe(
      filter((val) => !!val),
      concatMap((key: string) => {
        return combineLatest([
          this.getGoogleFonts(key).pipe(take(1)),
          this.pagination$,
          this.query$
        ]).pipe(
          tap(([data, pagination, query]) => {
            this.total$.next(data.length);
            this.pageOptions$.next(this.getPageOptions(data.length));

            const start = pagination.page * pagination.size;
            const end = Math.min(start + pagination.size, data.length) - 1;
            const filteredData = data.slice(start, end);

            this.filterdData$.next(filteredData);
          })
        );
      })
    )
  }

  private getPageOptions(max: number): number[] {
    const list = [];
    let sentinel = 10;
    while (sentinel < max) {
      sentinel = Math.round(sentinel * 2);
      list.push(sentinel);
    }
    return list;
  }

  private getFontSizeList(max: number): FontSize[] {
    const displayFontSizes = [8, 12, 14, 20, 24, 32, 64];
    return [...new Array(max)].map((v, i) => ({
      value: i,
      label: `${i}px`,
      show: displayFontSizes.includes(i),
    }));
  }

  private getGoogleFonts(key: string): Observable<GoogleFont[]>{
    return this.httpClient.get<GoogleWebFontApi>(
      'https://www.googleapis.com/webfonts/v1/webfonts',
      { params: { key, sort: 'POPULARITY' }}
    ).pipe(
      map((data) => data?.items || []),
    );
  }
}
