import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-student-modal',
  standalone: true,
  providers: [NgbActiveModal, NgbModal],
  templateUrl: './delete-student-modal.component.html',
  styleUrls: ['./delete-student-modal.component.scss']
})
export class DeleteStudentModalComponent implements OnInit {

  onDelete: Subject<void> = new Subject();
  onDismiss: Subject<void> = new Subject();

  constructor() { }

  ngOnInit() {
  }
}
