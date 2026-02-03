import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {TransactionsService} from '@shared/transaction/services/transactions';
import {Transaction} from '@shared/transaction/interfaces/trasanctions';

export const getTransactionResolver: ResolveFn<Transaction[]> = (route, state) => {
  const transactionsService = inject(TransactionsService);
  return transactionsService.getAll();
};
