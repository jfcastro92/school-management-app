import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDatepickerModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-course-modal',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [NgbActiveModal, NgbModal],
  templateUrl: './create-edit-course-modal.component.html',
  styleUrls: ['./create-edit-course-modal.component.scss']
})
export class CreateEditCourseModalComponent implements OnInit {

  onSubmit: Subject<'edit' | 'create'> = new Subject();
  onDismiss: Subject<void> = new Subject();

  mode: 'edit' | 'create' = "edit";

  courseForm =  new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit() {
  }

  get SubmitLabelButton() {
    return this.mode === "edit" ? "Update Course" : "Create Course";
  }

  get GetFormTitle() {
    return this.mode === "edit" ? "Course Information Update" : "New Course"
  }

}

