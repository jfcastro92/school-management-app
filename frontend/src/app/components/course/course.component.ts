import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbModal, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteCourseModalComponent } from './components/delete-course-modal/delete-course-modal.component';
import { CreateEditCourseModalComponent } from './components/create-edit-course-modal/create-edit-course-modal.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [HttpClientModule, CommonModule, NgbDatepickerModule, FormsModule, ReactiveFormsModule, NgbToastModule],
  providers: [CoursesService, NgbModal],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {
  constructor(private courseService: CoursesService, private modalService: NgbModal) { }

  //Toast controllers
  show: boolean = false;
  title: string = "";
  message: string = "";

  courses: any[] = [];

  ngOnInit() {
    this.getCourseService();
  }

  openDeleteConfirmationModal(id: number) {
    const modalRef = this.modalService.open(DeleteCourseModalComponent);
    modalRef.componentInstance.onDelete.subscribe(() => {
      console.log("Delete Student Modal:");
        this.courseService.deleteCourse(id).subscribe(() =>{
          modalRef.close();
          this.getCourseService();
          this.show = true;
          this.title = "SUCCESS";
          this.message = "Course deleted successfully";
        });
    });

    modalRef.componentInstance.onDismiss.subscribe(() => {
      modalRef.close();
    });
  }

  openEditCourseFormModal(course: any) {
    const modalRef = this.modalService.open(CreateEditCourseModalComponent);
    modalRef.componentInstance.mode = "edit";

    modalRef.componentInstance.onSubmit.subscribe(() => {
      console.log("Delete Student Modal:");
      let courseRequest = {
        courseName: modalRef.componentInstance.courseForm.value.name,
      };       
      this.courseService.editCourse(course.id, courseRequest).subscribe(() => {
        this.getCourseService();
        modalRef.close();
        this.show = true;
        this.title = "SUCCESS";
        this.message = "Course edited successfully";
      });
    });

    modalRef.componentInstance.onDismiss.subscribe(() => {
      modalRef.close();
    });
  }

  openCreateCourseFormModal() {
    const modalRef = this.modalService.open(CreateEditCourseModalComponent);
    modalRef.componentInstance.mode = "create";

    modalRef.componentInstance.onSubmit.subscribe(() => {
      let courseRequest = {
        courseName: modalRef.componentInstance.courseForm.value.name,
      }
      this.courseService.createCourse(courseRequest).subscribe(() => {
        modalRef.close();
        this.getCourseService();
        this.show = true;
        this.title = "SUCCESS";
        this.message = "Course created successfully";
      });
    });

    modalRef.componentInstance.onDismiss.subscribe(() => {
      modalRef.close();
    });
  }

  getCourseService() {
    this.courseService.getCourses().subscribe((response) =>{
      this.courses = response.data as any[];
      console.log(response);
    });
  }
}
