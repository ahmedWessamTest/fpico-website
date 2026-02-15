import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileMenuService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  toggleMobileMenu() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  closeMobileMenu() {
    this.isOpenSubject.next(false);
  }
}
