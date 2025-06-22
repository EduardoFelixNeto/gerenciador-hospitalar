import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConsultaService } from '../../../core/services/consulta/consulta.service';
import { Consulta } from '../../../core/models/consulta.model';
import { AgendamentoService } from '../../../core/services/agendamento/agendamento.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import {UsuarioService} from "../../../core/services/usuario/usuario.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-agendar-consulta',
  templateUrl: './agendar-consulta.component.html',
  styleUrls: ['./agendar-consulta.component.scss'],
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatListOption,
    MatSelectionList,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    MatInputModule
  ]
})
export class AgendarConsultaComponent implements OnInit {
  form!: FormGroup;
  consultas: Consulta[] = [];
  valorConsultaSelecionada: number = 0;
  valorFinal: number = 0;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgendarConsultaComponent>,
    private consultaService: ConsultaService,
    private agendamentoService: AgendamentoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      especialidade: [''],
      medico: [''],
      idConsulta: [null, Validators.required],
      pontosUtilizados: [0, [Validators.min(0)]]
    });

    this.form.get('especialidade')?.valueChanges.subscribe(() => this.buscarConsultas());
    this.form.get('medico')?.valueChanges.subscribe(() => this.buscarConsultas());
    this.form.get('pontosUtilizados')?.valueChanges.subscribe(() => this.calcularValor());
  }

  buscarConsultas() {
    const { especialidade, medico } = this.form.value;
    this.consultaService.buscarConsultas(especialidade, medico).subscribe(c => this.consultas = c);
  }

  onSelecionarConsulta(consulta: Consulta) {
    this.form.patchValue({ idConsulta: consulta.id });
    this.valorConsultaSelecionada = consulta.valor;
    this.calcularValor();
  }

  calcularValor() {
    const pontos = this.form.value.pontosUtilizados || 0;
    this.valorFinal = Math.max(this.valorConsultaSelecionada - pontos, 0);
  }

  agendar() {
    this.usuarioService.getUserId().subscribe({
      next: (pacienteId) => {
        const dto = {
          idPaciente: pacienteId,
          pontosUtilizados: this.form.value.pontosUtilizados,
          valorPagoComplementar: this.valorFinal
        };

        this.agendamentoService.agendarConsulta(this.form.value.idConsulta, dto).subscribe(() => {
          this.dialogRef.close(true);
        });
      },
      error: (err) => {
        console.error('Erro ao obter userId do paciente', err);
      }
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
