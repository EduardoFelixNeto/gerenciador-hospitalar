import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { UsuarioService } from '../../core/services/usuario/usuario.service';
import { Usuario } from '../../core/models/usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AuthService} from "../../core/services/auth/auth.service";
import {NgForOf} from "@angular/common";
import {RegisterFuncionarioComponent} from "./register-funcionario.component";

@Component({
  selector: 'app-dialog-funcionarios',
  templateUrl: './dialog-funcionarios.component.html',
  styleUrls: ['./dialog-funcionarios.component.css'],
  standalone: true,
  imports: [
    NgForOf
  ]
})
export class DialogFuncionariosComponent implements OnInit {
  funcionarios: Usuario[] = [];

  constructor(
    private dialogRef: MatDialogRef<DialogFuncionariosComponent>,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.authService.listarFuncionarios().subscribe(data => {
      this.funcionarios = data;
    });
  }

  editar(func: Usuario): void {
    const dialogRef = this.dialog.open(RegisterFuncionarioComponent, {
      data: func
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarFuncionarios();
      }
    });
  }

  inativar(id: number) {
    this.authService.getUserId().subscribe({
      next: (usuarioId) => {
        if (usuarioId === id) {
          this.snackBar.open('Você não pode inativar a si mesmo.', 'Fechar', { duration: 3000 });
          return;
        }
      },
      error: () => {
        this.snackBar.open('Erro ao obter usuário logado.', 'Fechar', { duration: 3000 });
      }
    });

    this.authService.inativarFuncionario(id).subscribe({
      next: () => {
        this.snackBar.open('Funcionário inativado com sucesso!', 'Fechar', { duration: 3000 });
        this.carregarFuncionarios();
      },
      error: () => {
        this.snackBar.open('Erro ao inativar funcionário.', 'Fechar', { duration: 3000 });
      }
    });
  }


  fechar() {
    this.dialogRef.close();
  }

  cadastrar(): void {
    const dialogRef = this.dialog.open(RegisterFuncionarioComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarFuncionarios();
      }
    });
  }
}
