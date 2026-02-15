import { isPlatformBrowser } from '@angular/common';
import { inject, Pipe, PipeTransform, PLATFORM_ID } from '@angular/core';

@Pipe({
  name: 'removeInlineStyles',
  standalone: true,
})
export class RemoveInlineStylesPipe implements PipeTransform {
  _PLATFORM_ID = inject(PLATFORM_ID);

  transform(value: string): string {
    if (!value) return '';

    if (!isPlatformBrowser(this._PLATFORM_ID)) return '';
    // 1. Parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, 'text/html');
    // 2. Process all elements in the document
    this.cleanElement(doc.body);
    // 3. Return the cleaned HTML content
    return doc.body.innerHTML;
  }

  // Helper method to remove all attributes from an element
  private cleanElement(element: Element): void {
    // Remove all attributes from the element, but preserve certain important ones
    Array.from(element.attributes).forEach((attr) => {
      const shouldKeep =
        attr.name === 'src' ||
        attr.name === 'width' ||
        (attr.name === 'href' && element.tagName.toLowerCase() === 'a');

      if (!shouldKeep) {
        element.removeAttribute(attr.name);
      }
    });

    // Remove inline styles specifically (this is redundant since style is already removed above, but kept for clarity)
    element.removeAttribute('style');

    // Add basic styling to anchor tags
    if (element.tagName.toLowerCase() === 'a' && element.hasAttribute('href')) {
      element.setAttribute(
        'style',
        'color: #edbd7e; text-decoration: underline; font-weight: bold;'
      );
    }

    // Recursively clean all child elements
    Array.from(element.children).forEach((child) => {
      this.cleanElement(child);

      // Remove empty elements (those without content or only whitespace)
      if (
        child.children.length === 0 &&
        !child.textContent?.trim() &&
        !child.hasAttribute('src')
      ) {
        child.remove();
      }
    });
  }
}
