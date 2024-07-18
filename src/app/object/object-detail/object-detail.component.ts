import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectService } from 'src/app/services/object.service';
import { Object } from 'src/app/models/object.model';


@Component({
  selector: 'app-object-detail',
  templateUrl: './object-detail.component.html',
  styleUrls: ['./object-detail.component.scss']
})
export class ObjectDetailComponent implements OnInit {
  object: Object | undefined;

  constructor(
    private route: ActivatedRoute,
    private objectService: ObjectService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.objectService.getObject(+id).subscribe((data) => {
        this.object = data;
      });
    }
  }

}
