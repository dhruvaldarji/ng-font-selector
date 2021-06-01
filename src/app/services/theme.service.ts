import { Injectable, ApplicationRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ThemeService {

  /** Static Variables  */
  private _themeKey = 'ngDarkTheme';
  private appTheme$ = new BehaviorSubject<boolean>(false);

  constructor (private readonly ref: ApplicationRef) {
    // Watch for changes of the preference
    window.matchMedia("(prefers-color-scheme: dark)").addListener(e => {
      this.toggleTheme(e.matches);

      // Trigger refresh of UI
      this.ref.tick();
    });

      // Initially check if dark mode is enabled on system
    const nativeValue =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storageValue = localStorage.getItem(this._themeKey)
    const darkModeOn = storageValue ? JSON.parse(localStorage.getItem(this._themeKey)) : nativeValue;
    this.toggleTheme(darkModeOn);
  }
 
  getAppTheme() {
    return this.appTheme$.asObservable();
  }

  toggleTheme(newValue = !this.appTheme$.value) {
    localStorage.setItem(this._themeKey, JSON.stringify(newValue));
    this.appTheme$.next(newValue);
  }

  setTheme() {
    return this.appTheme$.pipe(tap((val) => {
      const appThemeClass = 'app-dark-theme';
      if (val) {
        document.body.classList.add(appThemeClass);
      } else {
        document.body.classList.remove(appThemeClass)
      }
    }));
  }

}