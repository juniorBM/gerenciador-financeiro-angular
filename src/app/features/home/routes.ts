import {Routes} from "@angular/router";
import {CreateOrEdit} from "./pages/create-or-edit/create-or-edit";
import {getTransactionByIdResolver} from './pages/create-or-edit/resolvers/get-transaction-by-id-resolver';
import {ListComponent} from './pages/list/list.component';
import {getTransactionResolver} from './pages/list/resolvers/get-transaction-resolver';

export default [
  {
    path: '',
    component: ListComponent,
    resolve: {
      transactions: getTransactionResolver
    }
  },
  {
    path: 'create',
    component: CreateOrEdit
  },
  {
    path: 'edit/:id',
    component: CreateOrEdit,
    resolve: {
      transaction: getTransactionByIdResolver
    }
  }
] as Routes;
