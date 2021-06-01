import { Injectable, ApplicationRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {

  /** Fill out the below Variables to display application details. */

  /** The title of the application. */
  private appName$ = new BehaviorSubject<string>('[ Title ] Demo Application');

  /** The description of the application. */
  private appSubtitle$ = new BehaviorSubject<string>('[ Subtitle ] The purpose of this demo is to showcase some feature.');

  /** A list of html strings to display as instructions for using this application. */
  private appInstructions$ = new BehaviorSubject<string[]>([
    'In order to modify the metadata for this demo, please see the <code>"AppService"</code> file in <code>"./services/app.service.ts"</code>',
    'Use this <code>string[]</code> to provide instructions on how to interact with the demo.',
    '<em>Instructional information</em> can even be provided by using <strong>markup</strong><sup>*</sup>.',
  ]);

  getAppName() {
    return this.appName$.asObservable();
  }

  getAppSubtitle() {
    return this.appSubtitle$.asObservable();
  }

  getAppInstructions() {
    return this.appInstructions$.asObservable();
  }


}