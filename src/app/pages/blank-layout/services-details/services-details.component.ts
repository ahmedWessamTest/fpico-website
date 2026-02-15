import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { WEB_SITE_BASE_URL_IMAGE } from '../../../core/constants/WEB_SITE_BASE_URL';
import { IService } from '../../../core/interfaces/IServices';
import { IServicesDetails } from '../../../core/interfaces/IServicesDetails';
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';
import { DetailsService } from '../../../core/services/details.service';
import { PagesHeaderComponent } from '../../../shared/components/pages-header/pages-header.component';
import { HDownloadPdfSectionComponent } from '../home/h-download-pdf-section/h-download-pdf-section.component';
@Component({
  selector: 'app-services-details',
  standalone: true,
  imports: [
    TranslateModule,
    HDownloadPdfSectionComponent,
    PagesHeaderComponent,
    SafeHtmlPipe,
    CarouselModule,
    NgClass,
  ],
  templateUrl: './services-details.component.html',
  styleUrl: './services-details.component.css',
})
export class ServicesDetailsComponent implements OnInit {
  isRTL: boolean = false;
  title = inject(Title);
  meta = inject(Meta);
  _ActivatedRoute = inject(ActivatedRoute);
  detailsService = inject(DetailsService);
  _TranslateService = inject(TranslateService);
  Subscription!: Subscription;
  selectedImage: string = '';

  WEB_SITE_BASE_URL_IMAGE = WEB_SITE_BASE_URL_IMAGE;
  ngOnInit(): void {
    this.Subscription = this._TranslateService.onLangChange.subscribe(
      (params: LangChangeEvent) => {
        if (
          params.lang === 'ar' ||
          this._TranslateService.currentLang === 'ar'
        ) {
          this.isRTL = true;
        } else {
          this.isRTL = false;
        }
        this.handleMeta();
      }
    );
    if (this._TranslateService.currentLang === 'ar') {
      this.isRTL = true;
    } else {
      this.isRTL = false;
    }
    this.getCurrentProjectId();
  }
  currentProject!: IService;
  handleMeta() {
    if (this._TranslateService.currentLang === 'ar') {
      this.isRTL = true;
      this.customOptions = {
        rtl: true,
        ...this.customOptions,
        navText: ['السابق', 'التالي'],
      };
    } else {
      this.isRTL = false;
      this.customOptions = {
        rtl: false,
        ...this.customOptions,
        navText: ['Prev', 'Next'],
      };
    }
    if (this.servicesDetails) {
      if (this.isRTL) {
        this.customOptions = {
          rtl: true,
          ...this.customOptions,
          navText: ['السابق', 'التالي'],
        };
        this.title.setTitle(this.servicesDetails.service.ar_meta_title);
        this.meta.updateTag({
          name: 'description',
          content: this.servicesDetails.service.ar_meta_text || '',
        });
      } else {
        this.customOptions = {
          rtl: false,
          ...this.customOptions,
          navText: ['Prev', 'Next'],
        };
        this.title.setTitle(this.servicesDetails.service.en_meta_text);
        this.meta.updateTag({
          name: 'description',
          content: this.servicesDetails.service.en_meta_text,
        });
      }
    }
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    freeDrag: false, // Prevent free drag to avoid half drag
    dotsData: true,
    dotsSpeed: 700,
    navSpeed: 700,
    navText: ['Prev', 'Next'], // Customize the navigation text
    margin: 10,
    items: 1,
    nav: true,
    dragEndSpeed: 600, // Ensure smooth dragging to the next item
  };
  getCurrentProjectId(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (response) => {
        const ID = parseInt(response?.get('id') || '') as number;
        // this.getCurrentProject(ID);
        this.getServicesDetails(ID);
      },
    });
  }

  servicesDetails!: IServicesDetails;

  getServicesDetails(ID: number): void {
    this.detailsService.getServicesDetails(ID).subscribe({
      next: (response) => {
        this.servicesDetails = response;
        this.handleMeta();
        this.loadImage();
        this.groupImages();
      },
    });
  }

  openModal(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  closeModal() {
    this.selectedImage = '';
  }
  groupedImages: any[][] = [];
  groupImages() {
    if (this.servicesDetails?.service?.images) {
      const images = this.servicesDetails.service.images;
      this.groupedImages = [];

      for (let i = 0; i < images.length; i += 5) {
        this.groupedImages.push(images.slice(i, i + 5));
      }
    }
  }

  @ViewChild('videoElement') video!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.video?.nativeElement) {
        const video = this.video.nativeElement;
        video.muted = true; // Ensure it's muted
        video.play().catch((err) => console.warn('Autoplay blocked:', err));
      }
    }, 500);
  }

  loadImage() {
    setTimeout(() => {
      if (this.video?.nativeElement) {
        const video = this.video.nativeElement;
        video.muted = true; // Ensure it's muted
        video.play().catch((err) => console.warn('Autoplay blocked:', err));
      }
    }, 500);
  }
}
