import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-result-modal',
  standalone: true,
  providers: [NgbActiveModal, NgbModal],
  templateUrl: './delete-result-modal.component.html',
  styleUrls: ['./delete-result-modal.component.scss']
})
export class DeleteResultModalComponent implements OnInit {

  onDelete: Subject<void> = new Subject();
  onDismiss: Subject<void> = new Subject();
  
  constructor() { }

  ngOnInit() {
  }

}
