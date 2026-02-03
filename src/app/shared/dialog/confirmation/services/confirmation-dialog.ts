import {inject, Injectable} from '@angular/core';
import {filter} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../components/confirmation-dialog';
import {DialogData} from '../interface/dialog-data';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialog {
  private dialog = inject(MatDialog);

  open(data: DialogData) {
    return this.dialog.open(ConfirmationDialogComponent, {data})
      .afterClosed()
      .pipe(filter((response: boolean) => response))
  }
}
