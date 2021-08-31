import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-child-intent-popup',
  templateUrl: './create-child-intent-popup.component.html',
  styleUrls: ['./create-child-intent-popup.component.scss'],
})
export class CreateChildIntentPopupComponent implements OnInit {
  constructor(public _dialogRef: MatDialogRef<CreateChildIntentPopupComponent>) {}

  ngOnInit(): void {}

  /**
   * @name closeDialog
   * @description close popup
   */
  public closeDialog(): void {
    this._dialogRef.close();
  }
}
