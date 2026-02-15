import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { WEB_SITE_BASE_URL_IMAGE } from '../../../core/constants/WEB_SITE_BASE_URL';
import { IServices } from '../../../core/interfaces/IServicesData';
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';
import { OurServicesContentService } from '../../../core/services/our-services-content.service';
import { LanguageService } from '../../../core/services/services/language.service';
import { ServicesDataService } from '../../../core/services/services/services-data.service';
import { PagesHeaderComponent } from '../../../shared/components/pages-header/pages-header.component';
import { HDownloadPdfSectionComponent } from '../home/h-download-pdf-section/h-download-pdf-section.component';
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    HDownloadPdfSectionComponent,
    TranslateModule,
    RouterLink,
    SafeHtmlPipe,
    PagesHeaderComponent,
    AsyncPipe,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  servicesContent: OurServicesContentService = inject(
    OurServicesContentService
  );
  WEB_SITE_BASE_URL_IMAGE = WEB_SITE_BASE_URL_IMAGE;
  languageService = inject(LanguageService);
  _TranslateService: TranslateService = inject(TranslateService);

  isRTL: boolean = false;

  allServicesData!: IServices;

  servicesDataService = inject(ServicesDataService);

  ngOnInit(): void {
    this._TranslateService.onLangChange.subscribe((params: LangChangeEvent) => {
      if (params.lang === 'ar') {
        this.isRTL = true;
      } else {
        this.isRTL = false;
      }
    });
    if (this._TranslateService.currentLang === 'ar') {
      this.isRTL = true;
    } else {
      this.isRTL = false;
    }
    this.getAllServicesData();
  }

  imageLoaded(img: HTMLDivElement): void {
    img.nextElementSibling?.remove();
  }

  getAllServicesData(): void {
    this.servicesDataService.getServicesData().subscribe({
      next: (response) => {
        this.allServicesData = response;
      },
    });
  }
}
