import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectService } from 'src/app/services/object.service';
import { SessionService } from 'src/app/services/session.service';
import { Object } from 'src/app/models/object.model';

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
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.objectService.getObject(+id).subscribe((data) => {
        this.object = data;
        const userIdFromToken = this.sessionService.getUserIdFromToken();
        this.isOwner = userIdFromToken !== null && userIdFromToken == this.object?.user_id?.toString();
        this.isConnected = userIdFromToken !== null;
      });
    }
  }
}
