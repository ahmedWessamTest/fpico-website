import { DOCUMENT, isPlatformServer } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { filter, map, Subscription } from 'rxjs';
import { FooterComponent } from './core/components/footer/footer.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { platformServer } from '@angular/platform-server';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule,
    FormsModule,
    NavbarComponent,
    FooterComponent,
    NgxSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FPICO';

  private langSubscription!: Subscription;
  private routerSubscription!: Subscription;

  private router = inject(Router);
  private titleService = inject(Title);
  private meta = inject(Meta);
  private spinner = inject(NgxSpinnerService);
  private translate = inject(TranslateService);
  private _PLATFORM_ID = inject(PLATFORM_ID);
  private renderer = inject(Renderer2)

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang('ar');
    this.translate.use('ar');
  }

  ngOnInit(): void {
    this.spinner.show();

    // Initialize meta title/description on first load
    this.updateMetaTags();

    // Subscribe to language changes
    this.langSubscription = this.translate.onLangChange.subscribe(() => {
      this.updateMetaTags();
    });

    // Subscribe to route changes
    this.routerSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.router.routerState.root;
          while (child.firstChild) {
            child = child.firstChild;
          }
          return child.snapshot.data;
        })
      )
      .subscribe((data) => {
        this.setMetaTags(data);
      });
  }

  // @HostListener("window:load")
  // onWindowLoad() {
  //   timer(100).subscribe(() => this.spinner.hide());
  // }

  private updateMetaTags() {
    const currentRoute = this.router.routerState.snapshot.root;
    let child = currentRoute;
    while (child.firstChild) {
      child = child.firstChild;
    }
    this.setMetaTags(child.data);
  }

  private setMetaTags(data: any) {
    if (data['title']) {
      this.translate.get(data['title']).subscribe((translatedTitle) => {
        this.titleService.setTitle(translatedTitle);
      });
    }
    if (data['description']) {
      this.translate.get(data['description']).subscribe((translatedDesc) => {
        this.meta.updateTag({
          name: 'description',
          content: translatedDesc,
        });
      });
    }
    const currentLang = this.translate.currentLang;

    // Add meta keywords only if Arabic
    if (currentLang === 'ar') {
      this.meta.updateTag({
        name: 'keywords',
        content: 'فبيكو خدمات المقاولات',
      });
    } else {
      this.meta.removeTag("name='keywords'"); // Remove if not Arabic
    }

    const currentPath = this.router.url;
    const withoutLangPrefix = currentPath.replace(/^\/(ar|en)/, '');
    const cleanSlug = withoutLangPrefix === '/' ? '' : withoutLangPrefix;

    // Update Canonical URL with production domain
    const canonicalUrl = `https://fpico.org/${currentLang}${cleanSlug}`;
    
    // Update alternate language links
    const alternateUrl = `https://fpico.org/${
      currentLang === 'ar' ? 'en' : 'ar'
    }${cleanSlug}`;
    this.updateAlternateLinks(canonicalUrl, alternateUrl);
  }

 



  private updateAlternateLinks(currentUrl: string, alternateUrl: string): void {
    // Remove existing alternate links
    const existingAlternates = this.document.querySelectorAll(
      'link[rel="alternate"]',
    );
    existingAlternates.forEach((link) => link.remove());
    const existingCanonical = this.document.querySelectorAll(
      'link[rel="canonical"]',
    );
    existingCanonical.forEach((link) => link.remove());

    const oldSchemas = this.document.head.querySelectorAll('script[type="application/ld+json"]');
    oldSchemas.forEach(el => el.remove());
    const currentLang = this.translate.currentLang;
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "GeneralContractor",
      "name": currentLang === 'ar' ? "FIPCO" : "FIPCO",
      "image": "https://fpico.org/images/my-fav.ico/web-app-manifest-192x192.png",
      "@id": "",
      "url": currentLang === 'ar' ? "https://fpico.org/ar" : "https://fpico.org/en",
      "telephone": "009660558200003",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": currentLang === 'ar'
          ? "طريق الملك عبد العزيز, الياسمين 13322"
          : "King Abdul Aziz Road, Al Yasmin 13322",
        "addressLocality": currentLang === 'ar' ? "الرياض" : "Riyadh",
        "postalCode": "00966",
        "addressCountry": "SA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 24.8113661,
        "longitude": 46.6476203
      },
      "sameAs": "https://www.linkedin.com/company/fpicosa"
    };
    const head = this.document.head;
    const title = head.querySelector('title');
    

    // Add current language alternate
    
    const currentAlt = this.renderer.createElement('link');
    currentAlt.setAttribute('rel', 'alternate');
    currentAlt.setAttribute('hreflang', currentLang + "-SR");
    currentAlt.setAttribute('href', currentUrl);
     this.renderer.insertBefore(head,currentAlt,title?.nextSibling);

    // Add alternate language link
    const alternateLang = currentLang === 'ar' ? 'en' : 'ar';
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'type', 'application/ld+json');
    script.textContent = JSON.stringify(schemaData);
    this.renderer.appendChild(head,script,);
    const altLink = this.renderer.createElement('link');
    altLink.setAttribute('rel', 'alternate');
    altLink.setAttribute('hreflang', alternateLang + "-SR");
    altLink.setAttribute('href', alternateUrl);
     this.renderer.insertBefore(head,altLink,title?.nextSibling);
      
     const xDefault = this.renderer.createElement('link');
    xDefault.setAttribute('rel', 'alternate');
    xDefault.setAttribute('hreflang', 'x-default');
    xDefault.setAttribute('href', currentUrl.replace(/\/(ar|en)/, '/ar'));
    this.renderer.insertBefore(head,xDefault,title?.nextSibling);

    const canonicalEl  = this.renderer.createElement('link') as HTMLLinkElement;
    canonicalEl.setAttribute('rel', 'canonical');
    canonicalEl.setAttribute('href', currentUrl);
      this.renderer.insertBefore(head, canonicalEl, title?.nextSibling);  
  }
  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  // Prevent right click
  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: MouseEvent): void {
    event.preventDefault();
  }

  // Prevent drag on images
  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent): void {
    event.preventDefault();
  }
}
