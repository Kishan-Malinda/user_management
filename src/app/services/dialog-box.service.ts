import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { DialogBoxComponent } from '../components/dialog-box/dialog-box.component';
import { DialogBoxData } from '../models/DialogBoxData';

@Injectable({
  providedIn: 'root'
})
export class DialogBoxService {
  response : any;
  userData : any;
  constructor(private dialogBox : MatDialog) { }
  confirmDialog(data : DialogBoxData)  {
    let dialogRef = this.dialogBox.open(DialogBoxComponent,{
      data,
      width : '400px',
      disableClose : true
    });

    return dialogRef;
  }
}
