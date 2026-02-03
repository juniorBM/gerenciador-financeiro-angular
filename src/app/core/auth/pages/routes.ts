import {ListComponent} from '../../../features/home/pages/list/list.component';
import {getTransactionResolver} from '../../../features/home/pages/list/resolvers/get-transaction-resolver';
import {CreateOrEdit} from '../../../features/home/pages/create-or-edit/create-or-edit';
import {
  getTransactionByIdResolver
} from '../../../features/home/pages/create-or-edit/resolvers/get-transaction-by-id-resolver';
import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LayoutComponent} from '../components/layout/layout.component';

export default [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ]
  },

] as Routes;
