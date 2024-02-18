import { Component } from '@angular/core';
import { StudentsService } from '../../services/students/students.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteStudentModalComponent } from './components/delete-student-modal/delete-student-modal.component';
import { EditStudentModalComponent } from './components/create-edit-student-modal/edit-student-modal.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [HttpClientModule, CommonModule, NgbDatepickerModule, FormsModule, 
    ReactiveFormsModule, NgbToastModule],
  providers: [StudentsService, NgbModal],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  constructor(private studentService: StudentsService, private modalService: NgbModal) { }

  //Toast controllers
  show: boolean = false;
  title: string = "";
  message: string = "";

  students: any[] = [];

  ngOnInit() {
    this.getStudentsService();
  }

  openDeleteConfirmationModal(id: number) {
    const modalRef = this.modalService.open(DeleteStudentModalComponent);
    modalRef.componentInstance.onDelete.subscribe(() => {
      console.log("Delete Student Modal:");
        this.studentService.deleteStudent(id).subscribe(() =>{
          modalRef.close();
          this.getStudentsService();
          this.show = true;
          this.title = "SUCCESS";
          this.message = "Student deleted successfully";
        });
    });

    modalRef.componentInstance.onDismiss.subscribe(() => {
      modalRef.close();
    });
  }

  openEditStudentFormModal(student: any) {
    const modalRef = this.modalService.open(EditStudentModalComponent);
    modalRef.componentInstance.mode = "edit";
    modalRef.componentInstance.studentForm.patchValue({...student, birthdate: this.convertDateToDatePicker(student.birthdate)});

    modalRef.componentInstance.onSubmit.subscribe(() => {
      console.log("Delete Student Modal:");
      let studentRequest = {
        ... modalRef.componentInstance.studentForm.value,
        id: student.id,
        secondName: modalRef.componentInstance.studentForm.value.secondName,
        birthdate: this.convertDateToString(modalRef.componentInstance.studentForm.value.birthdate)
      };       
      this.studentService.editStudent(studentRequest).subscribe(() => {
        modalRef.close();
        this.getStudentsService();
        this.show = true;
        this.title = "SUCCESS";
        this.message = "Student edited successfully";
      });
    });

    modalRef.componentInstance.onDismiss.subscribe(() => {
      modalRef.close();
    });
  }

  openCreateStudentFormModal() {
    const modalRef = this.modalService.open(EditStudentModalComponent);
    modalRef.componentInstance.mode = "create";

    modalRef.componentInstance.onSubmit.subscribe(() => {
      let studentRequest = {
        ... modalRef.componentInstance.studentForm.value,
        birthdate: this.convertDateToString(modalRef.componentInstance.studentForm.value.birthdate)
      };       
      this.studentService.createStudent(studentRequest).subscribe(() => {
        modalRef.close();
        this.getStudentsService();
        this.show = true;
        this.title = "SUCCESS";
        this.message = "Student created successfully";
      });
    });

    modalRef.componentInstance.onDismiss.subscribe(() => {
      modalRef.close();
    });
  }

  getStudentsService() {
    this.studentService.getStudents().subscribe((response) =>{
      this.students = response.data as any[];
      console.log(response);
    });
  }

  convertDateToDatePicker(birthdate: string) {
    const date = new Date(birthdate);
    return {
      year: date.getFullYear(),
      month: date.getMonth()+1,
      day: date.getDate()
    };
  }

  convertDateToString(date: any) : string {
    console.log("DATE CONVERT: ", date);
    return date.year + "-" + ((date.month-1) <10 ? "0"+ (date.month-1) : (date.month-1))
     + "-" + (date.day < 10 ? "0" + date.day : date.day);
  }
}
