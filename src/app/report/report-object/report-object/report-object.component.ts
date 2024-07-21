import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportService } from 'src/app/services/report.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-object',
  templateUrl: './report-object.component.html',
  styleUrls: ['./report-object.component.scss']
})
export class ReportObjectComponent implements OnInit {
  @Input() objectId!: number;
  @Input() typeReports: any[] = []; 
  reason: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private reportService: ReportService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  submitReport(): void {
    if (this.reason.trim()) {
      const reportData = {
        object_id: this.objectId,
        reason: this.reason
      };

      this.reportService.createReport(reportData).subscribe(
        (response) => {
          this.toastr.success('Signalement envoyé avec succès.');
          this.activeModal.close();
        },
        (error) => {
          this.toastr.error('Erreur lors de l\'envoi du signalement.');
          console.error('Erreur:', error);
        }
      );
    } else {
      this.toastr.error('Veuillez sélectionner ou saisir une raison.');
    }
  }
}
