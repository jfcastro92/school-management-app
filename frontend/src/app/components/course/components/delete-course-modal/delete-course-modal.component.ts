import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-course-modal',
  standalone: true,
  providers: [NgbActiveModal, NgbModal],
  templateUrl: './delete-course-modal.component.html',
  styleUrls: ['./delete-course-modal.component.scss']
})
export class DeleteCourseModalComponent implements OnInit {

  onDelete: Subject<void> = new Subject();
  onDismiss: Subject<void> = new Subject();
  
  constructor() { }

  ngOnInit() {
  }

}
