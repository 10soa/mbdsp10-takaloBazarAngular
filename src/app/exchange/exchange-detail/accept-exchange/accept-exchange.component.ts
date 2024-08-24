import { AfterViewInit, Component, Inject, OnDestroy, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExchangesService } from 'src/app/services/exchange.service';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accept-exchange',
  templateUrl: './accept-exchange.component.html',
  styleUrls: ['./accept-exchange.component.scss']
})
export class AcceptExchangeComponent implements AfterViewInit, OnDestroy {
  error = '';
  meeting_place: string | undefined = undefined;
  appointment_date: Date | undefined = undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  loading: boolean = false;
  map: L.Map | undefined;
  marker: L.Marker | undefined;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AcceptExchangeComponent>,
    private exchangesService: ExchangesService,
    private http: HttpClient // Inject HttpClient for making API calls
  ) {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    // Clean up the map instance when the dialog is destroyed
    if (this.map) {
      this.map.remove();
    }
  }

  initializeMap(): void {
    const mapElement = document.getElementById('dialog-map');

    if (mapElement && !this.map) {
      this.map = L.map(mapElement).setView([-18.879190, 47.507905], 6); // Center on Madagascar

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(this.map);

      this.map.on('click', (e: L.LeafletMouseEvent) => {
        this.setMeetingPlace(e.latlng);
      });
    } else {
      console.error('Map container not found or map already initialized.');
    }
  }

  setMeetingPlace(latlng: L.LatLng): void {
    if (this.marker) {
      this.map?.removeLayer(this.marker);
    }

    if (this.map) {
      this.marker = L.marker(latlng).addTo(this.map)
        .bindPopup('Lieu sélectionné')
        .openPopup();
    }

    this.latitude = latlng.lat;
    this.longitude = latlng.lng;

    this.reverseGeocode(latlng);
  }

  reverseGeocode(latlng: L.LatLng): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`;

    this.http.get(url).subscribe((data: any) => {
      if (data && data.display_name) {
        const addressComponents = data.display_name.split(',').slice(0, 2);
        this.meeting_place = addressComponents.join(', ');
      } else {
        this.meeting_place = `Latitude: ${latlng.lat}, Longitude: ${latlng.lng}`;
      }
    }, error => {
      console.error('Error in reverse geocoding:', error);
      this.meeting_place = `Latitude: ${latlng.lat}, Longitude: ${latlng.lng}`;
    });
  }

  onConfirm(): void {
    if (!this.meeting_place) {
      this.error = 'Lieu du rendez-vous est requis';
      return;
    } else if (!this.appointment_date) {
      this.error = 'Date du rendez-vous est requis';
      return;
    }
    if (!this.isDateInFuture(this.appointment_date)) {
      this.error = 'La date du rendez-vous est déjà passée. Veuillez sélectionner une date dans le futur.';
      return;
    }
    this.loading = true;
    this.exchangesService.acceptExchange(this.data, {
      appointment_date: this.appointment_date,
      meeting_place: this.meeting_place,
      latitude: this.latitude,
      longitude: this.longitude
    }).subscribe(
      (data: any) => {
        this.loading = false;
        this.dialogRef.close(this.data);
      },
      (error) => {
        console.error('Error updating object:', error);
        this.error = error.status !== 500 ? error.error.error : '';
        this.loading = false;
      }
    );
  }

  isDateInFuture(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date > today;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  setDialogRef(dialogRef: MatDialogRef<AcceptExchangeComponent>): void {
    this.dialogRef = dialogRef;
  }
}
