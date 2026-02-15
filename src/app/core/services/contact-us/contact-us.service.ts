import { HttpClient } from "@angular/common/http";
import { inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { WEB_SITE_BASE_URL } from "../../constants/WEB_SITE_BASE_URL";
import { IAllLinks } from "../../interfaces/ILinks";
import { IServices } from "../../interfaces/IServicesData";

@Injectable({
  providedIn: "root",
})
export class ContactUsService {
  public contactSubject = signal<IAllLinks | undefined>(undefined);

  private _PLATFORM_ID = inject(PLATFORM_ID);
  private http = inject(HttpClient);

  sendUserData(userData: {}) {
    return this.http.post(`${WEB_SITE_BASE_URL}submitform`, userData);
  }

  getAllServices(): Observable<IServices> {
    return this.http.get<IServices>(`${WEB_SITE_BASE_URL}getServices`);
  }

  getAllLinks(): Observable<IAllLinks> {
    return this.http.get<IAllLinks>(`${WEB_SITE_BASE_URL}getContact`).pipe(
      tap((response) => {
        this.contactSubject.set(response);
      })
    );
  }
}
