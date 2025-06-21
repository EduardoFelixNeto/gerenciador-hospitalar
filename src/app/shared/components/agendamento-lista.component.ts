import { Component, Input } from '@angular/core';
import { Agendamento } from "../../core/models/agendamento.model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-agendamento-lista',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table *ngIf="agendamentos?.length; else empty">
      <thead>
        <tr>
          <th>Código</th>
          <th>Data</th>
          <th>Pontos Utilizados</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let ag of agendamentos">
          <td>{{ ag.codigoAgendamento }}</td>
          <td>{{ ag.dataHoraAgendamento | date }}</td>
          <td>{{ ag.pontosUtilizados }}</td>
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
}
