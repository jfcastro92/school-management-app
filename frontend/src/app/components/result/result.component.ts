import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteResultModalComponent } from './components/delete-result-modal/delete-result-modal.component';
import { CreateResultModalComponent } from './components/create-result-modal/create-result-modal.component';
import { ResultsService } from '../../services/results/results.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [HttpClientModule, CommonModule, NgbDatepickerModule, FormsModule, ReactiveFormsModule, NgbToastModule],
  providers: [ResultsService, NgbModal],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  constructor(private resultsService: ResultsService, private modalService: NgbModal) { }

  //Toast controllers
  show: boolean = false;
  title: string = "";
  message: string = "";

  results: any[] = [];

  ngOnInit() {
    this.getResultService();
  }

  openDeleteConfirmationModal(id: number) {
    const modalRef = this.modalService.open(DeleteResultModalComponent);
    modalRef.componentInstance.onDelete.subscribe(() => {
      console.log("Delete Student Modal:");
        this.resultsService.deleteResult(id).subscribe(() =>{
          this.getResultService();
          modalRef.close();
          this.show = true;
          this.title = "SUCCESS";
          this.message = "Result deleted successfully";
        });
    });

    modalRef.componentInstance.onDismiss.subscribe(() => {
      modalRef.close();
    });
  }

  openEditResultFormModal(result: any) {
    const modalRef = this.modalService.open(CreateResultModalComponent);
    modalRef.componentInstance.mode = "edit";
    

    modalRef.componentInstance.onSubmit.subscribe(() => {
      console.log("Delete Student Modal:");
      let resultRequest = {
        studentToCourseId: result.studentToCourseId,
        studentId: result.studentToCourseId,
        courseId: result.studentToCourseId,
        grade: result.grade
      };       
      this.resultsService.editResult(resultRequest).subscribe(() => {
        this.getResultService();
        modalRef.close();
        this.show = true;
        this.title = "SUCCESS";
        this.message = "Result edited successfully";
      });
    });

    modalRef.componentInstance.onDismiss.subscribe(() => {
      modalRef.close();
    });
  }

  openCreateResultFormModal() {
    const modalRef = this.modalService.open(CreateResultModalComponent);
    modalRef.componentInstance.mode = "create";
    modalRef.componentInstance.onSubmit.subscribe((response: any) => {
      console.log(response);
        this.resultsService.createResult(response).subscribe(() => {
          modalRef.close();
          this.getResultService();
          this.show = true;
          this.title = "SUCCESS";
          this.message = "Result created successfully";
        });
      });

    modalRef.componentInstance.onDismiss.subscribe(() => {
      modalRef.close();
    });
  }

  getResultService() {
    this.resultsService.getResults().subscribe((response: any) =>{
      this.results = response.data as any[];
      console.log(response);
    });
  }
}
