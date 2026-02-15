import { HttpClient } from "@angular/common/http";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { WEB_SITE_BASE_URL } from "../../constants/WEB_SITE_BASE_URL";
import { IHomeData } from "../../interfaces/IHomeData";
import { Service } from "../../interfaces/IServicesData";

@Injectable({
  providedIn: "root",
})
export class HomeDataService {
  footerServices = new BehaviorSubject<Service[]>([]);

  http = inject(HttpClient);
  _PLATFORM_ID = inject(PLATFORM_ID);

  getHomeData(): Observable<any | null> {
    return this.http.get<IHomeData>(`${WEB_SITE_BASE_URL}home`);
    // return this.http.get<IHomeData>(`https://test-api-tau-lemon.vercel.app/api/test`);
  }
}
