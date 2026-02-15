import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import {
  CountryISO,
  NgxIntlTelInputModule,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { IServices } from '../../../../core/interfaces/IServicesData';
import { ContactUsService } from '../../../../core/services/contact-us/contact-us.service';
import { OurServicesContentService } from '../../../../core/services/our-services-content.service';

interface PhoneNumber {
  e164Number: string;
}

@Component({
  selector: 'app-contact-us-form',
  standalone: true,
  imports: [
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './contact-us-form.component.html',
  styleUrl: './contact-us-form.component.scss',
})
export class ContactUsFormComponent {
  // Constants
  readonly SearchCountryField = SearchCountryField;
  readonly CountryISO = CountryISO;
  readonly PhoneNumberFormat = PhoneNumberFormat;

  // Services
  private readonly _router = inject(Router);
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _translateService = inject(TranslateService);
  private readonly _ourServicesContentService = inject(
    OurServicesContentService
  );
  private readonly _contactUsService = inject(ContactUsService);

  // State
  readonly startValidation = signal(false);
  readonly isRTL = signal(false);
  readonly successMessage = signal(false);
  readonly isSubmitting = signal(false);
  readonly allServices = signal<IServices | null>(null);

  // Computed
  readonly isFormValid = computed(() => this.messagesForm.valid);
  readonly servicesList = computed(() => this.allServices()?.services ?? []);

  // Form
  readonly messagesForm = new FormGroup({
    full_name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]+$/),
      Validators.minLength(3),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/),
    ]),
    service_id: new FormControl('', [Validators.required]),
    phone: new FormControl<PhoneNumber | null>(null, [Validators.required]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  ngOnInit(): void {
    this._setupLanguageChangeListener();
    this._loadServices();
  }

  private _setupLanguageChangeListener(): void {
    this._translateService.onLangChange.subscribe((params: LangChangeEvent) => {
      this.isRTL.set(params.lang === 'ar');
    });
    this.isRTL.set(this._translateService.currentLang === 'ar');
  }

  private _loadServices(): void {
    this._contactUsService.getAllServices().subscribe({
      next: (response) => {
        this.allServices.set(response);
      },
    });
  }

  onSubmit(): void {
    this.successMessage.set(false);
    this.startValidation.set(true);

    if (this.messagesForm.valid) {
      this.isSubmitting.set(true);
      const phoneValue = this.messagesForm.value.phone as PhoneNumber;
      const userData = {
        ...this.messagesForm.value,
        phone: phoneValue?.e164Number || '',
      };

      this._contactUsService.sendUserData(userData).subscribe({
        next: () => {
          this._handleSuccess();
        },
        error: () => {
          this.isSubmitting.set(false);
        },
      });
    } else {
      this.isSubmitting.set(false);
    }
  }

  private _handleSuccess(): void {
    this.messagesForm.reset();
    this.successMessage.set(true);
    this.messagesForm.get('service_id')?.setValue('');
    this.isSubmitting.set(false);
    this.startValidation.set(false);
  }

  get phoneInputStyles() {
    return {
      height: '100%',
      padding: '1rem',
      'text-align': this.isRTL() ? 'right' : 'left',
      border:
        this.startValidation() && this.messagesForm.get('phone')?.errors
          ? '1px solid red'
          : '1px solid #ccc',
    };
  }
}
