import { Component } from '@angular/core';
import { ContactUsFormComponent } from '../../contact-us/contact-us-form/contact-us-form.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us-contact-form',
  standalone: true,
  imports: [ContactUsFormComponent, TranslateModule],
  templateUrl: './about-us-contact-form.component.html',
  styleUrl: './about-us-contact-form.component.scss',
})
export class AboutUsContactFormComponent {}
