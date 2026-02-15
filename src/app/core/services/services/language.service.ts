import { inject, Injectable } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, filter } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  selectedLanguage$ = new BehaviorSubject<string>("ar");

  router = inject(Router);

  route = inject(ActivatedRoute);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const routeLang = this.route.snapshot.firstChild?.paramMap.get("lang") || "ar";
      this.selectedLanguage$.next(routeLang);
    });
  }

  getLanguage() {
    return this.selectedLanguage$.asObservable(); // Observable for components to subscribe
  }

  setLanguage(lang: string) {
    this.selectedLanguage$.next(lang);
  }
}
