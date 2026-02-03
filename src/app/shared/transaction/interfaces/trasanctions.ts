import { TransactionType } from "../enums/transaction-types";

export interface Transaction {
    id: number;
    title: string;
    value: number;
    type: TransactionType;
}

export type TransactionPayload = Omit<Transaction, 'id'>;
