import { isPlatformBrowser } from '@angular/common';
import { inject, Pipe, PipeTransform, PLATFORM_ID } from '@angular/core';

@Pipe({
  name: 'insertAd',
  standalone: true,
})
export class InsertAdPipe implements PipeTransform {
  transform(content: string): string {
    const adBanner = `
      <div class="banner_parent">
        <div class="banner_text my-3 my-md-0">
          <p>تبحث عن خدمات إنشائية أو مقاولات في السعودية؟</p>
          <p>تواصل مع مهندسينا الآن</p>
        </div>
        <div class="banner_image_banner">
          <a href="https://wa.me/9660558200003" class="text-main" target="_blank" rel="noopener">
            <img src="/images/WhatsApp_icon_Floating_icon.png" alt="WhatsApp" />
            واتساب
          </a>
        </div>
      </div>
    `;
    let elements = this.splitContentToElements(content);

    // Insert ad banner after every 10 elements
    for (let i = 10; i < elements.length; i += 11) {
      elements.splice(i, 0, adBanner);
    }

    return elements.join('');
  }

  _PLATFORM_ID = inject(PLATFORM_ID);

  // Function to split content into individual elements
  private splitContentToElements(content: string): string[] {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const elements = Array.from(doc.body.children);
      return elements.map((el) => el.outerHTML);
    }
    return [];
  }
}
