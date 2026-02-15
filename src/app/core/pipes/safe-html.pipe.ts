import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { inject } from "@angular/core";

@Pipe({
  name: "safeHtml",
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  sanitizer = inject(DomSanitizer);

  transform(value: unknown): SafeHtml {
    if (typeof value === "string") {
      return this.sanitizer.bypassSecurityTrustHtml(value);
    }
    return "";
  }
}
