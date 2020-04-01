import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import { LessonEntityService } from '../services/lesson-entity.service';
import { CourseEntityService } from '../services/course-entity.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;

  lessons$: Observable<Lesson[]>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  constructor(
    private lessonsEntityService: LessonEntityService,
    private coursesEntityService:CourseEntityService
    /*private coursesService: CoursesHttpService*/,
    private route: ActivatedRoute) {

  }

  ngOnInit() {

    const courseUrl:string = this.route.snapshot.paramMap.get("courseUrl");

    this.course$ =  this.coursesEntityService.entities$.pipe(
      map((courses:Course[])=> courses.find((c:Course)=> c.url == courseUrl))
    );
    
    this.lessons$ = this.lessonsEntityService.entities$.pipe(
              withLatestFrom(this.course$),
            map(([lessons, course])=> lessons.filter(lesson => lesson.courseId == course.id)) );


    
    //this.coursesService.findCourseByUrl(courseUrl);

    /*this.lessons$ = this.course$.pipe(
      concatMap(course => this.coursesService.findLessons(course.id)),
      tap(console.log)
    );*/

  }


  loadLessonsPage(course: Course) {

  }

}
