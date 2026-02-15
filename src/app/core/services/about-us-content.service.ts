import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AboutUsContentService {
  aboutUsContent = {
    mainTitle: "home.about-us.two.title",
    data: [
      {
        title: "home.about.us.two.sub-title",
        description: "home.about.us.two.sub-desc",
      },
      {
        title: "home.about.us.two.sub-title02",
        description: "home.about.us.two.sub-desc02",
      },
      {
        title: "home.about.us.two.sub-title03",
        description: "home.about.us.two.sub-desc03",
      },
    ],
  };
}
