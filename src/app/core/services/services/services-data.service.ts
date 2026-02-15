import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IServices } from "../../interfaces/IServicesData";
import { Observable } from "rxjs";
import { WEB_SITE_BASE_URL } from "../../constants/WEB_SITE_BASE_URL";

@Injectable({
  providedIn: "root",
})
export class ServicesDataService {
  http = inject(HttpClient);

  getServicesData(): Observable<IServices> {
    return this.http.get<IServices>(`${WEB_SITE_BASE_URL}getServices`);
  }
}
