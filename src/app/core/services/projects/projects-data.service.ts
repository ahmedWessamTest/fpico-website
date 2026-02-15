import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { WEB_SITE_BASE_URL } from "../../constants/WEB_SITE_BASE_URL";
import { Observable } from "rxjs";
import { IProjects } from "../../interfaces/IProjectsData";

@Injectable({
  providedIn: "root",
})
export class ProjectsDataService {
  http = inject(HttpClient);

  getProjectData(): Observable<IProjects> {
    return this.http.get<IProjects>(`${WEB_SITE_BASE_URL}getProjects`);
  }
}
