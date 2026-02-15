import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  Input,
  PLATFORM_ID,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { isFoundationDay } from '../../../../core/constants/WEB_SITE_BASE_URL';

@Component({
  selector: 'app-a-hero-section',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './a-hero-section.component.html',
  styleUrl: './a-hero-section.component.css',
})
export class AHeroSectionComponent {
  @Input() isRTL: boolean = false;

  private PLATFORM_ID = inject(PLATFORM_ID);
  isFoundationDay: boolean = isFoundationDay;
  ngOnInit(): void {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      setTimeout(() => {
        this.isDesktop = window.innerWidth;
      }, 0);
    }
  }

  isDesktop: number = 0;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isDesktop = window.innerWidth;
  }
}
