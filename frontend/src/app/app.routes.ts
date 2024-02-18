import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentComponent } from './components/student/student.component';
import { CourseComponent } from './components/course/course.component';
import { ResultComponent } from './components/result/result.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'student', component: StudentComponent },
  { path: 'course', component: CourseComponent },
  { path: 'result', component: ResultComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
