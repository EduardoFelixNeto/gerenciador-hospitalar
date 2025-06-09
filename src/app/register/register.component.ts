import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class RegisterComponent {
  cpf: string = '';
  name: string = '';
  email: string = '';
  cep: string = '';
  address: string = '';
  password: string = '';
  points: number = 0;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private registerService: RegisterService, private router: Router) {}

  onCepChange(): void {
    if (this.cep.length === 8) {
      this.registerService.getAddressByCep(this.cep).subscribe({
        next: (data) => {
          if (data.erro) {
            this.errorMessage = 'CEP inválido.';
          } else {
            this.address = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
            this.errorMessage = '';
          }
        },
        error: () => {
          this.errorMessage = 'Erro ao buscar o endereço. Tente novamente.';
        }
      });
    }
  }

  onRegister(): void {
    this.password = Math.floor(1000 + Math.random() * 9000).toString();
    const userData = { cpf: this.cpf, nome: this.name, email: this.email, cep: this.cep, endereco: this.address, senha: this.password, pontos: this.points, tipo: 'PACIENTE' };

    this.registerService.register(userData).subscribe({
      next: (res) => {
        console.log('Sucesso:', res); // <- veja o que está vindo aqui
        this.successMessage = 'Cadastro realizado com sucesso! Verifique seu e-mail para a senha.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        console.error('Erro ao registrar:', err); // <- veja o erro exato
        this.errorMessage = 'Erro ao realizar o cadastro. Tente novamente.';
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
