import { Component, OnInit } from '@angular/core';
import { PacienteDashboard } from "../../core/models/paciente-dashboard.model";
import { Agendamento } from "../../core/models/agendamento.model";
import { PacienteService } from "../../core/services/paciente/paciente.service";
import {AgendamentoListaComponent} from "../../shared/components/agendamento-lista.component";
import {CommonModule} from "@angular/common";
import {MatTab, MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import {ComprarPontosComponent} from "../pontos/compra-pontos/compra-pontos.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dashboard-paciente',
  imports: [
    CommonModule,
    AgendamentoListaComponent,
    MatTab,
    MatTabGroup
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardData!: PacienteDashboard;

  constructor(private pacienteService: PacienteService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.pacienteService.getDashboardData().subscribe(data => {
      this.dashboardData = data;
      console.log(this.dashboardData)
    });
  }

  getAgendamentosPorStatus(status: string): Agendamento[] {
    return this.dashboardData.agendamentos.filter(a => a.status === status);
  }

  abrirDialogCompra() {
    const dialogRef = this.dialog.open(ComprarPontosComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Compra realizada com sucesso');
        this.atualizarDashboard(); // aqui atualiza saldo e agendamentos
      }
    });
  }

  private atualizarDashboard(): void {
    this.pacienteService.getDashboardData().subscribe(data => {
      this.dashboardData = data;
    });
  }

}
