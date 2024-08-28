import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class checkOutService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
  }
  // handleError
}
function _window(): any {
  // return the global native browser window object
  return window;
}
