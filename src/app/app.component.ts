import { Component, OnInit, OnDestroy, VERSION } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppService } from './services/app.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {

  appTheme$ = this.themeService.getAppTheme();

  appName$ = this.appService.getAppName();
  appSubtitle$ = this.appService.getAppSubtitle();
  appInstructions$ = this.appService.getAppInstructions();

  NG_VERSION = `v${VERSION.major}`;

  private readonly destroy$ = new Subject();

  constructor(private readonly appService: AppService, private readonly themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.setTheme().pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
