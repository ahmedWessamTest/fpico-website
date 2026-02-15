import { isPlatformBrowser } from "@angular/common";
import { Component, inject, Inject, OnInit, PLATFORM_ID, Renderer2 } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Meta } from "@angular/platform-browser";

@Component({
  selector: "app-navbar-language",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./navbar-language.component.html",
  styleUrl: "./navbar-language.component.scss",
})
export class NavbarLanguageComponent implements OnInit {
  selectedLanguage = "ar"; // Default language
  isBrowser: boolean = false;

  private readonly translateService = inject(TranslateService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly renderer = inject(Renderer2);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this._PLATFORM_ID);
    let routeLang = this.route.snapshot.firstChild?.paramMap.get("lang") || "ar";

    if (!["en", "ar"].includes(routeLang)) {
      this.router.navigate(["/ar"], { replaceUrl: true });
      return;
    }
    this.setLanguage(routeLang);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let routeLang = this.route.snapshot.firstChild?.paramMap.get("lang") || "ar";
        if (!["en", "ar"].includes(routeLang)) {
          this.router.navigate(["/ar"], { replaceUrl: true });
          return;
        }
        this.setLanguage(routeLang);
      }
    });
  }

  /**
   * Function to handle user-selected language change.
   */
  onLanguageChange() {
    if (this.isBrowser) {
      this._NgxSpinnerService.show();
    }

    this.translateService.use(this.selectedLanguage).subscribe({
      next: () => {
        this._NgxSpinnerService.hide();
      },
    });

    // Get the current route URL
    const currentUrlTree = this.router.parseUrl(this.router.url);

    // Replace the first path segment (language)
    const segments = currentUrlTree.root.children["primary"]?.segments || [];
    if (segments.length > 0) {
      segments[0] = this.router.createUrlTree([this.selectedLanguage]).root.children["primary"]?.segments[0]!;
    }

    const newUrl = segments.map((s) => s.path).join("/");

    // Navigate to the updated path with query params preserved
    this.router.navigate([`/${newUrl}`], {
      queryParams: this.route.snapshot.queryParams,
    });

    this.updateHtmlAttributes();
    this.updateRobotsMetaTag();
  }

  /**
   * Function to set the application language.
   */
  private setLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translateService.use(lang).subscribe(() => {
      this.updateHtmlAttributes();
      this.updateRobotsMetaTag();
    });
  }

  /**
   * Function to update HTML attributes (dir & lang).
   */
  private updateHtmlAttributes() {
    if (this.isBrowser) {
      const direction = this.selectedLanguage === "ar" ? "rtl" : "ltr";
      this.renderer.setAttribute(document.documentElement, "dir", direction);
      this.renderer.setAttribute(document.documentElement, "lang", this.selectedLanguage);
    }
  }
  /**
   * Function to update the robots meta tag based on the language.
   */
  private updateRobotsMetaTag() {
    const currentUrl = this.router.url;

    if (currentUrl.includes("/en")) {
      // Set the robots meta tag to 'noindex, nofollow' for English URLs
      this.meta.updateTag({ name: "robots", content: "noindex, nofollow" });
    } else {
      // Remove the robots meta tag if the URL doesn't contain 'en'
      this.meta.removeTag("name='robots'");
    }
  }
}
