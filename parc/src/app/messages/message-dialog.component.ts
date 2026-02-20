import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MessageService } from '../Service/message.service';
import { MessageInterface } from '../Interface/message-dialog.interface';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './messages-dialog.component.html',
})
export class MessageDialogComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<MessageDialogComponent>
  ) {
    this.form = this.fb.group({
      nom: [''],
      prenom: [''],
      message: ['', Validators.required],
      note_attraction: [null],
    });
  }

  envoyer() {
    if (this.form.invalid) return;

    const payload: MessageInterface = this.form.value;

    this.messageService.postMessage(payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => console.error(err)
    });
  }
}