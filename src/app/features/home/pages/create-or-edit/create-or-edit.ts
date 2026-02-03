import {Component, computed, inject, input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAnchor, MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TransactionType} from '../../../../shared/transaction/enums/transaction-types';
import {NgxMaskDirective} from 'ngx-mask';
import {TransactionsService} from '../../../../shared/transaction/services/transactions';
import {Transaction, TransactionPayload} from '../../../../shared/transaction/interfaces/trasanctions';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Feedback} from '../../../../shared/feedback/services/feedback';
import {tap} from 'rxjs';

@Component({
  selector: 'app-create-or-edit',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    NgxMaskDirective,
  ],
  templateUrl: './create-or-edit.html',
  styleUrl: './create-or-edit.scss',
})
export class CreateOrEdit {
  private transactionService = inject(TransactionsService);
  private router = inject(Router);
  private feedback = inject(Feedback);

  transaction = input<Transaction>();

  readonly transactionType = TransactionType;

  isEdit = computed(() => Boolean(this.transaction()));

  form = computed(() =>
    new FormGroup({
      type: new FormControl(this.transaction()?.type ?? '', {
        validators: [Validators.required],
      }),
      title: new FormControl(this.transaction()?.title ?? '', {
        validators: [Validators.required],
      }),
      value: new FormControl(this.transaction()?.value ?? 0, {
        validators: [Validators.required],
      }),
    })
  );

  submit() {
    if (this.form().invalid) {
      return;
    }

    const payload: TransactionPayload = {
      title: this.form().value.title as string,
      value: this.form().value.value as number,
      type: this.form().value.type as TransactionType,
    };

    this.createOrEdit(payload).subscribe({
      next: () => {
        this.router.navigate(['/']);
      }
    })
  }

  private createOrEdit(payload: TransactionPayload) {
    if (this.isEdit()) {
      return this.transactionService.put(this.transaction()!.id, payload)
        .pipe(
          tap(() => this.feedback.success('Transação atualizada com sucesso!'))
        );
    } else {
      return this.transactionService.post(payload)
        .pipe(
          tap(() => this.feedback.success('Transação criada com sucesso!'))
        );
    }
  }
}
