import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class AppService {
  private MobileBreakPointWidth = 400

  private DesktopBreakPointWidth = 1200
  
  get isMobileView () {
    return window.innerWidth <= this.MobileBreakPointWidth
  }

  get isTabletView () {
    return window.innerWidth >= this.MobileBreakPointWidth && window.innerWidth < this.DesktopBreakPointWidth
  }

  get isDesktopView () {
    return window.innerWidth >= this.DesktopBreakPointWidth
  }
}
