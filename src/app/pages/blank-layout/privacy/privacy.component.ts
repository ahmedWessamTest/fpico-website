import { Component, inject } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-privacy',
  imports: [],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css',
})
export class PrivacyComponent {
  _translateService = inject(TranslateService);
  isRTL: boolean = false;
  Subscription!: Subscription;
  ngOnInit(): void {
    // Set RTL status once at initialization
    this.isRTL = this._translateService.currentLang === 'ar';
    // Subscribe to language changes
    this.Subscription = this._translateService.onLangChange.subscribe(
      (params: LangChangeEvent) => {
        this.isRTL =
          params.lang === 'ar' || this._translateService.currentLang === 'ar';
      }
    );
  }
}
