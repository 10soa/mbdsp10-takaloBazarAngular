import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportObjectComponent } from './report-object/report-object.component';

@NgModule({
  declarations: [
    ReportObjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    ReportObjectComponent
  ]
})
export class ReportModule { }
