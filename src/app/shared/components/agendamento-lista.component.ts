import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Agendamento } from "../../core/models/agendamento.model";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-agendamento-lista',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <table *ngIf="agendamentos?.length; else empty">
      <thead>
      <tr>
        <th>Código</th>
        <th>Data</th>
        <th>Pontos Utilizados</th>
        <th>Ação</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let ag of agendamentos">
        <td>{{ ag.codigoAgendamento }}</td>
        <td>{{ ag.dataHoraAgendamento | date:'short' }}</td>
        <td>{{ ag.pontosUtilizados }}</td>
        <td>
          <button *ngIf="podeCancelar(ag)" mat-button color="warn" (click)="cancelarAgendamento(ag.id)">Cancelar</button>
          <button *ngIf="podeFazerCheckin(ag)" mat-button color="primary" (click)="fazerCheckin(ag.id)">Check-in</button>
        </td>
      </tr>
      </tbody>
    </table>
    <ng-template #empty>
      <p>Nenhum agendamento encontrado.</p>
    </ng-template>
  `
})
export class AgendamentoListaComponent {
  @Input() agendamentos: Agendamento[] = [];
  @Output() cancelar = new EventEmitter<number>();
  @Output() checkin = new EventEmitter<number>();

  cancelarAgendamento(id: number) {
    this.cancelar.emit(id);
  }

  fazerCheckin(id: number) {
    this.checkin.emit(id);
  }

  podeCancelar(ag: Agendamento): boolean {
    return ag.status === 'CRIADO' || ag.status === 'CHECKIN';
  }

  podeFazerCheckin(ag: Agendamento): boolean {
    if (ag.status !== 'CRIADO') return false;
    const agora = new Date();
    const dataConsulta = new Date(ag.dataHoraAgendamento);
    const diffHoras = (dataConsulta.getTime() - agora.getTime()) / (1000 * 60 * 60);
    return diffHoras <= 48 && diffHoras >= 0;
  }
}
