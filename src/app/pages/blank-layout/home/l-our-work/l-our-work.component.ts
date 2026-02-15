import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ArrigationSystem } from '../../../../core/interfaces/IHomeData';
import { SafeHtmlPipe } from '../../../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-l-our-work',
  standalone: true,
  imports: [TranslateModule, SafeHtmlPipe],
  templateUrl: './l-our-work.component.html',
  styleUrl: './l-our-work.component.css',
})
export class LOurWorkComponent {
  @Input() isRTL: boolean = false;
  @Input() ArrigationSystem!: ArrigationSystem[];
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
