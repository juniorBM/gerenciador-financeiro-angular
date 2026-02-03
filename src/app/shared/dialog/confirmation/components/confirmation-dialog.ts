import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {DialogData} from '../interface/dialog-data';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>{{ dialogData().title }}</h2>
    <mat-dialog-content>
      {{ dialogData().message }}
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton [mat-dialog-close]="false">{{ dialogData().noButtonText || 'Sim' }}</button>
      <button matButton [mat-dialog-close]="true" cdkFocusInitial>{{ dialogData().yesButtonText || 'Não' }}</button>
    </mat-dialog-actions>
  `,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  readonly dialogData = signal(inject<DialogData>(MAT_DIALOG_DATA));

  private defaultDialogData: Partial<DialogData> = {
    yesButtonText: 'Sim',
    noButtonText: 'Não'
  };

  resolvedDialogData = computed(() => {
    return {
      ...this.defaultDialogData,
      ...this.dialogData()
    };
  });
}
