import { AsyncPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, effect, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LangChangeEvent, TranslateModule, TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { SocialMediaLinksComponent } from "../../../shared/components/social-media-links/social-media-links.component";
import { IAllLinks } from "../../interfaces/ILinks";
import { ContactUsService } from "../../services/contact-us/contact-us.service";
import { LanguageService } from "../../services/services/language.service";
import { WEB_SITE_BASE_URL } from "../../constants/WEB_SITE_BASE_URL";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [SocialMediaLinksComponent, TranslateModule, RouterLink, AsyncPipe],
  templateUrl: "./footer.component.html"
})
export class FooterComponent {
  allLinks!: IAllLinks;
  languageService = inject(LanguageService);
  contactUsService = inject(ContactUsService);
  _TranslateService = inject(TranslateService);
  http = inject(HttpClient);

  constructor() {
    effect(() => {
      this.allLinks = this.contactUsService.contactSubject() as IAllLinks;
    });
  }
  isRTL: boolean = false;

  Subscription!: Subscription;

  ngOnInit(): void {
    this.Subscription = this._TranslateService.onLangChange.subscribe((params: LangChangeEvent) => {
      if (params.lang === "ar" || this._TranslateService.currentLang === "ar") {
        this.isRTL = true;
      } else {
        this.isRTL = false;
      }
    });
    if (this._TranslateService.currentLang === "ar") {
      this.isRTL = true;
    } else {
      this.isRTL = false;
    }

    this.http.get(`${WEB_SITE_BASE_URL}getServices`).subscribe({
      next: (response: any) => {
        this.services = response.services;
      },
    });
  }
  services: any;
}
