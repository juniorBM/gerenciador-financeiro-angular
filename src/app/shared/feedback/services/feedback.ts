import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Feedback {
  private snackBar = inject(MatSnackBar);

  success(message: string) {
    this.snackBar.open(message, 'OK', {
      panelClass: 'snack-bar-success-feedback'
    });
  }
}
