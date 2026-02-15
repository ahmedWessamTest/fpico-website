import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/services/language.service';
import { ContactUsFormComponent } from './contact-us-form/contact-us-form.component';
import { ContactUsMapComponent } from './contact-us-map/contact-us-map.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    ContactUsFormComponent,
    TranslateModule,
    ContactUsMapComponent,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  languageService = inject(LanguageService);
}
