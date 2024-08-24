import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExchangesService } from 'src/app/services/exchange.service';
import { SessionService } from 'src/app/services/session.service';
import * as L from 'leaflet';
import { AcceptExchangeComponent } from './accept-exchange/accept-exchange.component';
import { AddNoteComponent } from './addNote/add-note.component';

@Component({
  selector: 'app-exchange-detail',
  templateUrl: './exchange-detail.component.html',
  styleUrls: ['./exchange-detail.component.scss']
})
export class ExchangeDetailComponent implements OnInit, AfterViewInit {
  exchange: any;
  loading: boolean = true;
  closed: boolean = false;
  propositionObjects: any[] = [];
  receiverObjects: any[] = [];
  lastActionDate?: Date;
  currentUserId: string | null = null;
  map: L.Map | undefined;
  needMap: boolean = false;

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

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  fetchExchangeDetails(exchangeId: string): void {
    this.loading = true;
    this.exchangesService.getExchangeById(exchangeId).subscribe((data: any) => {
      this.exchange = data;
      this.closed = this.exchange.status !== 'Proposed';
      this.divideExchangeObjects();
      this.lastActionDate = this.exchange.date || this.exchange.created_at;
      this.loading = false;
      this.needMap = this.exchange.latitude && this.exchange.longitude;

      // Add marker after the exchange is retrieved
      if (this.map && this.exchange.latitude && this.exchange.longitude) {
        L.marker([this.exchange.latitude, this.exchange.longitude]).addTo(this.map)
          .bindPopup(`L'échange se tiendra ici 😉`)
          .openPopup();
        this.map.flyTo([this.exchange.latitude, this.exchange.longitude], 15);
      } else {
        console.error('Map is not initialized or coordinates are missing.');
      }
    }, error => {
      console.error('Error fetching exchange details:', error);
      this.loading = false;
    });
  }

  initializeMap(): void {
    const mapElement = document.getElementById('map');

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/img/leaflet/marker-icon-2x.png',
      iconUrl: 'assets/img/leaflet/marker-icon.png',
      shadowUrl: 'assets/img/leaflet/marker-shadow.png',
    });

    if (mapElement && !this.map) {
      // Initialize the map and center it on Madagascar
      this.map = L.map(mapElement).setView([-18.879190, 47.507905], 6);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(this.map);
    } else {
      console.error('Map container not found or already initialized.');
    }
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
