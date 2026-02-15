import { Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AboutData } from '../../../../core/interfaces/IHomeData';
import { AboutUsContentService } from '../../../../core/services/about-us-content.service';

@Component({
  selector: 'app-c-about-us',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './c-about-us.component.html',
  styleUrl: './c-about-us.component.css',
})
export class CAboutUsComponent {
  isBrowser: boolean = false;

  isRTL = input(false);
  AboutData = input.required<AboutData>();

  aboutData: AboutUsContentService = inject(AboutUsContentService);

  @ViewChild('videoElement') video!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.video?.nativeElement) {
        const video = this.video.nativeElement;
        video.muted = true; // Ensure it's muted
        video.play().catch((err) => console.warn('Autoplay blocked:', err));
      }
    }, 500);
  }
}
