import {Component, Inject, Input, OnInit} from '@angular/core';
import { RegisterService } from '../../core/services/auth/register.service';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Usuario} from "../../core/models/usuario.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../core/services/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register-funcionario.component.html',
  styleUrls: ['./register-funcionario.component.css'],
  imports: [
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class RegisterFuncionarioComponent implements OnInit {
  @Input() modoEdicao = false;

  cpf: string = '';
  name: string = '';
  email: string = '';
  cep: string = '';
  address: string = '';
  password: string = '';
  points: number = 0;
  id?: number;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private registerService: RegisterService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<RegisterFuncionarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.modoEdicao = true;
      this.id = this.data.id;
      this.cpf = this.data.cpf;
      this.name = this.data.nome;
      this.email = this.data.email;
      this.cep = this.data.cep!;
      this.address = this.data.endereco!;
      this.points = this.data.pontos!;
    }
  }

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
    if (this.modoEdicao) {
      const payload = {
        id: this.id,
        cpf: this.cpf,
        nome: this.name,
        email: this.email,
        cep: this.cep,
        endereco: this.address,
        pontos: this.points,
        tipo: 'FUNCIONARIO'
      };

      this.authService.atualizarFuncionario(payload).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: () => {
          this.errorMessage = 'Erro ao atualizar funcionário.';
        }
      });
    } else {
      this.password = Math.floor(1000 + Math.random() * 9000).toString();
      const userData = {
        cpf: this.cpf,
        nome: this.name,
        email: this.email,
        cep: this.cep,
        endereco: this.address,
        senha: this.password,
        pontos: this.points,
        tipo: 'FUNCIONARIO'
      };

      this.registerService.register(userData).subscribe({
        next: () => {
          this.successMessage = 'Cadastro realizado com sucesso!';
          this.dialogRef.close(true);
        },
        error: () => {
          this.errorMessage = 'Erro ao realizar o cadastro.';
        }
      });
    }
  }

}
