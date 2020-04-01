import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { filter, first, tap } from "rxjs/operators";
import { CourseEntityService } from "./services/course-entity.service";

@Injectable()
export class CoursesResolver implements Resolve<boolean>{

    constructor(private coursesService: CourseEntityService) {

    }



    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {


        return this.coursesService.loaded$.pipe(
            tap((loaded: boolean) => {
                if (!loaded) {
                    this.coursesService.getAll();
                }
            }), filter((loaded: boolean) => !!loaded),
            first()
        );
        // this.coursesService.getAll().pipe(map((courses:Course[])=> !!courses));
    }
}