import { Component, inject, Input } from '@angular/core';
import { AboutUsContentService } from '../../../../core/services/about-us-content.service';
import { TranslateModule } from '@ngx-translate/core';
import { IAboutData } from '../../../../core/interfaces/IAboutData';

@Component({
  selector: 'app-about-us-last-banner',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './about-us-last-banner.component.html',
  styleUrl: './about-us-last-banner.component.scss',
})
export class AboutUsLastBannerComponent {
  aboutUsContent: AboutUsContentService = inject(AboutUsContentService);

  @Input() allAboutData!: IAboutData;

  @Input() isRTL: boolean = false;
}
