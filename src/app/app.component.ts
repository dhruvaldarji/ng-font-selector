import { Component, OnInit, OnDestroy, VERSION } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppService } from './services/app.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly appTheme$ = this.themeService.getAppTheme();

  readonly appName$ = this.appService.getAppName();
  readonly appDescription$ = this.appService.getAppDescription();
  readonly appInstructions$ = this.appService.getAppInstructions();

  NG_VERSION = `v${VERSION.major}`;

  private readonly destroy$ = new Subject();

  constructor(
    private readonly appService: AppService,
    private readonly themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService
      .setTheme()
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.appService.setAppName('Font Selector');
    this.appService.setAppDescription(
      'Dynamically change fonts with Google Web Fonts.'
    );
    this.appService.setAppInstructions([
      'Provide an API Key for querying for Google Web fonts.',
      '<a target="_blank" href="https://developers.google.com/fonts/docs/getting_started">Get Started with the Google Fonts API</a>',
      'Use the search bar to find available fonts.',
      'View available fonts with custom text.',
      'Adjust font-size to see variability.'
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
