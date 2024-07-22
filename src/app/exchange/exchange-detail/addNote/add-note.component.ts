import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ExchangesService } from 'src/app/services/exchange.service';
import { ObjectService } from 'src/app/services/object.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  loading = false;
  dialogRef !: MatDialogRef<AddNoteComponent>;
  addForm !: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private exchangeService : ExchangesService,
    private fb: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.addForm = this.fb.group({
      note: ['']
    });
  }  

  close(){
    this.dialogRef.close();
  }
  
  add(data: any){
    this.dialogRef.close(data);
  }

  setDialogRef(dialogRef: MatDialogRef<AddNoteComponent>) {
    this.dialogRef = dialogRef;
  }

  validate() : void {
    this.loading=true;
    const { note } = this.addForm.value;
    this.exchangeService.rejectExchange(this.data, note).subscribe({
      next: (response) => {
        this.loading=false;
        this.dialogRef.close();
      },
      error: (error) => {
        this.loading=false;
        this.dialogRef.close();
      }
    });
  }

}
