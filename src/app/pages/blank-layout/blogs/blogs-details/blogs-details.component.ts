import {
  AsyncPipe,
  DatePipe,
  isPlatformBrowser,
  SlicePipe,
} from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import {
  WEB_SITE_BASE_URL,
  WEB_SITE_BASE_URL_IMAGE,
} from '../../../../core/constants/WEB_SITE_BASE_URL';
import { IGetBlogById } from '../../../../core/interfaces/IGetBlogById';
import { InsertAdPipe } from '../../../../core/pipes/insert-ad.pipe';
import { RemoveInlineStylesPipe } from '../../../../core/pipes/remove-inline-styles.pipe';
import { SafeHtmlPipe } from '../../../../core/pipes/safe-html.pipe';
import { LanguageService } from '../../../../core/services/services/language.service';
@Component({
  selector: 'app-blogs-details',
  standalone: true,
  imports: [
    TranslateModule,
    SafeHtmlPipe,
    SlicePipe,
    RouterLink,
    AsyncPipe,
    RemoveInlineStylesPipe,
    InsertAdPipe,
    DatePipe,
  ],
  templateUrl: './blogs-details.component.html',
  styleUrl: './blogs-details.component.css',
})
export class BlogsDetailsComponent implements OnInit {
  isRTL: boolean = true;
  title = inject(Title);
  languageService = inject(LanguageService);
  private _PLATFORM_ID = inject(PLATFORM_ID);
  meta = inject(Meta);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  translateService = inject(TranslateService);
  blogDetails!: IGetBlogById;
  processedContent: any[] = [];
  isMainImageLoaded = false;
  isRelatedImageLoaded: { [key: number]: boolean } = {};
  isDesktop = true;

  WEB_SITE_BASE_URL_IMAGE = WEB_SITE_BASE_URL_IMAGE;
  ngOnInit(): void {
    this.getBlogDetails();
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.isDesktop = window.innerWidth > 992;
    }

    this.translateService.onLangChange.subscribe((params: LangChangeEvent) => {
      if (params.lang === 'ar' || this.translateService.currentLang === 'ar') {
        this.isRTL = true;
      } else {
        this.isRTL = false;
      }
      this.handleMeta(this.blogDetails);
    });
    if (this.translateService.currentLang === 'ar') {
      this.isRTL = true;
    } else {
      this.isRTL = false;
    }
  }

  handleMeta(blogDetails: IGetBlogById): void {
    if (blogDetails?.blog) {
      const blog = blogDetails.blog;
      const title = this.isRTL ? blog.ar_meta_title : blog.en_meta_title;
      const description = this.isRTL ? blog.ar_meta_text : blog.en_meta_text;
      const imageUrl = blog.main_image.startsWith('http')
        ? blog.main_image
        : `${WEB_SITE_BASE_URL_IMAGE}blogs/${blog.main_image}`;

      const url = `${WEB_SITE_BASE_URL}/${
        this.isRTL ? blog.ar_slug : blog.en_slug
      }`;

      // Add preload hint for the main image
      if (isPlatformBrowser(this._PLATFORM_ID)) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = imageUrl;
        preloadLink.fetchPriority = 'high';
        document.head.appendChild(preloadLink);
      }

      // ✅ Remove existing meta tags before updating
      this.removeMetaTags();

      // ✅ Update Page Title & Meta Description
      this.title.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });

      // ✅ Open Graph Meta Tags
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:image', content: imageUrl });
      this.meta.updateTag({ property: 'og:url', content: url });
      this.meta.updateTag({ property: 'og:type', content: 'article' });

      // ✅ Twitter Meta Tags
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({
        name: 'twitter:description',
        content: description,
      });
      this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
      this.meta.updateTag({
        name: 'twitter:card',
        content: 'summary_large_image',
      });
      this.meta.updateTag({ name: 'twitter:url', content: url });

      // ✅ Update Canonical URL
      // this.updateCanonicalUrl(url);
      this.updateAlternateLinks(blog);
    }
  }

  private updateAlternateLinks(blog: any): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      // 🔄 Remove all existing alternate links first
      const existingAlts = document.querySelectorAll('link[rel="alternate"]');
      existingAlts.forEach((link) => link.remove());

      const langs: { code: string; slug: string | null }[] = [
        { code: 'ar', slug: blog.ar_slug },
        { code: 'en', slug: blog.en_slug },
      ];

      langs.forEach(({ code, slug }) => {
        if (slug && slug.trim()) {
          const altLink = document.createElement('link');
          altLink.setAttribute('rel', 'alternate');
          altLink.setAttribute('hreflang', code);
          altLink.setAttribute('href', `https://fpico.org/ar/${code}/${slug}`);
          document.head.appendChild(altLink);
        }
      });
    }
  }

  /**
   * Removes existing meta tags to prevent duplicates.
   */
  private removeMetaTags(): void {
    const metaTagsToRemove = [
      'description',
      'og:title',
      'og:description',
      'og:image',
      'og:url',
      'og:type',
      'twitter:title',
      'twitter:description',
      'twitter:image',
      'twitter:card',
      'twitter:url',
    ];

    metaTagsToRemove.forEach((tag) => {
      this.meta.removeTag(`name='${tag}'`);
      this.meta.removeTag(`property='${tag}'`);
    });
  }

  /**
   * Updates canonical URL.
   */
  private updateCanonicalUrl(url: string): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const canonicalSelector = 'link[rel="canonical"]';
      let existingCanonical = document.querySelector(
        canonicalSelector
      ) as HTMLLinkElement;

      if (existingCanonical) {
        existingCanonical.href = url;
      } else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = url;
        document.head.appendChild(link);
      }
    }
  }

  getBlogDetails(): void {
    this.activatedRoute.data.subscribe(({ blogDetails }) => {
      // Reset loading states when new data is received
      this.isMainImageLoaded = false;
      this.isRelatedImageLoaded = {};

      this.handleMeta(blogDetails);
      this.blogDetails = blogDetails;
    });
  }

  onMainImageLoad() {
    setTimeout(() => {
      this.isMainImageLoaded = true;
    }, 300);
  }

  onRelatedImageLoad(blogId: number) {
    setTimeout(() => {
      this.isRelatedImageLoaded[blogId] = true;
    }, 300);
  }

  @HostListener('window:resize')
  onResize() {
    this.isDesktop = window.innerWidth > 992;
  }
}
