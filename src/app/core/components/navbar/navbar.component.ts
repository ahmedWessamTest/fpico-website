import { AsyncPipe, CommonModule, NgOptimizedImage } from "@angular/common";
import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { SocialMediaLinksComponent } from "../../../shared/components/social-media-links/social-media-links.component";
import { LanguageService } from "../../services/services/language.service";
import { NavbarLanguageComponent } from "./navbar-language/navbar-language.component";
import { NavbarRoutingComponent } from "./navbar-routing/navbar-routing.component";
import { MobileMenuService } from "./mobile-menu.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    AsyncPipe,
    TranslateModule,
    NavbarRoutingComponent,
    NavbarLanguageComponent,
    SocialMediaLinksComponent,
    RouterLink,
    CommonModule
  ],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  constructor(private mobileMenuService: MobileMenuService) {
    this.mobileMenuService.isOpen$.subscribe(isOpen => {
      this.isMobileMenuOpen = isOpen;
    });
  }
  languageService = inject(LanguageService);
  cdr = inject(ChangeDetectorRef);
  ngOnInit(): void {
    this.cdr.detectChanges(); // ✅ Force change detection
  }
  toggleMobileMenu() {
    this.mobileMenuService.toggleMobileMenu();
  }
}
