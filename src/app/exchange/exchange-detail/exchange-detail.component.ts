import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExchangesService } from 'src/app/services/exchange.service';
import { AddNoteComponent } from './addNote/add-note.component';
import { AcceptExchangeComponent } from './accept-exchange/accept-exchange.component';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-exchange-detail',
  templateUrl: './exchange-detail.component.html',
  styleUrls: ['./exchange-detail.component.scss']
})
export class ExchangeDetailComponent implements OnInit {
  exchange: any;
  loading: boolean = true;
  closed: boolean = false;
  propositionObjects: any[] = [];
  receiverObjects: any[] = [];
  lastActionDate?: Date;
  currentUserId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private exchangesService: ExchangesService,
    private dialog: MatDialog,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const exchangeId = params['id'];
      this.fetchExchangeDetails(exchangeId);
    });
    this.currentUserId = this.sessionService.getUserIdFromToken();
  }

  fetchExchangeDetails(exchangeId: string): void {
    this.loading = true;
    this.exchangesService.getExchangeById(exchangeId).subscribe((data: any) => {
      console.log('Exchange', data);
      this.exchange = data;
      this.closed = this.exchange.status !== 'Proposed';
      this.divideExchangeObjects();
      this.lastActionDate = this.exchange.date || this.exchange.created_at;
      this.loading = false;
    }, error => {
      console.error('Error fetching exchange details:', error);
      this.loading = false;
    });
  }

  divideExchangeObjects(): void {
    this.propositionObjects = this.exchange.exchange_objects.filter((obj: any) => obj.user_id === this.exchange.proposer_user_id);
    this.receiverObjects = this.exchange.exchange_objects.filter((obj: any) => obj.user_id === this.exchange.receiver_user_id);
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'Proposed':
        return 'Proposé';
      case 'Accepted':
        return 'Accepté';
      case 'Refused':
        return 'Refusé';
        case 'Cancelled':
        return 'Annulé';
      default:
        return status;
    }
  }

  refusedExchange(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
    const dialog = this.dialog.open(AddNoteComponent, dialogConfig);
    dialog.componentInstance.setDialogRef(dialog);
    dialog.afterClosed().subscribe(() => {
      this.fetchExchangeDetails(id);
    });
  }

  showAcceptExchangeComponent(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.exchange.id;
    const dialog = this.dialog.open(AcceptExchangeComponent, dialogConfig);
    dialog.componentInstance.setDialogRef(dialog);
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.fetchExchangeDetails(result);
      }
    });
  }

  isCurrentUserReceiver(): boolean {
    return this.currentUserId === this.exchange.receiver_user_id;
  }
}
