import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OtherAccountComponent } from 'src/app/account/other-account/other-account.component';
import { UserObjectsComponent } from './user-objects/user-objects.component';
import { USERID } from 'src/app/constants/app.constants';
import { ExchangesService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-exchange-add',
  templateUrl: './exchange-add.component.html',
  styleUrls: ['./exchange-add.component.scss']
})
export class ExchangeAddComponent implements OnInit {
  loading : boolean = false;
  proposedItem : any[] = [];
  recevedItem: any[] = [];
  rcvObjectId: any[] = [];
  prpObjectId: any[] = [];
  proposeError = '';
  receiveError = '';
  error = '';
  rcvUserId : number = 0;
  rcvUsername : string = '';
  prpUserId = localStorage.getItem(USERID);
  error1 = '';
  error2 = '';

  proposeExchange(): void {
    this.loading = true;
    if(this.rcvObjectId.length === 0){
      this.error='Vous devez sélectionner un objet à échanger.';
      this.loading = false;
    }else if(this.prpObjectId.length === 0){
      this.error='Vous devez sélectionner un objet à proposer pour l\'échange.';
      this.loading = false;
    }
    else{
      const body = {
        rcvUserId:this.rcvUserId,
        rcvObjectId:this.rcvObjectId,
        prpObjectId: this.prpObjectId
      }

      this.exchangesService.proposerExchange(body).subscribe(
        (data: any) => {
          this.loading = false;
          this.router.navigate([`/exchange/in-progress`]);
        },
        (error) => {
          console.error('Error updating object:', error.headers);
          this.error = error.status!==500 ?  error.error.error : '';
          this.loading = false;
        }
      );
    }
  }

  constructor(  private route: ActivatedRoute,
    private router: Router,  private dialog: MatDialog, private exchangesService: ExchangesService){}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('rcvUserId');
    this.rcvUserId = idParam !== null ? parseInt(idParam, 10) : this.rcvUserId;

    this.route.paramMap.subscribe(params => {
      const newIdParam = params.get('rcvUserId');
      this.rcvUserId = newIdParam !== null ? parseInt(newIdParam, 10) : this.rcvUserId;
    });
    this.route.queryParams.subscribe((params) => {
     this.rcvUsername = params['rcvUsername'];
     if(params['id']){
      this.recevedItem.push(params);
      this.rcvObjectId.push(parseInt(params['id']));
      
     }
    });

  }

  deleteRecevedItem(index: number): void {
    if (index > -1 && index < this.recevedItem.length) {
      this.recevedItem.splice(index, 1);
      this.rcvObjectId.splice(index, 1);
    }
  }

  deleteProposedItem(index: number): void {
    if (index > -1 && index < this.proposedItem.length) {
      this.proposedItem.splice(index, 1);
      this.prpObjectId.splice(index, 1);
    }
  }

  addObject(userId: number|string|null, role: string){
    this.error1='';
    this.error2='';
    this.error='';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data= userId;
    const dialog = this.dialog.open(UserObjectsComponent,dialogConfig);
    dialog.componentInstance.setDialogRef(dialog);
    dialog.afterClosed().subscribe(result => {
      if(result){
        if(role ==='recever'){
          if(this.isIdInArray(this.recevedItem,result.id)){
            this.error1='L\'objet fait déjà partie des objets à échanger.'
          }else{
            this.recevedItem.push(result);
            this.rcvObjectId.push(result.id);
          }
        }else{
          if(this.isIdInArray(this.proposedItem,result.id)){
            this.error2='L\'objet fait déjà partie des objets proposés.'
          }else{
            this.proposedItem.push(result);
            this.prpObjectId.push(result.id);
            }
        }
      }
    });
  }

  isIdInArray(array: any[], id:any) {
    return array.some(element => element.id == id);
  }
  
}
