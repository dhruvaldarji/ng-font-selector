import { Injectable, ApplicationRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
  /** The name of the application. */
  private readonly appName$ = new BehaviorSubject<string>(
    '[ Title ] Demo Application'
  );

  /** The description of the application. */
  private readonly appDescription$ = new BehaviorSubject<string>(
    '[ Subtitle ] The purpose of this demo is to showcase some feature.'
  );

  /** A list of html strings to display as instructions for using this application. */
  private readonly appInstructions$ = new BehaviorSubject<string[]>([
    'In order to modify the metadata for this demo, please see the <code>"AppService"</code> file in <code>"./services/app.service.ts"</code>',
    'Use this <code>string[]</code> to provide instructions on how to interact with the demo.',
    '<em>Instructional information</em> can even be provided by using <strong>markup</strong><sup>*</sup>.'
  ]);

  /**
   * Get the name of the application.
   */
  getAppName() {
    return this.appName$.asObservable();
  }

  /**
   * Set the name of the application.
   * @param name The new application name.
   */
  setAppName(name?: string) {
    if (!name) return;
    return this.appName$.next(name);
  }

  /**
   * Get the description of the application.
   */
  getAppDescription() {
    return this.appDescription$.asObservable();
  }

  /**
   * Sets the description of the application.
   * This serves to explain the intent behind the usage of the app.
   * @param subtitle The new application description.
   */
  setAppDescription(subtitle?: string) {
    if (!subtitle) return;
    return this.appDescription$.next(subtitle);
  }

  /**
   * Get the instructions for using the application.
   */
  getAppInstructions() {
    return this.appInstructions$.asObservable();
  }

  /**
   * Sets the instructions for using the application.
   * This can include information about the app, the available controls,
   * details on how to interpret the results, and more.
   * @param instructions A list of markup instructions for using the application.
   */
  setAppInstructions(instructions?: string[]) {
    if (!instructions || !instructions.length) return;
    return this.appInstructions$.next(instructions);
  }
}
