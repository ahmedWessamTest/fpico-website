import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: '<div>Redirecting...</div>'
})
export class NotFoundComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Always redirect to /ar with 301 status
    if (isPlatformServer(this.platformId)) {
      // We'll handle the 301 status in the server.ts
      this.router.navigate(['/ar']);
    } else {
      // Client-side redirect
      window.location.href = '/ar';
    }
  }
    }


