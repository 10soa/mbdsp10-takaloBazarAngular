import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExchangesService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-accept-exchange',
  templateUrl: './accept-exchange.component.html',
  styleUrls: ['./accept-exchange.component.scss']
})
export class AcceptExchangeComponent {
  error = '';
  meeting_place : string | undefined= undefined;
  appointment_date : Date|undefined = undefined
  loading: boolean = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AcceptExchangeComponent>,
    private exchangesService: ExchangesService
  ) { }

  onConfirm(): void {
    console.log('Lieu:', this.meeting_place);
    console.log('Date:', this.appointment_date);
    if(!this.meeting_place){
      this.error = 'Lieu du rendez-vous est requis';
      return;
    }else if(!this.appointment_date){
      this.error = 'Date du rendez-vous est requis';
      return;
    }
    if(!this.isDateInFuture(this.appointment_date)){
      this.error = ' La date du rendez-vous est déjà passée. Veuillez sélectionner une date dans le futur.';
      return;
    }
    this.loading = true;
    this.exchangesService.acceptExchange(this.data, {appointment_date:this.appointment_date,meeting_place:this.meeting_place}).subscribe(
      (data: any) => {
        this.loading = false;
        this.dialogRef.close(this.data);
      },
      (error) => {
        console.error('Error updating object:', error.headers);
        this.error = error.status!==500 ?  error.error.error : '';
        this.loading = false;
      }
    );
  }

  isDateInFuture(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date > today;
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  setDialogRef(dialogRef: MatDialogRef<AcceptExchangeComponent>) {
    this.dialogRef = dialogRef;
  }
}
