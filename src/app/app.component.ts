import { Component, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Protocol Manager';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public isDark: boolean;
  checked = false;
  constructor(private breakpointObserver: BreakpointObserver, public overlayContainer: OverlayContainer, public router: Router) {
    this.isDark = true;
    this.checked = this.isDark;
   }

  @HostBinding('class') componentCssClass;

  changeTheme() {
    if (this.isDark) {
      this.onSetTheme('light-theme');
      this.isDark = false;
    } else {
      this.onSetTheme('default-theme');
      this.isDark = true;
    }
  }
  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }
  homepage() {
    this.router.navigate(['/mobile']);
  }
}
