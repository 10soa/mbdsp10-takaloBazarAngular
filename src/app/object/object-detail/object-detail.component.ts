import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectService } from 'src/app/services/object.service';
import { SessionService } from 'src/app/services/session.service';
import { Object } from 'src/app/models/object.model';
import { ToastrService } from 'ngx-toastr';

// Import Bootstrap Tooltip
import Tooltip from 'bootstrap/js/dist/tooltip';

@Component({
  selector: 'app-object-detail',
  templateUrl: './object-detail.component.html',
  styleUrls: ['./object-detail.component.scss']
})
export class ObjectDetailComponent implements OnInit {
  object: Object | undefined;
  isOwner: boolean = false;
  isConnected: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private objectService: ObjectService,
    private sessionService: SessionService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.objectService.getObject(+id).subscribe((data) => {
        this.object = data;
        const userIdFromToken = this.sessionService.getUserIdFromToken();
        this.isOwner = userIdFromToken !== null && userIdFromToken == this.object?.user_id?.toString();
        this.isConnected = userIdFromToken !== null;

        // Initialize tooltips
        setTimeout(() => {
          const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
          tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new Tooltip(tooltipTriggerEl);
          });
        }, 500);
      });
    }
  }

  removeObject(): void {
    if (this.object) {
      this.objectService.removeObject(this.object.id).subscribe(
        (response) => {
          this.toastr.success(response.message);
          this.object!.status = 'Removed';
          this.router.navigate(['/object', this.object?.id]);
        },
        (error) => {
          this.toastr.error('Erreur lors du retrait de l\'objet.');
          console.error('Erreur:', error);
        }
      );
    }
  }
  ProposeExchange(){
    this.router.navigate(['/exchange/propose/'+this.object?.user_id], { queryParams: {name : this.object?.name, id : this.object?.id , image :this.object?.image ,rcvUsername :this.object?.user?.username }  });
  }
}
