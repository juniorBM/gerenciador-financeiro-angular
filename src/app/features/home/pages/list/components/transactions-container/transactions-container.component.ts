import {Component, contentChild, input, TemplateRef} from '@angular/core';
import {NoTransactions} from "../no-transactions/no-transactions";
import {TransactionItem} from "../transaction-item/transaction-item";
import {Transaction} from '../../../../../../shared/transaction/interfaces/trasanctions';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-transactions-container',
  imports: [
    NoTransactions,
    TransactionItem,
    NgTemplateOutlet
  ],
  templateUrl: './transactions-container.component.html',
  styleUrl: './transactions-container.component.scss',
})
export class TransactionsContainerComponent {
    transactions = input.required<Transaction[]>();
    itemTemplate = contentChild.required<TemplateRef<unknown>>('item');
    noItemsTemplate = contentChild.required<TemplateRef<unknown>>('noItems');
}
