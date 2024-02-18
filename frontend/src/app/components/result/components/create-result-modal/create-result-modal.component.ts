import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDatepickerModule, NgbModal, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { CoursesService } from '../../../../services/courses/courses.service';
import { StudentsService } from '../../../../services/students/students.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-grade-modal',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, ReactiveFormsModule, CommonModule, NgbDropdownModule],
  providers: [NgbActiveModal, NgbModal, StudentsService, CoursesService],
  templateUrl: './create-result-modal.component.html',
  styleUrls: ['./create-result-modal.component.scss']
})
export class CreateResultModalComponent implements OnInit {

  onSubmit: Subject<any> = new Subject();
  onDismiss: Subject<void> = new Subject();

  courses : any[] = [];
  students: any[] = [];
  grades: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];

  mode: 'edit' | 'create' = "edit";

  courseSelected : number = -1;
  studentSelected : number = -1;
  gradeSelected : string = '';

  studentLabel = "Select a student"
  courseLabel = "Select a course"
  gradeLabel = "Select a grade"

  resultForm : any = {
    courseId: '',
    studentId: '',
    grade: '',
  };

  constructor( private courseService: CoursesService,
    private studentService: StudentsService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.getDataService();
  }

  onOptionSelected(value: number, sourceForm: string, name: string){
    console.log("Source Form: ", sourceForm, " Value: ", value)
    if (sourceForm === 'course') {
      this.resultForm.courseId = value;
      this.courseSelected = value;
      this.courseLabel = name;
    } else if (sourceForm === 'student') {
      this.resultForm.studentId = value
      this.studentSelected = value;
      this.studentLabel = name;
    }
  }

  onGradeSelected(value: string) {
    console.log("Grade input: ", value);
    this.resultForm.grade = value;
    this.gradeSelected = value;
    this.gradeLabel = value;
  }
  
  get SubmitLabelButton() {
    return this.mode === "edit" ? "Update Grade" : "Create Grade";
  }

  get GetFormTitle() {
    return this.mode === "edit" ? "Grade Information Update" : "New Grade"
  }

  getDataService() {
    this.courseService.getCourses().subscribe((response: any) =>{
      this.courses = response.data as any[];
      console.log(response);
    });

    this.studentService.getStudents().subscribe((response: any) =>{
      this.students = response.data as any[];
      console.log(response);
    });
  }

  getCourseService() {
    this.courseService.getCourses().subscribe((response: any) =>{
      this.courses = response.data as any[];
      console.log(response);
    });

    this.studentService.getStudents().subscribe((response: any) =>{
      this.students = response.data as any[];
      console.log(response);
    });
  }
}
