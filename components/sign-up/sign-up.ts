import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatSelectModule }    from '@angular/material/select';
import { MatIconModule }      from '@angular/material/icon';
import { MatButtonModule }    from '@angular/material/button';
import { MatDatepickerModule }    from '@angular/material/datepicker';
import { MatNativeDateModule }    from '@angular/material/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule
  ],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.css']
})
export class SignUp implements OnInit {
  signupForm!: FormGroup;
  countries: { code: string; name: string }[] = [];
  dialCodes: { code: string; dial_code: string }[] = [];
  showPassword = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      birthDate: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      dialCode: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      language: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loadCountries();
    this.loadDialCodes();
  }

  private loadCountries() {
    this.http.get<any[]>('https://api.salesvault.vc/api/countries').subscribe({
      next: data => {
        this.countries = data.map(item => ({
          code: item.code ?? item.alpha2Code ?? item.iso2,
          name: item.name ?? item.countryName
        }));
      },
      error: err => console.error('Failed to load countries', err)
    });
  }

  private loadDialCodes() {
    this.http.get<any[]>('https://api.salesvault.vc/api/countries/dial-codes').subscribe({
      next: data => {
        this.dialCodes = data.map(item => ({
          code: item.code ?? item.countryCode,
          dial_code: item.dial_code ?? item.dialCode
        }));
      },
      error: err => console.error('Failed to load dial codes', err)
    });
  }

  onCountryChange(event: any) {
    const selectedCountryCode = event.value;
    const found = this.dialCodes.find(d => d.code === selectedCountryCode);
    if (found) {
      this.signupForm.patchValue({ dialCode: found.dial_code });
    } else {
      this.signupForm.patchValue({ dialCode: '' });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form submitted:', this.signupForm.value);
      alert('🎉 Congratulations! You have successfully signed up!');
      this.signupForm.reset();
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}