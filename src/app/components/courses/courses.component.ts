import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { HttpClientModule } from '@angular/common/http';
import { course } from '../../models/course.model';
import { CommonModule, SlicePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [HttpClientModule, SlicePipe, RouterLink, RouterLinkActive, ModalComponent, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  @ViewChild('topOfPage') topOfPage!: ElementRef;

  private courseService = inject(CourseService)
  courseList: course[] = [];
  displayedCourses: number = 4;
  videosList: [] = []

  // isModalOpen = false;
  video = { isOpen: false, videoLength: 0 }

  closeModal() {
    // this.isModalOpen = false;
    this.video = { isOpen: false, videoLength: 0 }
  }

  ngOnInit() {
    this.getCourses()
  }

  getCourses() {
    this.courseService.getAllCourses().subscribe((response) => {
      this.courseList = response.data
      console.log(JSON.stringify(response));
    })
  }

  loadmore(lengthOfEvents: number) {
    if (this.courseList.length > this.displayedCourses) {
      if (lengthOfEvents == this.courseList.length) {
        this.displayedCourses = this.courseList.length
      } else
        this.displayedCourses += lengthOfEvents
    }
  }

  openVideos(course: course, event: Event) {
    event.stopPropagation();
    // this.isModalOpen = true;
    // this.courseService.getVideoByCourseId(courseId).subscribe(
    //   (res) => {
    //     this.videosList = res.data
    //     console.log(JSON.stringify(res));
    //   }
    // )

    this.video = { isOpen: true, videoLength: course.totalVideos }
  }

  enrollToCourse() {

  }

  scrollToTop(): void {
    this.topOfPage.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
