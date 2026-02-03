import {Component, inject, input, linkedSignal, signal} from '@angular/core';
import {Balance} from './components/balance/balance';
import {MatButton} from '@angular/material/button';
import {NoTransactions} from './components/no-transactions/no-transactions';
import {Router, RouterLink} from '@angular/router';
import {TransactionItem} from './components/transaction-item/transaction-item';
import {TransactionsContainerComponent} from './components/transactions-container/transactions-container.component';
import {TransactionsService} from '../../../../shared/transaction/services/transactions';
import {Feedback} from '../../../../shared/feedback/services/feedback';
import {ConfirmationDialog} from '../../../../shared/dialog/confirmation/services/confirmation-dialog';
import {Transaction} from '../../../../shared/transaction/interfaces/trasanctions';

@Component({
  selector: 'app-list',
  imports: [
    Balance,
    MatButton,
    NoTransactions,
    RouterLink,
    TransactionItem,
    TransactionsContainerComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private transactionsService = inject(TransactionsService);
  private feedbackService = inject(Feedback);
  private router = inject(Router);
  private confirmationDialogService = inject(ConfirmationDialog);

  transactions = input.required<Transaction[]>();
  items = linkedSignal(() => this.transactions());

  edit(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id])
  }

  remove(transaction: Transaction) {
    this.confirmationDialogService.open({
      title: 'Deletar transação',
      message: 'Deseja realmente deletar essa transação?',
    })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.transactionsService.delete(transaction.id).subscribe({
            next: () => {
              this.removeTransactionFromArray(transaction);
              this.feedbackService.success('Transaction removida com sucesso.');
            }
          });
        }
      })

  }

  private removeTransactionFromArray(transaction: Transaction) {
    this.items.update(transactions => {
      return transactions.filter(item => item.id !== transaction.id)
    });
  }
}
