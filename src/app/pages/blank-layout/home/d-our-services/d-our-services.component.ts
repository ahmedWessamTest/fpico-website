import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { WEB_SITE_BASE_URL_IMAGE } from '../../../../core/constants/WEB_SITE_BASE_URL';
import { Service } from '../../../../core/interfaces/IHomeData';
import { SafeHtmlPipe } from '../../../../core/pipes/safe-html.pipe';
import { HomeDataService } from '../../../../core/services/home/home-data.service';
import { OurServicesContentService } from '../../../../core/services/our-services-content.service';
import { LanguageService } from '../../../../core/services/services/language.service';
@Component({
  selector: 'app-d-our-services',
  standalone: true,
  imports: [
    CarouselModule,
    TranslateModule,
    SafeHtmlPipe,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './d-our-services.component.html',
  styleUrl: './d-our-services.component.css',
})
export class DOurServicesComponent {
  isRTL = input(false);
  Service = input.required<Service[]>();
  languageService = inject(LanguageService);
  _OurServicesContentService = inject(OurServicesContentService);
  _TranslateService = inject(TranslateService);
  homeServices = inject(HomeDataService);
  WEB_SITE_BASE_URL_IMAGE = WEB_SITE_BASE_URL_IMAGE;
  customOptions: OwlOptions = {
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
      940: {
        items: 4,
      },
    },
    nav: false,
    dragEndSpeed: 600,
  };

  isDragging = false; // Track dragging state

  onDragStart() {
    this.isDragging = true;
  }

  onDragEnd() {
    setTimeout(() => (this.isDragging = false), 200); // Delay to avoid immediate click
  }

  shouldNavigate(): boolean {
    return !this.isDragging;
  }

  ngOnInit(): void {
    this.homeServices.footerServices.next(this.Service());
    this._TranslateService.onLangChange.subscribe((params: LangChangeEvent) => {
      if (params.lang === 'ar') {
        this.customOptions = {
          ...this.customOptions,
          rtl: true,
        };
      } else {
        this.customOptions = {
          ...this.customOptions,
          rtl: false,
        };
      }
    });
    if (this._TranslateService.currentLang === 'ar') {
      this.customOptions = {
        ...this.customOptions,
        rtl: true,
      };
    } else {
      this.customOptions = {
        ...this.customOptions,
        rtl: false,
      };
    }
  }

  imageLoaded(img: HTMLImageElement): void {
    img.nextElementSibling?.remove();
  }
}
