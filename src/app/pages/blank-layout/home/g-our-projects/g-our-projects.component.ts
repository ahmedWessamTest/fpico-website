import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { WEB_SITE_BASE_URL_IMAGE } from '../../../../core/constants/WEB_SITE_BASE_URL';
import { Project } from '../../../../core/interfaces/IHomeData';
import { SafeHtmlPipe } from '../../../../core/pipes/safe-html.pipe';
import { LanguageService } from '../../../../core/services/services/language.service';
@Component({
  selector: 'app-g-our-projects',
  standalone: true,
  imports: [TranslateModule, SafeHtmlPipe, RouterLink, AsyncPipe],
  templateUrl: './g-our-projects.component.html',
  styleUrl: './g-our-projects.component.css',
})
export class GOurProjectsComponent {
  isRTL = input(false);
  Project = input.required<Project[]>();
  WEB_SITE_BASE_URL_IMAGE = WEB_SITE_BASE_URL_IMAGE;
  languageService = inject(LanguageService);
}
