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
import { IProject } from '../../../core/interfaces/IPorjects';
import { IProjectDetails } from '../../../core/interfaces/IProjectDetails';
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';
import { DetailsService } from '../../../core/services/details.service';
import { PagesHeaderComponent } from '../../../shared/components/pages-header/pages-header.component';
import { HDownloadPdfSectionComponent } from '../home/h-download-pdf-section/h-download-pdf-section.component';
@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    TranslateModule,
    HDownloadPdfSectionComponent,
    PagesHeaderComponent,
    TranslateModule,
    SafeHtmlPipe,
    CarouselModule,
    NgClass,
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
})
export class ProjectDetailsComponent implements OnInit {
  currentProject!: IProject;
  isRTL: boolean = false;
  title = inject(Title);
  meta = inject(Meta);
  _ActivatedRoute = inject(ActivatedRoute);
  detailsService = inject(DetailsService);
  _TranslateService = inject(TranslateService);
  Subscription!: Subscription;
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

    this.getCurrentProjectId();
  }

  getCurrentProjectId(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (response) => {
        const ID = parseInt(response?.get('id') || '') as number;
        // this.getCurrentProject(ID);
        this.getServicesDetails(ID);
      },
    });
  }

  handleMeta() {
    if (this._TranslateService.currentLang === 'ar') {
      this.isRTL = true;
      this.customOptions = {
        ...this.customOptions,
        navText: ['السابق', 'التالي'],
        rtl: true,
      };
    } else {
      this.isRTL = false;
      this.customOptions = {
        ...this.customOptions,
        rtl: false,
        navText: ['Prev', 'Next'],
      };
    }
    if (this.projectDetails) {
      if (this.isRTL) {
        this.customOptions = {
          ...this.customOptions,
          rtl: true,
          navText: ['السابق', 'التالي'],
        };
        this.title.setTitle(this.projectDetails.project.ar_meta_title);
        this.meta.updateTag({
          name: 'description',
          content: this.projectDetails.project.ar_meta_text || '',
        });
      } else {
        this.customOptions = {
          rtl: false,
          ...this.customOptions,
          navText: ['Prev', 'Next'],
        };
        this.title.setTitle(this.projectDetails.project.en_meta_text);
        this.meta.updateTag({
          name: 'description',
          content: this.projectDetails.project.en_meta_text,
        });
      }
    }
  }

  projectDetails!: IProjectDetails;
  projectDetailsArr: IProjectDetails[] = [];

  getServicesDetails(ID: number): void {
    this.detailsService.getProjectDetails(ID).subscribe({
      next: (response) => {
        this.projectDetails = response;
        this.handleMeta();
        this.loadImage();
        this.groupImages();
      },
    });
  }
  selectedImage: string = '';

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

  openModal(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  closeModal() {
    this.selectedImage = '';
  }
  groupedImages: any[][] = [];
  groupImages() {
    if (this.projectDetails?.project?.images) {
      const images = this.projectDetails.project.images;
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
