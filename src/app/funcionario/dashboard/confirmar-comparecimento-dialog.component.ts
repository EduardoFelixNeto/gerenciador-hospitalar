import { Component } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-confirmar-comparecimento-dialog',
  template: `
    <h2 mat-dialog-title>Confirmar Comparecimento</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Código do Agendamento</mat-label>
        <input matInput [(ngModel)]="codigo">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancelar()">Cancelar</button>
      <button mat-button color="primary" (click)="confirmar()">Confirmar</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  styles: [`.full-width { width: 100%; }`]
})
export class ConfirmarComparecimentoDialogComponent {
  codigo: string = '';

  constructor(private dialogRef: MatDialogRef<ConfirmarComparecimentoDialogComponent>) {}

  confirmar() {
    this.dialogRef.close(this.codigo);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
