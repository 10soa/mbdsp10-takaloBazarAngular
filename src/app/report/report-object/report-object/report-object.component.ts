import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-object',
  templateUrl: './report-object.component.html',
  styleUrls: ['./report-object.component.scss']
})
export class ReportObjectComponent implements OnInit {
  @Input() objectId!: number;
  @Input() typeReports: any[] = [];
  
  selectedReason: string = '';
  customReason: string = '';
  loading: boolean = false;

  constructor(public activeModal: NgbActiveModal, private reportService: ReportService) {}

  ngOnInit(): void {}

  submitReport(): void {
    this.loading = true;
    const reason = this.customReason || this.selectedReason;
    this.reportService.reportObject(this.objectId, reason).subscribe(
      () => {
        this.loading = false;
        this.activeModal.close('report submitted');
      },
      (error) => {
        this.loading = false;
        console.error('Erreur lors de l\'envoi du signalement:', error);
      }
    );
  }

  close(): void {
    this.activeModal.dismiss('cancel');
  }
}
