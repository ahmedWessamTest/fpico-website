import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LanguageService } from "../services/services/language.service";

export const onlyArabicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const lang = route.paramMap.get("lang"); // Get language from route

  // Ensure blogs only accessible in Arabic
  if (lang !== "ar") {
    router.navigate(["/", lang]); // Redirect user to their language homepage
    return false;
  }

  return true;
};
