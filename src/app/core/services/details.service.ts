import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { WEB_SITE_BASE_URL } from "../constants/WEB_SITE_BASE_URL";
import { Observable } from "rxjs";
import { IServicesDetails } from "../interfaces/IServicesDetails";
import { IProjectDetails } from "../interfaces/IProjectDetails";

@Injectable({
  providedIn: "root",
})
export class DetailsService {
  http = inject(HttpClient);

  getServicesDetails(id: number): Observable<IServicesDetails> {
    return this.http.get<IServicesDetails>(`${WEB_SITE_BASE_URL}getSpecificService/${id}`);
  }
  getProjectDetails(id: number): Observable<IProjectDetails> {
    return this.http.get<IProjectDetails>(`${WEB_SITE_BASE_URL}getSpecificProject/${id}`);
  }
}
