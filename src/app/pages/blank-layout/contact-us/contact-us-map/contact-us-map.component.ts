import { Component, inject } from '@angular/core';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IAllLinks } from '../../../../core/interfaces/ILinks';
import { ContactUsService } from '../../../../core/services/contact-us/contact-us.service';

@Component({
  selector: 'app-contact-us-map',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './contact-us-map.component.html',
  styleUrl: './contact-us-map.component.css',
})
export class ContactUsMapComponent {
  allLinks!: IAllLinks;

  isRTL: boolean = false;

  Subscription!: Subscription;

  contactUsService = inject(ContactUsService);
  _TranslateService = inject(TranslateService);

  ngOnInit(): void {
    this.Subscription = this._TranslateService.onLangChange.subscribe(
      (params: LangChangeEvent) => {
        if (
          params.lang === 'ar' ||
          this._TranslateService.currentLang === 'ar'
        ) {
          this.isRTL = true;
        } else {
          this.isRTL = false;
        }
      }
    );
    if (this._TranslateService.currentLang === 'ar') {
      this.isRTL = true;
    } else {
      this.isRTL = false;
    }
    this.contactUsService.getAllLinks().subscribe({
      next: (response) => {
        this.allLinks = response;
      },
    });
  }
}
