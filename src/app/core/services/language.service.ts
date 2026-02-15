import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';

export type Language = 'ar' | 'en';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLang = signal<Language>('ar');
  private _PLATFORM_ID = inject(PLATFORM_ID);

  constructor(private meta: Meta) {
    this.updateHreflangTags();
  }

  setLanguage(lang: Language) {
    this.currentLang.set(lang);
    this.updateHreflangTags();
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.updateHtmlAttributes(lang);
    }
  }

  getCurrentLanguage(): Language {
    return this.currentLang();
  }

  private updateHreflangTags() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      // Remove existing hreflang tags
      const existingAlts = document.querySelectorAll('link[rel="alternate"]');
      existingAlts.forEach((link) => link.remove());

      // Add hreflang tags in the correct order (current language first)
      const langs: Language[] = ['ar', 'en'];
      const orderedLangs = [
        this.currentLang(),
        ...langs.filter((lang) => lang !== this.currentLang()),
      ];

      orderedLangs.forEach((lang) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang;
        link.href = `https://fpico.org/${lang}/`;
        document.head.appendChild(link);
      });
    }
  }

  private updateHtmlAttributes(lang: Language) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
