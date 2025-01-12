import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { HttpClientModule } from '@angular/common/http';
import { course } from '../../models/course.model';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  private courseService = inject(CourseService)
  courseList!: course[];

  ngOnInit() {
    this.getCourses()
  }

  getCourses() {
    this.courseService.getAllCourses().subscribe((data) => {
      this.courseList = data
      console.log(JSON.stringify(data));
    })
  }

}
