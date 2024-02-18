import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDatepickerModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-student-modal',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [NgbActiveModal, NgbModal],
  templateUrl: './edit-student-modal.component.html',
  styleUrls: ['./edit-student-modal.component.scss']
})
export class EditStudentModalComponent implements OnInit {

  onSubmit: Subject<'edit' | 'create'> = new Subject();
  onDismiss: Subject<void> = new Subject();

  mode: 'edit' | 'create' = "edit";

  studentForm =  new FormGroup({
    firstName: new FormControl('', Validators.required),
    secondName: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    birthdate: new FormControl('', [Validators.required, this.validateBirthdate.bind(this)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
  });

  constructor() { }

  ngOnInit() {
  }

  get SubmitLabelButton() {
    return this.mode === "edit" ? "Update Student" : "Create Student";
  }

  get GetFormTitle() {
    return this.mode === "edit" ? "Student Information Update" : "New Student"
  }

  validateBirthdate(control: any) {
    if (!control.value){
      return null
    }
    console.log("control.value: ", this.convertDateToString(control.value));
    const birthdate = new Date(this.convertDateToString(control.value));
    const currentDate = new Date();
    const cutoffDate = new Date();
    cutoffDate.setFullYear(cutoffDate.getFullYear() - 10);

    if (birthdate > cutoffDate && birthdate <= currentDate) {
      return { invalidBirthdate: true };
    }
    return null;
  }

  convertDateToString(date: any) : string {
    console.log("DATE CONVERT: ", date);
    return date.year + "-" + ((date.month-1) <10 ? "0"+ (date.month-1) : (date.month-1))
     + "-" + (date.day < 10 ? "0" + date.day : date.day);
  }

}
