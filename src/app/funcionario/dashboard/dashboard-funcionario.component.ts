import { Component, OnInit } from '@angular/core';
import { Consulta } from '../../core/models/consulta.model';
import { ConsultaService } from '../../core/services/consulta/consulta.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {AgendamentoService} from "../../core/services/agendamento/agendamento.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmarComparecimentoDialogComponent} from "./confirmar-comparecimento-dialog.component";
import {CadastroConsultaDialogComponent} from "./cadastro-consulta-dialog.component";
import {RegisterComponent} from "../../auth/register/register.component";
import {RegisterFuncionarioComponent} from "./register-funcionario.component";
import {DialogFuncionariosComponent} from "./dialog-funcionarios.component";

@Component({
  selector: 'app-dashboard-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './dashboard-funcionario.component.html',
  styleUrls: ['./dashboard-funcionario.component.css']
})
export class DashboardFuncionarioComponent implements OnInit {
  consultas: Consulta[] = [];

  constructor(
    private consultaService: ConsultaService,
    private agendamentoService: AgendamentoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.atualizarLista();
  }

  atualizarLista() {
    this.consultaService.getProximas48Horas().subscribe(data => {
      this.consultas = data;
    });
  }

  cancelar(id: number) {
    this.consultaService.cancelarConsulta(id).subscribe({
      next: () => {
        this.snackBar.open('Consulta cancelada com sucesso!', 'Fechar', { duration: 3000 });
        this.atualizarLista();
      },
      error: err => {
        this.snackBar.open(err.error.message || 'Erro ao cancelar consulta.', 'Fechar', { duration: 3000 });
      }
    });
  }

  realizar(id: number) {
    this.consultaService.realizarConsulta(id).subscribe({
      next: () => {
        this.snackBar.open('Consulta marcada como realizada.', 'Fechar', { duration: 3000 });
        this.atualizarLista();
      },
      error: err => {
        this.snackBar.open(err.error.message || 'Erro ao realizar consulta.', 'Fechar', { duration: 3000 });
      }
    });
  }

  abrirDialogoConfirmar() {
    const dialogRef = this.dialog.open(ConfirmarComparecimentoDialogComponent);

    dialogRef.afterClosed().subscribe((codigoAgendamento: string) => {
      if (codigoAgendamento) {
        this.agendamentoService.confirmarPresencaPorCodigo(codigoAgendamento).subscribe({
          next: () => {
            this.snackBar.open('Presença confirmada com sucesso!', 'Fechar', { duration: 3000 });
            this.atualizarLista();
          },
          error: err => {
            this.snackBar.open(err.error.message || 'Erro ao confirmar presença.', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }

  abrirDialogoCadastroConsulta(): void {
    const dialogRef = this.dialog.open(CadastroConsultaDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.atualizarLista();
      }
    });
  }

  abrirDialogFuncionarios() {
    this.dialog.open(DialogFuncionariosComponent);
  }


}
