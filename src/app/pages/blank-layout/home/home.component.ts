import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Client } from '../../../core/interfaces/IAboutData';
import {
  AboutData,
  ArrigationSystem,
  ChairMessage,
  IHomeData,
  Partner,
  Project,
  Service,
  Whyus,
  YoutubeSlider,
} from '../../../core/interfaces/IHomeData';
import { HomeDataService } from '../../../core/services/home/home-data.service';
import { AHeroSectionComponent } from './a-hero-section/a-hero-section.component';
import { BManagerMessageComponent } from './b-manager-message/b-manager-message.component';
import { CAboutUsComponent } from './c-about-us/c-about-us.component';
import { DOurServicesComponent } from './d-our-services/d-our-services.component';
import { EAboutUsComponent } from './e-about-us/e-about-us.component';
import { FOurClientsComponent } from './f-our-clients/f-our-clients.component';
import { GOurProjectsComponent } from './g-our-projects/g-our-projects.component';
import { HDownloadPdfSectionComponent } from './h-download-pdf-section/h-download-pdf-section.component';
import { KOurPartnersComponent } from './k-our-partners/k-our-partners.component';
import { MContactUsComponent } from './m-contact-us/m-contact-us.component';
import { YoutubeSliderComponent } from './youtube-slider/youtube-slider.component';
import { isFoundationDay } from '../../../core/constants/WEB_SITE_BASE_URL';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AHeroSectionComponent,
    BManagerMessageComponent,
    CAboutUsComponent,
    DOurServicesComponent,
    EAboutUsComponent,
    FOurClientsComponent,
    GOurProjectsComponent,
    MContactUsComponent,
    KOurPartnersComponent,
    HDownloadPdfSectionComponent,
    YoutubeSliderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  isRTL: boolean = false;

  isFoundationDay: boolean = isFoundationDay;

  Subscription!: Subscription;

  homeData = inject(HomeDataService);

  _TranslateService = inject(TranslateService);

  _PLATFORM_ID = inject(PLATFORM_ID);

  cr = inject(ChangeDetectorRef);

  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    // Set RTL status once at initialization
    this.isRTL = this._TranslateService.currentLang === 'ar';

    // Subscribe to language changes
    this.Subscription = this._TranslateService.onLangChange.subscribe(
      (params: LangChangeEvent) => {
        this.isRTL =
          params.lang === 'ar' || this._TranslateService.currentLang === 'ar';
        this.cr.markForCheck();
      },
    );

    // Load home data
    this.getHomeData();
  }

  ArrigationSystem!: ArrigationSystem[];
  Partner!: Partner[];
  Project!: Project[];
  Service!: Service[];
  Clients!: Client[];
  allHomeData!: IHomeData;
  AboutData!: AboutData;
  Whyus!: Whyus[];
  ChairMessage!: ChairMessage;
  YoutubeSlider!: YoutubeSlider[];

  getHomeData(): void {
    this.Subscription.add(
      this.homeData.getHomeData().subscribe((data) => {
        if (data) {
          this.allHomeData = data;
          this.ArrigationSystem = data.arrigationSystems;
          this.Partner = data.partners;
          this.Project = data.projects;
          this.Service = data.services;
          this.Clients = data.clients;
          this.AboutData = data.aboutData;
          this.Whyus = data.whyus;
          this.ChairMessage = data.chairMessage;
          this.YoutubeSlider = data.youtubeSlider;
          this.cr.markForCheck();
        }
      }),
    );
  }

  ngOnDestroy(): void {
    if (this.Subscription) {
      this.Subscription.unsubscribe();
    }
  }
}
