import { Component, inject } from "@angular/core";
import { ContactUsService } from "../../../core/services/contact-us/contact-us.service";
import { IAllLinks } from "./../../../core/interfaces/ILinks";

@Component({
  selector: "app-social-media-links",
  standalone: true,
  imports: [],
  templateUrl: "./social-media-links.component.html"
})
export class SocialMediaLinksComponent {
  allLinks!: IAllLinks;

  contactUsService = inject(ContactUsService);

  ngOnInit(): void {
    this.contactUsService.getAllLinks().subscribe({
      next: (response) => {
        this.allLinks = response;
      },
    });
  }
}
