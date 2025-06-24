import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConsultaService } from '../../core/services/consulta/consulta.service';
import { EspecialidadeService } from '../../core/services/especialidade/especialidade.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cadastro-consulta-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './cadastro-consulta-dialog.component.html'
})
export class CadastroConsultaDialogComponent implements OnInit {
  form!: FormGroup;
  especialidades: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CadastroConsultaDialogComponent>,
    private consultaService: ConsultaService,
    private especialidadeService: EspecialidadeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      dataHora: ['', Validators.required],
      medico: ['', Validators.required],
      valor: ['', Validators.required],
      vagas: ['', Validators.required],
      especialidadeCodigo: ['', Validators.required]
    });

    this.especialidadeService.getEspecialidades().subscribe(data => {
      this.especialidades = data;
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.consultaService.cadastrarConsulta(this.form.value).subscribe({
        next: () => {
          this.snackBar.open('Consulta cadastrada com sucesso!', 'Fechar', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: () => {
          this.snackBar.open('Erro ao cadastrar consulta.', 'Fechar', { duration: 3000 });
        }
      });
    }
  }
}
