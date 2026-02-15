import { Component, computed, inject, input, signal } from '@angular/core';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { WEB_SITE_BASE_URL_IMAGE } from '../../../../core/constants/WEB_SITE_BASE_URL';
import { YoutubeSlider } from '../../../../core/interfaces/IHomeData';
import { SafeHtmlPipe } from '../../../../core/pipes/safe-html.pipe';
import { HomeDataService } from '../../../../core/services/home/home-data.service';
import { OurServicesContentService } from '../../../../core/services/our-services-content.service';
import { LanguageService } from '../../../../core/services/services/language.service';

@Component({
  selector: 'app-youtube-slider',
  imports: [CarouselModule, TranslateModule, SafeHtmlPipe],
  templateUrl: './youtube-slider.component.html',
  styleUrl: './youtube-slider.component.css',
})
export class YoutubeSliderComponent {
  isRTL = input(false);
  YoutubeSlider = input.required<YoutubeSlider[]>();

  languageService = inject(LanguageService);
  _OurServicesContentService = inject(OurServicesContentService);
  _TranslateService = inject(TranslateService);
  homeServices = inject(HomeDataService);

  WEB_SITE_BASE_URL_IMAGE = WEB_SITE_BASE_URL_IMAGE;

  // Use signal to track current language
  currentLang = signal(this._TranslateService.currentLang);

  // Use computed to create carousel options based on current language
  customOptions = computed<OwlOptions>(() => {
    const isArabic = this.currentLang() === 'ar';

    return {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      dotsData: true,
      dotsSpeed: 700,
      navSpeed: 700,
      navText: ['', ''],
      margin: 10,
      responsive: {
        0: {
          items: 1,
        },
        740: {
          items: 3,
        },
      },
      nav: false,
      dragEndSpeed: 600,
      rtl: isArabic, // Set RTL based on current language
    };
  });

  isDragging = signal(false); // Track dragging state using signal

  onDragStart() {
    this.isDragging.set(true);
  }

  onDragEnd() {
    setTimeout(() => this.isDragging.set(false), 200); // Delay to avoid immediate click
  }

  shouldNavigate(): boolean {
    return !this.isDragging();
  }

  ngOnInit(): void {
    // Subscribe to language changes and update the signal
    this._TranslateService.onLangChange.subscribe((params: LangChangeEvent) => {
      this.currentLang.set(params.lang);
    });

    // Set initial language
    this.currentLang.set(this._TranslateService.currentLang);
  }

  imageLoaded(img: HTMLImageElement): void {
    img.nextElementSibling?.remove();
  }
}
