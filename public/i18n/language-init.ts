import { EnvironmentInjector } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

export async function initializeLanguage(injector: EnvironmentInjector) {
  const router = injector.get(Router);
  const translate = injector.get(TranslateService);

  // Wait for router to initialize
  router.initialNavigation();

  // Get language from URL
  const langFromUrl = router.url.split("/")[1];
  const fallbackLang = "ar";

  const lang = ["en", "ar"].includes(langFromUrl) ? langFromUrl : fallbackLang;

  // Set default + use
  translate.setDefaultLang(fallbackLang);
  await translate.use(lang).toPromise();
}
