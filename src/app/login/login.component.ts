import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/autocadastro']);
      },
      error: (err) => {
        this.errorMessage = 'Login falhou. Verifique suas credenciais.';
      }
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

}
