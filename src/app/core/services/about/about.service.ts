import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAboutData } from "../../interfaces/IAboutData";
import { WEB_SITE_BASE_URL } from "../../constants/WEB_SITE_BASE_URL";

@Injectable({
  providedIn: "root",
})
export class AboutService {
  http = inject(HttpClient);

  getAboutData(): Observable<IAboutData> {
    return this.http.get<IAboutData>(`${WEB_SITE_BASE_URL}getabout`);
  }
}
