import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatIconModule }      from '@angular/material/icon';
import { MatButtonModule }    from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './log-in.html',
  styleUrls: ['./log-in.css']
})
export class LogIn implements OnInit {
  signinForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,private router: Router ) {}

  ngOnInit() {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.signinForm.valid) {
      console.log('Login data:', this.signinForm.value);
      alert('Successfully signed in ');
      this.router.navigate(['/']);
      this.signinForm.reset();
    } else {
      this.signinForm.markAllAsTouched();
    }
  }
}