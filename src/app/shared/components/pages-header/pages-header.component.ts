import { AsyncPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/services/language.service';

@Component({
  selector: 'app-pages-header',
  standalone: true,
  imports: [TranslateModule, RouterLink, AsyncPipe],
  templateUrl: './pages-header.component.html',
  styleUrl: './pages-header.component.css',
})
export class PagesHeaderComponent {
  languageService = inject(LanguageService);
  _Router = inject(Router);
  _TranslateService = inject(TranslateService);
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) title02: string = '';
  @Input({ required: true }) desc01: string = '';
  @Input({ required: true }) desc02: string = '';
  @Input() order: boolean = false;
  isProjects: boolean = false;
  isRtl: boolean = false;

  ngOnInit(): void {
    this._TranslateService.onLangChange.subscribe((params: LangChangeEvent) => {
      if (params.lang === 'ar' || this._TranslateService.currentLang === 'ar') {
        this.isRtl = true;
      } else {
        this.isRtl = false;
      }
      this.toggleViewOtherPagesButtons();
      this.handleAboutArabicText();
    });
    if (this._TranslateService.currentLang === 'ar') {
      this.isRtl = true;
    } else {
      this.isRtl = false;
    }
    this.toggleViewOtherPagesButtons();
    this.handleAboutArabicText();
  }

  handleAboutArabicText(): void {
    if (this._Router.url.includes('/about-us') && this.isRtl) {
      this.order = false;
    } else if (this._Router.url.includes('/about-us') && !this.isRtl) {
      this.order = true;
    }
  }

  toggleViewOtherPagesButtons(): void {
    if (this._Router.url == '/projects') {
      this.isProjects = false;
    } else if (this._Router.url == '/services') {
      this.isProjects = true;
    }
    if (this._Router.url.includes('/projects-details/')) {
      this.isProjects = true;
    } else if (this._Router.url.includes('/services-details/')) {
      this.isProjects = false;
    }
  }
}
