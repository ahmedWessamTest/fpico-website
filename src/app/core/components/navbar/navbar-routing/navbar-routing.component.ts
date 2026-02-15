import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { LangChangeEvent, TranslateModule, TranslateService } from "@ngx-translate/core";
import { LanguageService } from "../../../services/services/language.service";
import { MobileMenuService } from "../mobile-menu.service";

@Component({
  selector: "app-navbar-routing",
  standalone: true,
  imports: [TranslateModule, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: "./navbar-routing.component.html"
})
export class NavbarRoutingComponent {
  _TranslateService = inject(TranslateService);
  languageService = inject(LanguageService);
  isRTL: boolean = false;
  constructor(public mobileMenuService: MobileMenuService) {}
  ngOnInit(): void {
    this._TranslateService.onLangChange.subscribe((params: LangChangeEvent) => {
      if (params.lang === "ar") {
        this.isRTL = true;
      } else {
        this.isRTL = false;
      }
    });
    if (this._TranslateService.currentLang == "ar") {
      this.isRTL = true;
    } else {
      this.isRTL = false;
    }
  }
}
