// comprar-pontos-dialog.component.ts
import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from "../../../core/services/auth/auth.service";
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {UsuarioService} from "../../../core/services/usuario/usuario.service";

@Component({
  selector: 'app-compra-pontos',
  standalone: true,
  templateUrl: './compra-pontos.component.html',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, NgIf]
})
export class ComprarPontosComponent {
  quantidadeControl = new FormControl(1, [Validators.required, Validators.min(1)]);
  valorTotal = 0;

  constructor(
    private dialogRef: MatDialogRef<ComprarPontosComponent>,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {}

  calcularValor() {
    this.valorTotal = (this.quantidadeControl.value || 0) * 5;
  }

  comprar() {
    this.usuarioService.getUserId().subscribe({
      next: (userId) => {
        const dto = {
          quantidadePontos: this.quantidadeControl.value,
          valorReais: this.valorTotal,
          descricao: 'COMPRA DE PONTOS'
        };

        this.usuarioService.comprarPontos(userId, dto).subscribe(() => {
          this.dialogRef.close(true);
        });
      },
      error: (err) => {
        console.error('Erro ao obter userId', err);
      }
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
