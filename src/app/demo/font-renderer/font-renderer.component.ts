import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-font-renderer',
  templateUrl: './font-renderer.component.html'
})
export class FontRendererComponent {
  @Input() fontFamily: string;
  @Input() fontSize: string;
  @Input() set fontUrl(url: string) {
    this.trustedFontUrl = this.getTrustedFontUrl(url);
  }

  trustedFontUrl: SafeResourceUrl;

  constructor(protected sanitizer: DomSanitizer) {}

  getTrustedFontUrl(url: string) {
    if (!url) return '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
